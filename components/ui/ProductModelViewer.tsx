'use client';

import Script from 'next/script';

export function ProductModelViewer({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <>
      <Script
        type="module"
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
        strategy="afterInteractive"
      />
      <model-viewer
        src={src}
        alt={alt}
        camera-controls
        auto-rotate
        shadow-intensity="1"
        exposure="1"
        interaction-prompt="auto"
        touch-action="pan-y"
        className={className ?? 'block h-full w-full bg-transparent'}
      />
    </>
  );
}
