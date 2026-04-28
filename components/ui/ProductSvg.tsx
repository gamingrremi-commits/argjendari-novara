interface ProductSvgProps {
  type: 'ring' | 'pendant' | 'earrings' | 'tennis' | 'watch' | 'mens';
  className?: string;
}

export function ProductSvg({ type, className }: ProductSvgProps) {
  const svgs: Record<string, JSX.Element> = {
    ring: (
      <svg viewBox="0 0 200 200" className={className}>
        <ellipse cx="100" cy="120" rx="50" ry="50" fill="none" stroke="#9B7F3F" strokeWidth="5" />
        <polygon points="100,60 125,90 113,105 87,105 75,90" fill="#E5C989" />
        <polygon points="87,105 113,105 100,123" fill="#C9A961" />
      </svg>
    ),
    pendant: (
      <svg viewBox="0 0 200 200" className={className}>
        <path d="M 60 70 Q 100 50, 140 70 Q 145 110, 100 150 Q 55 110, 60 70 Z" fill="none" stroke="#9B7F3F" strokeWidth="3" />
        <circle cx="100" cy="105" r="10" fill="#E5C989" />
        <circle cx="100" cy="105" r="6" fill="#F8F6F0" opacity="0.9" />
      </svg>
    ),
    earrings: (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="75" cy="100" r="22" fill="none" stroke="#9B7F3F" strokeWidth="3" />
        <circle cx="125" cy="100" r="22" fill="none" stroke="#9B7F3F" strokeWidth="3" />
        <circle cx="75" cy="100" r="8" fill="#E5C989" />
        <circle cx="125" cy="100" r="8" fill="#E5C989" />
      </svg>
    ),
    tennis: (
      <svg viewBox="0 0 200 200" className={className}>
        <ellipse cx="100" cy="100" rx="60" ry="22" fill="none" stroke="#9B7F3F" strokeWidth="3" />
        <ellipse cx="100" cy="100" rx="60" ry="22" fill="none" stroke="#C9A961" strokeWidth="1" opacity="0.5" />
        <circle cx="60" cy="100" r="4" fill="#E5C989" />
        <circle cx="100" cy="100" r="6" fill="#E5C989" />
        <circle cx="140" cy="100" r="4" fill="#E5C989" />
      </svg>
    ),
    watch: (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="100" cy="100" r="50" fill="none" stroke="#9B7F3F" strokeWidth="4" />
        <circle cx="100" cy="100" r="42" fill="none" stroke="#C9A961" strokeWidth="1" opacity="0.4" />
        <line x1="100" y1="65" x2="100" y2="100" stroke="#9B7F3F" strokeWidth="3" />
        <line x1="100" y1="100" x2="125" y2="115" stroke="#9B7F3F" strokeWidth="2" />
        <circle cx="100" cy="100" r="3" fill="#E5C989" />
        <line x1="100" y1="55" x2="100" y2="50" stroke="#9B7F3F" strokeWidth="3" />
        <line x1="100" y1="150" x2="100" y2="145" stroke="#9B7F3F" strokeWidth="3" />
      </svg>
    ),
    mens: (
      <svg viewBox="0 0 200 200" className={className}>
        <rect x="70" y="70" width="60" height="60" fill="none" stroke="#9B7F3F" strokeWidth="3" />
        <line x1="60" y1="100" x2="70" y2="100" stroke="#9B7F3F" strokeWidth="2" />
        <line x1="130" y1="100" x2="140" y2="100" stroke="#9B7F3F" strokeWidth="2" />
        <circle cx="100" cy="100" r="6" fill="#E5C989" />
      </svg>
    ),
  };

  return svgs[type] || svgs.ring;
}
