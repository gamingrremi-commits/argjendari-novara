'use client';

import { useState, forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ContactFormSchema, BOOKING_TYPE_LABELS, type ContactFormData } from '@/lib/validations/contact';
import type { Locale } from '@/lib/types';

const FIELD_LABELS: Record<string, string> = {
  first_name: 'Emri',
  last_name: 'Mbiemri',
  email: 'Email',
  phone: 'Telefon',
  type: 'Lloji i kërkesës',
  message: 'Mesazhi',
  preferred_date: 'Data',
};

interface ContactFormProps {
  locale?: Locale;
  defaultType?: ContactFormData['type'];
  defaultProductSlug?: string;
}

export function ContactForm({
  locale = 'sq',
  defaultType = 'showroom_visit',
  defaultProductSlug,
}: ContactFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const t = {
    sq: {
      title: 'Na shkruani',
      subtitle: 'Përgjigjemi brenda 24 orëve, zakonisht më shpejt.',
      firstName: 'Emri',
      firstNamePlaceholder: 'Emri juaj',
      lastName: 'Mbiemri',
      lastNamePlaceholder: 'Mbiemri',
      email: 'Email',
      emailPlaceholder: 'emaili@juaj.com',
      phone: 'Telefon',
      phonePlaceholder: '+355 ...',
      type: 'Çfarë ju intereson',
      preferredDate: 'Data e preferuar (opsionale)',
      message: 'Mesazhi juaj',
      messagePlaceholder: 'Tregona pak më shumë...',
      submit: 'Dërgo Mesazhin',
      submitting: 'Duke dërguar...',
      successTitle: 'Mesazhi juaj u dërgua!',
      successMessage:
        'Faleminderit. Do t\'ju kontaktoj brenda 24 orëve. Kontrolloni email-in për konfirmim.',
      successCta: 'Dërgo një tjetër',
      errorGeneric: 'Diçka shkoi keq. Provo përsëri ose na kontakto direkt.',
      errorRateLimit: 'Shumë kërkesa. Prit pak para se të provosh përsëri.',
    },
    en: {
      title: 'Write to us',
      subtitle: 'We respond within 24 hours, usually faster.',
      firstName: 'First name',
      firstNamePlaceholder: 'Your first name',
      lastName: 'Last name',
      lastNamePlaceholder: 'Last name',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      phone: 'Phone',
      phonePlaceholder: '+355 ...',
      type: 'What are you interested in',
      preferredDate: 'Preferred date (optional)',
      message: 'Your message',
      messagePlaceholder: 'Tell us a bit more...',
      submit: 'Send Message',
      submitting: 'Sending...',
      successTitle: 'Your message has been sent!',
      successMessage:
        'Thank you. We\'ll contact you within 24 hours. Check your email for confirmation.',
      successCta: 'Send another',
      errorGeneric: 'Something went wrong. Try again or contact us directly.',
      errorRateLimit: 'Too many requests. Please wait a moment before trying again.',
    },
  }[locale];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      type: defaultType,
      product_slug: defaultProductSlug,
      website: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);

    // Client-side validation
    const result = ContactFormSchema.safeParse(data);
    if (!result.success) {
      // Show the FIRST specific error, not generic message
      const firstError = result.error.issues[0];
      const fieldLabel = FIELD_LABELS[firstError.path[0] as string] || firstError.path[0];
      toast.error(`${fieldLabel}: ${firstError.message}`);
      console.error('Form validation errors:', result.error.flatten().fieldErrors);
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });

      if (res.status === 429) {
        toast.error(t.errorRateLimit);
        setSubmitting(false);
        return;
      }

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        toast.error(json.error || t.errorGeneric);
        setSubmitting(false);
        return;
      }

      setSuccess(true);
      reset();
      toast.success(t.successTitle);
    } catch (err) {
      toast.error(t.errorGeneric);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-pearl border border-line p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-gold flex items-center justify-center text-gold-dark text-3xl font-display">
          ✓
        </div>
        <h3 className="font-display text-3xl text-ink-black mb-4">{t.successTitle}</h3>
        <p className="font-serif italic text-lg text-ink mb-8 max-w-md mx-auto leading-relaxed">
          {t.successMessage}
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="text-[11px] tracking-widest uppercase text-gold-dark hover:text-ink-black transition-colors font-medium border-b border-gold pb-1"
        >
          {t.successCta}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-pearl border border-line p-8 md:p-12">
      <h3 className="font-display text-3xl text-ink-black mb-2">{t.title}</h3>
      <p className="font-serif italic text-base text-ink mb-8">{t.subtitle}</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Honeypot — hidden field for bots */}
        <input
          type="text"
          {...register('website')}
          tabIndex={-1}
          autoComplete="off"
          className="absolute -left-[9999px] opacity-0"
          aria-hidden="true"
        />

        <input type="hidden" {...register('product_slug')} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <FormField
            label={t.firstName}
            placeholder={t.firstNamePlaceholder}
            error={errors.first_name?.message}
            {...register('first_name')}
          />
          <FormField
            label={t.lastName}
            placeholder={t.lastNamePlaceholder}
            error={errors.last_name?.message}
            {...register('last_name')}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <FormField
            label={t.email}
            type="email"
            placeholder={t.emailPlaceholder}
            error={errors.email?.message}
            {...register('email')}
          />
          <FormField
            label={t.phone}
            type="tel"
            placeholder={t.phonePlaceholder}
            error={errors.phone?.message}
            {...register('phone')}
          />
        </div>

        <div className="mb-6">
          <label className="block text-[10px] tracking-widest uppercase text-gold-dark mb-2 font-medium">
            {t.type}
          </label>
          <select
            {...register('type')}
            className="w-full py-3.5 px-0 border-0 border-b border-line bg-transparent font-serif text-lg text-ink-black outline-none focus:border-gold transition-colors cursor-pointer"
          >
            {Object.entries(BOOKING_TYPE_LABELS[locale]).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <FormField
          label={t.preferredDate}
          type="date"
          {...register('preferred_date')}
          className="mb-6"
        />

        <div className="mb-8">
          <label className="block text-[10px] tracking-widest uppercase text-gold-dark mb-2 font-medium">
            {t.message}
          </label>
          <textarea
            {...register('message')}
            placeholder={t.messagePlaceholder}
            rows={3}
            className="w-full py-3.5 px-0 border-0 border-b border-line bg-transparent font-serif text-lg text-ink-black outline-none focus:border-gold transition-colors resize-y min-h-[80px] placeholder:text-ink/40"
          />
          {errors.message && (
            <p className="mt-2 text-xs text-red-700">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-[18px] bg-ink-black text-pearl border-none text-[11px] tracking-widest uppercase font-medium cursor-pointer transition-all duration-500 ease-luxe relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="absolute inset-0 bg-gold translate-y-full transition-transform duration-500 ease-luxe group-hover:translate-y-0 group-disabled:translate-y-full" />
          <span className="relative z-10 transition-colors duration-500 group-hover:text-ink-black">
            {submitting ? t.submitting : t.submit}
          </span>
        </button>
      </form>
    </div>
  );
}

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className={className}>
      <label className="block text-[10px] tracking-widest uppercase text-gold-dark mb-2 font-medium">
        {label}
      </label>
      <input
        ref={ref}
        {...props}
        className="w-full py-3.5 px-0 border-0 border-b border-line bg-transparent font-serif text-lg text-ink-black outline-none focus:border-gold transition-colors placeholder:text-ink/40"
      />
      {error && <p className="mt-2 text-xs text-red-700">{error}</p>}
    </div>
  )
);

FormField.displayName = 'FormField';
