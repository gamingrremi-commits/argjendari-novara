import type * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        alt?: string;
        poster?: string;
        loading?: 'auto' | 'eager' | 'lazy';
        reveal?: string;
        exposure?: string;
        scale?: string;
        'shadow-intensity'?: string;
        'camera-controls'?: boolean;
        'disable-pan'?: boolean;
        'auto-rotate'?: boolean;
        'auto-rotate-delay'?: string;
        'camera-orbit'?: string;
        'min-camera-orbit'?: string;
        'max-camera-orbit'?: string;
        'field-of-view'?: string;
        'min-field-of-view'?: string;
        'max-field-of-view'?: string;
        'interaction-prompt'?: string;
        'touch-action'?: string;
      };
    }
  }
}

export {};
