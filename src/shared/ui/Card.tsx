import React from 'react';

type Tone = 'default' | 'tint' | 'teal' | 'dark' | 'brand';
type Pad  = 'sm' | 'md' | 'lg';

interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?:        Tone;
  pad?:         Pad;
  interactive?: boolean;
  icon?:        React.ReactNode;
  title?:       React.ReactNode;
}

const tones: Record<Tone, string> = {
  default: 'bg-white border-[#E4E1D6]',
  tint:    'bg-[#EEEDFE] border-[#D9D6F6]',
  teal:    'bg-[#ECFAF4] border-[#9FE3C8]',
  dark:    'bg-[#2C2C2A] border-[rgba(238,237,254,0.16)] text-[#F1EFE8] shadow-lg',
  brand:   'bg-gradient-to-br from-[#534AB7] to-[#38317E] border-transparent text-white shadow-brand',
};

// Body text color per tone — adding a new tone means adding one entry here,
// not editing a conditional (OCP: open for extension, closed for modification).
const toneBody: Record<Tone, string> = {
  default: 'text-neutral-700',
  tint:    'text-neutral-700',
  teal:    'text-neutral-700',
  dark:    'text-[rgba(241,239,232,0.66)]',
  brand:   'text-[rgba(255,255,255,0.82)]',
};

const pads: Record<Pad, string> = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  children,
  tone        = 'default',
  pad         = 'md',
  interactive = false,
  icon,
  title,
  className,
  ...rest
}: CardProps) {
  return (
    <div
      className={[
        'block border rounded-lg shadow-sm',
        '[transition:transform_240ms_cubic-bezier(0.16,1,0.3,1),box-shadow_240ms_cubic-bezier(0.16,1,0.3,1),border-color_240ms_cubic-bezier(0.4,0,0.2,1)]',
        tones[tone],
        pads[pad],
        interactive ? 'cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:border-[#B9B3ED]' : '',
        className ?? '',
      ].filter(Boolean).join(' ')}
      {...rest}
    >
      {icon && (
        <span
          className="inline-flex items-center justify-center w-12 h-12 rounded-md mb-4 bg-[#EEEDFE] text-[#534AB7] text-2xl"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      {title && (
        <h3 className="font-display font-semibold text-[clamp(1.2rem,1.05rem+0.7vw,1.5rem)] leading-[1.25] tracking-[-0.015em] mb-2 text-inherit">
          {title}
        </h3>
      )}
      {(title || icon)
        ? <div className={['font-sans text-base leading-[1.62]', toneBody[tone]].join(' ')}>{children}</div>
        : children}
    </div>
  );
}
