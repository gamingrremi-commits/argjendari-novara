import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { adminNotificationHtml, clientConfirmationHtml } from '@/lib/email/templates';
import { createAdminClient } from '@/lib/supabase/admin';
import { BOOKING_TYPE_LABELS, getContactFormSchema } from '@/lib/validations/contact';
import type { Locale } from '@/lib/types';

const rateLimits = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 3;
const WINDOW_MS = 60 * 1000;

const API_MESSAGES = {
  sq: {
    rateLimit: 'Shumë kërkesa. Provo përsëri pas një minute.',
    invalid: 'Të dhënat janë të pavlefshme',
    emailConfig: 'Shërbimi i email-it nuk është konfiguruar',
    sendFailed: 'Mesazhi nuk u dërgua. Provo përsëri.',
    unexpected: 'Gabim i papritur. Provo përsëri.',
    clientSubject: 'Mesazhi juaj erdhi në Novara',
  },
  en: {
    rateLimit: 'Too many requests. Please try again in one minute.',
    invalid: 'The submitted data is invalid',
    emailConfig: 'The email service is not configured',
    sendFailed: 'Your message could not be sent. Please try again.',
    unexpected: 'Unexpected error. Please try again.',
    clientSubject: 'Your message reached Novara',
  },
} as const;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimits.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS) return false;

  entry.count++;
  return true;
}

if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    rateLimits.forEach((entry, key) => {
      if (now > entry.resetAt) rateLimits.delete(key);
    });
  }, 5 * 60 * 1000);
}

export async function POST(req: Request) {
  let requestLocale: Locale = 'sq';

  try {
    const body = await req.json().catch(() => null);
    requestLocale = body?.locale === 'en' ? 'en' : 'sq';
    const messages = API_MESSAGES[requestLocale];

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: messages.rateLimit }, { status: 429 });
    }

    if (!body) {
      return NextResponse.json({ error: messages.invalid }, { status: 400 });
    }

    const result = getContactFormSchema(requestLocale).safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: messages.invalid,
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = result.data;

    if (data.website && data.website.length > 0) {
      return NextResponse.json({ success: true });
    }

    let supabaseError: string | null = null;
    try {
      const supabase = createAdminClient();
      const { error } = await supabase.from('bookings').insert({
        type: data.type,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        message: data.message || null,
        preferred_date: data.preferred_date || null,
        product_slug: data.product_slug || null,
        status: 'new',
      });

      if (error) {
        supabaseError = error.message;
        console.warn('Supabase insert failed:', error.message);
      }
    } catch (error) {
      supabaseError = error instanceof Error ? error.message : 'unknown';
      console.warn('Supabase admin client error:', error);
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: messages.emailConfig }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromAddr = process.env.CONTACT_EMAIL_FROM || 'onboarding@resend.dev';
    const toAddr = process.env.CONTACT_EMAIL_TO || 'gamingrremi@gmail.com';
    const typeLabel = BOOKING_TYPE_LABELS[requestLocale][data.type];

    try {
      await resend.emails.send({
        from: `Novara Website <${fromAddr}>`,
        to: [toAddr],
        replyTo: data.email,
        subject: `[NOVARA] ${data.first_name} ${data.last_name} — ${typeLabel}`,
        html: adminNotificationHtml({ ...data, locale: requestLocale }),
      });
    } catch (error) {
      console.error('Admin email failed:', error);
      return NextResponse.json({ error: messages.sendFailed }, { status: 500 });
    }

    try {
      await resend.emails.send({
        from: `Argjendari Novara <${fromAddr}>`,
        to: [data.email],
        subject: messages.clientSubject,
        html: clientConfirmationHtml({
          first_name: data.first_name,
          type: data.type,
          locale: requestLocale,
        }),
      });
    } catch (error) {
      console.warn('Client confirmation email failed:', error);
    }

    return NextResponse.json({
      success: true,
      saved_to_db: !supabaseError,
    });
  } catch (error) {
    console.error('Contact API error:', error);
    const messages = API_MESSAGES[requestLocale];

    return NextResponse.json({ error: messages.unexpected }, { status: 500 });
  }
}
