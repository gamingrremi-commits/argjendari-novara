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
  ['--poster-color' as keyof CSSProperties]: 'transparent',
  ['--progress-bar-height' as keyof CSSProperties]: '0px',
  ['--progress-bar-color' as keyof CSSProperties]: 'transparent',
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
        disable-pan
        auto-rotate
        auto-rotate-delay="0"
        camera-orbit="0deg 75deg 180%"
        min-camera-orbit="auto auto 120%"
        max-camera-orbit="auto auto 240%"
        field-of-view="40deg"
        min-field-of-view="28deg"
        max-field-of-view="48deg"
        scale="0.72 0.72 0.72"
        shadow-intensity="1"
        exposure="1"
        interaction-prompt="none"
        touch-action="pan-y"
        className={className}
        style={VIEWER_STYLE}
      />
    </>
  );
}
