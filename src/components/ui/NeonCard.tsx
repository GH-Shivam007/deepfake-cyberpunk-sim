
import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface NeonCardProps extends HTMLAttributes<HTMLDivElement> {
  color?: 'purple' | 'cyan' | 'pink';
  intensity?: 'low' | 'medium' | 'high';
  hover?: boolean;
  children?: ReactNode;
}

const NeonCard = forwardRef<HTMLDivElement, NeonCardProps>(
  ({ className, color = 'purple', intensity = 'medium', hover = true, children, ...props }, ref) => {
    const baseStyles = 'relative rounded-lg bg-cyberpunk-dark bg-opacity-70 backdrop-blur-sm p-6 transition-all duration-300';
    
    const intensityValue = {
      low: {
        purple: 'border border-cyberpunk-purple/50 shadow-[0_0_5px_rgba(155,77,255,0.3)]',
        cyan: 'border border-cyberpunk-cyan/50 shadow-[0_0_5px_rgba(0,255,255,0.3)]',
        pink: 'border border-cyberpunk-pink/50 shadow-[0_0_5px_rgba(255,0,255,0.3)]'
      },
      medium: {
        purple: 'border-2 border-cyberpunk-purple/70 shadow-[0_0_10px_rgba(155,77,255,0.5)]',
        cyan: 'border-2 border-cyberpunk-cyan/70 shadow-[0_0_10px_rgba(0,255,255,0.5)]',
        pink: 'border-2 border-cyberpunk-pink/70 shadow-[0_0_10px_rgba(255,0,255,0.5)]'
      },
      high: {
        purple: 'border-2 border-cyberpunk-purple shadow-[0_0_20px_rgba(155,77,255,0.7)]',
        cyan: 'border-2 border-cyberpunk-cyan shadow-[0_0_20px_rgba(0,255,255,0.7)]',
        pink: 'border-2 border-cyberpunk-pink shadow-[0_0_20px_rgba(255,0,255,0.7)]'
      }
    };
    
    const hoverStyles = hover
      ? {
          purple: 'hover:shadow-[0_0_25px_rgba(155,77,255,0.8)] hover:border-cyberpunk-purple hover:-translate-y-1',
          cyan: 'hover:shadow-[0_0_25px_rgba(0,255,255,0.8)] hover:border-cyberpunk-cyan hover:-translate-y-1',
          pink: 'hover:shadow-[0_0_25px_rgba(255,0,255,0.8)] hover:border-cyberpunk-pink hover:-translate-y-1'
        }
      : {};
    
    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          intensityValue[intensity][color],
          hover ? hoverStyles[color] : '',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NeonCard.displayName = 'NeonCard';

export default NeonCard;
