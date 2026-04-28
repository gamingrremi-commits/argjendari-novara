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
        'shadow-intensity'?: string;
        'camera-controls'?: boolean;
        'auto-rotate'?: boolean;
        'interaction-prompt'?: string;
        'touch-action'?: string;
      };
    }
  }
}

export {};
