'use client';

import Script from 'next/script';
import type { CSSProperties } from 'react';

const VIEWER_STYLE: CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'block',
  backgroundColor: 'transparent',
  border: '0',
  outline: 'none',
  // model-viewer reads this CSS variable for its default poster layer.
  ['--poster-color' as keyof CSSProperties]: 'transparent',
};

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
        loading="eager"
        camera-controls
        auto-rotate
        shadow-intensity="1"
        exposure="1"
        interaction-prompt="auto"
        touch-action="pan-y"
        className={className}
        style={VIEWER_STYLE}
      />
    </>
  );
}
