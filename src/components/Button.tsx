import React from 'react';

type Variant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'inverse';
type Size    = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  variant?:  Variant;
  size?:     Size;
  block?:    boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  as?:       React.ElementType;
  disabled?: boolean;
  href?:     string;
  type?:     'button' | 'submit' | 'reset';
}

const base =
  'inline-flex items-center justify-center gap-[0.5em] font-sans font-semibold leading-none whitespace-nowrap cursor-pointer select-none border-[1.5px] rounded-pill no-underline relative ' +
  '[transition:color_150ms_cubic-bezier(0.4,0,0.2,1),background-color_150ms_cubic-bezier(0.4,0,0.2,1),border-color_150ms_cubic-bezier(0.4,0,0.2,1),transform_150ms_cubic-bezier(0.34,1.56,0.64,1),box-shadow_240ms_cubic-bezier(0.16,1,0.3,1)] ' +
  'focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_#F1EFE8,0_0_0_5px_#8F86DC] ' +
  'active:translate-y-px active:scale-[0.985]';

const variants: Record<Variant, string> = {
  primary:   'bg-[#534AB7] text-white border-transparent shadow-brand hover:bg-[#443C9C] hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-16px_rgba(83,74,183,0.55)]',
  accent:    'bg-[#1D9E75] text-white border-transparent shadow-teal hover:bg-[#157E5E] hover:-translate-y-0.5',
  secondary: 'bg-white text-[#2C2C2A] border-[#CFCBBE] shadow-xs hover:border-[#8F86DC] hover:text-[#534AB7] hover:-translate-y-0.5 hover:shadow-sm',
  ghost:     'bg-transparent text-[#534AB7] border-transparent hover:bg-[#EEEDFE]',
  inverse:   'bg-[#EEEDFE] text-[#443C9C] border-transparent hover:bg-white hover:-translate-y-0.5',
};

const sizes: Record<Size, string> = {
  sm: 'text-[0.9375rem] px-4 py-2',
  md: 'text-base px-[1.4rem] py-[0.7rem]',
  lg: 'text-[clamp(1.05rem,1rem+0.4vw,1.3rem)] px-[1.9rem] py-[0.95rem]',
};

export function Button({
  children,
  variant  = 'primary',
  size     = 'md',
  block    = false,
  iconLeft,
  iconRight,
  as: Tag  = 'button',
  disabled = false,
  className,
  ...rest
}: ButtonProps) {
  const cls = [
    base,
    variants[variant],
    sizes[size],
    block    ? 'w-full'                   : '',
    disabled ? 'opacity-45 pointer-events-none' : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  return (
    <Tag
      className={cls}
      disabled={Tag === 'button' ? disabled : undefined}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {iconLeft  && <span className="inline-flex text-[1.15em]" aria-hidden="true">{iconLeft}</span>}
      {children}
      {iconRight && <span className="inline-flex text-[1.15em]" aria-hidden="true">{iconRight}</span>}
    </Tag>
  );
}
