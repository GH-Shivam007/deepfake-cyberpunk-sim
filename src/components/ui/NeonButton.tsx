
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'purple' | 'cyan' | 'pink';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'ghost';
  glowing?: boolean;
  glitch?: boolean;
}

const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, color = 'purple', size = 'md', variant = 'solid', glowing = true, glitch = false, children, ...props }, ref) => {
    // Base styles for all buttons
    const baseStyles = 'relative font-orbitron inline-flex items-center justify-center whitespace-nowrap rounded-md transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50';
    
    // Size variations
    const sizeStyles = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-5 text-sm',
      lg: 'h-12 px-8 text-base'
    };
    
    // Color variations
    const colorStyles = {
      purple: {
        solid: 'bg-cyberpunk-purple text-white hover:bg-opacity-80',
        outline: 'border-2 border-cyberpunk-purple text-cyberpunk-purple hover:bg-cyberpunk-purple/10',
        ghost: 'text-cyberpunk-purple hover:bg-cyberpunk-purple/10'
      },
      cyan: {
        solid: 'bg-cyberpunk-cyan text-cyberpunk-dark hover:bg-opacity-80',
        outline: 'border-2 border-cyberpunk-cyan text-cyberpunk-cyan hover:bg-cyberpunk-cyan/10',
        ghost: 'text-cyberpunk-cyan hover:bg-cyberpunk-cyan/10'
      },
      pink: {
        solid: 'bg-cyberpunk-pink text-white hover:bg-opacity-80',
        outline: 'border-2 border-cyberpunk-pink text-cyberpunk-pink hover:bg-cyberpunk-pink/10',
        ghost: 'text-cyberpunk-pink hover:bg-cyberpunk-pink/10'
      }
    };
    
    // Glow effect
    const glowStyles = {
      purple: glowing ? 'shadow-[0_0_15px_rgba(155,77,255,0.5)]' : '',
      cyan: glowing ? 'shadow-[0_0_15px_rgba(0,255,255,0.5)]' : '',
      pink: glowing ? 'shadow-[0_0_15px_rgba(255,0,255,0.5)]' : ''
    };
    
    // Glitch effect
    const glitchClass = glitch ? 'animate-glitch-horizontal' : '';
    
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          sizeStyles[size],
          colorStyles[color][variant],
          glowStyles[color],
          glitchClass,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

NeonButton.displayName = 'NeonButton';

export default NeonButton;
