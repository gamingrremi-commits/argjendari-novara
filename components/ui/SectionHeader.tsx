import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: 'center' | 'left';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'reveal mb-[100px]',
        align === 'center' ? 'text-center' : 'text-left',
        className
      )}
    >
      <div className={cn('eyebrow mb-6', align === 'left' && 'left')}>
        {eyebrow}
      </div>
      <h2 className="font-display text-display-md text-ink-black mb-6">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'font-serif italic text-xl text-ink leading-snug',
            align === 'center' && 'max-w-[600px] mx-auto'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
