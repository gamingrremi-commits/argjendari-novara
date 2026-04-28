import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  type?: 'button' | 'submit';
  className?: string;
  disabled?: boolean;
  external?: boolean;
}

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  type = 'button',
  className,
  disabled,
  external,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center gap-3.5 text-[11px] tracking-widest uppercase font-medium transition-all duration-500 ease-luxe relative overflow-hidden';

  const variants = {
    primary: cn(
      'bg-ink-black text-pearl px-9 py-[18px]',
      'before:content-[""] before:absolute before:inset-0 before:bg-gold before:translate-y-full before:transition-transform before:duration-500 before:ease-luxe',
      'hover:before:translate-y-0',
      '[&>span]:relative [&>span]:z-10 [&>span]:transition-colors [&>span]:duration-500',
      'hover:[&>span]:text-ink-black'
    ),
    secondary: cn(
      'text-ink py-[18px] border-b border-ink',
      'hover:text-gold-dark hover:border-gold'
    ),
    ghost: cn(
      'text-gold-dark hover:text-gold'
    ),
  };

  const content = <span>{children}</span>;
  const classes = cn(baseStyles, variants[variant], className);

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(classes, disabled && 'opacity-50 cursor-not-allowed')}
    >
      {content}
    </button>
  );
}
