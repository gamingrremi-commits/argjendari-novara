'use client';

import Script from 'next/script';
import type { Locale } from '@/lib/types';

const COPY = {
  sq: {
    title: 'Preview 3D',
    note: 'Rrotullo modelin me maus ose me gisht për ta parë nga çdo kënd.',
    fallback: 'Shfletuesi yt nuk e mbështet preview-n 3D.',
  },
  en: {
    title: '3D Preview',
    note: 'Rotate the model with your mouse or finger to inspect it from every angle.',
    fallback: 'Your browser does not support the 3D preview.',
  },
} as const;

export function ProductModelViewer({
  src,
  alt,
  locale,
}: {
  src: string;
  alt: string;
  locale: Locale;
}) {
  const copy = COPY[locale];

  return (
    <div className="mb-10 border border-line bg-white/70 p-5 backdrop-blur-sm">
      <Script
        type="module"
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
        strategy="afterInteractive"
      />

      <div className="mb-4 text-[10px] font-medium uppercase tracking-widest text-gold-dark">
        {copy.title}
      </div>

      <div className="overflow-hidden border border-line bg-gradient-to-br from-pearl to-pearl-warm">
        <model-viewer
          src={src}
          alt={alt}
          camera-controls
          auto-rotate
          shadow-intensity="1"
          exposure="1"
          interaction-prompt="auto"
          touch-action="pan-y"
          className="h-[420px] w-full bg-transparent"
        >
          {copy.fallback}
        </model-viewer>
      </div>

      <p className="mt-3 font-serif text-sm italic text-ink/60">{copy.note}</p>
    </div>
  );
}
