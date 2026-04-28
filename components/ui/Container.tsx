import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide';
}

export function Container({ children, className, size = 'default' }: ContainerProps) {
  const sizes = {
    narrow: 'max-w-[1200px]',
    default: 'max-w-[1440px]',
    wide: 'max-w-[1600px]',
  };

  return (
    <div className={cn('mx-auto w-full', sizes[size], className)}>
      {children}
    </div>
  );
}
