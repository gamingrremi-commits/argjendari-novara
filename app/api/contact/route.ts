import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactFormSchema } from '@/lib/validations/contact';
import { adminNotificationHtml, clientConfirmationHtml } from '@/lib/email/templates';
import { createAdminClient } from '@/lib/supabase/admin';

// Simple in-memory rate limiter (per IP, per minute)
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 3;
const WINDOW_MS = 60 * 1000;

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

// Cleanup old entries periodically
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    rateLimits.forEach((entry, key) => {
      if (now > entry.resetAt) rateLimits.delete(key);
    });
  }, 5 * 60 * 1000);
}

export async function POST(req: Request) {
  try {
    // Rate limiting
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Shumë kërkesa. Provo përsëri pas një minute.' },
        { status: 429 }
      );
    }

    // Parse + validate
    const body = await req.json();
    const result = ContactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Të dhënat janë të pavlefshme',
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = result.data;

    // Honeypot check
    if (data.website && data.website.length > 0) {
      // Pretend success to fool bots
      return NextResponse.json({ success: true });
    }

    // Save to Supabase (best effort — don't fail email if DB fails)
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
    } catch (err) {
      supabaseError = err instanceof Error ? err.message : 'unknown';
      console.warn('Supabase admin client error:', err);
    }

    // Send emails via Resend
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY missing');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromAddr = process.env.CONTACT_EMAIL_FROM || 'onboarding@resend.dev';
    const toAddr = process.env.CONTACT_EMAIL_TO || 'gamingrremi@gmail.com';

    // 1. Email to admin (you)
    try {
      await resend.emails.send({
        from: `Novara Website <${fromAddr}>`,
        to: [toAddr],
        replyTo: data.email,
        subject: `[NOVARA] ${data.first_name} ${data.last_name} — ${data.type}`,
        html: adminNotificationHtml(data),
      });
    } catch (err) {
      console.error('Admin email failed:', err);
      return NextResponse.json(
        { error: 'Mesazhi nuk u dërgua. Provo përsëri.' },
        { status: 500 }
      );
    }

    // 2. Confirmation email to client (best effort)
    try {
      await resend.emails.send({
        from: `Argjendari Novara <${fromAddr}>`,
        to: [data.email],
        subject: 'Mesazhi juaj erdhi në Novara',
        html: clientConfirmationHtml({ first_name: data.first_name, type: data.type }),
      });
    } catch (err) {
      console.warn('Client confirmation email failed:', err);
      // Don't fail the request if just the confirmation fails
    }

    return NextResponse.json({
      success: true,
      saved_to_db: !supabaseError,
    });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Gabim i papritur. Provo përsëri.' },
      { status: 500 }
    );
  }
}
