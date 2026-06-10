import React from 'react';

type Tone = 'brand' | 'teal' | 'neutral' | 'solid' | 'success' | 'outline';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  dot?:  boolean;
}

const tones: Record<Tone, string> = {
  brand:   'bg-[#EEEDFE] text-[#443C9C] border-[#D9D6F6]',
  teal:    'bg-[#ECFAF4] text-[#11644B] border-[#9FE3C8]',
  neutral: 'bg-[#FAF9F4] text-[#424039] border-[#CFCBBE]',
  solid:   'bg-[#534AB7] text-white border-transparent',
  success: 'bg-[#ECFAF4] text-[#11644B] border-[#9FE3C8]',
  outline: 'bg-transparent text-[#534AB7] border-[#B9B3ED]',
};

export function Badge({ children, tone = 'brand', dot = false, className, ...rest }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-[0.4em] font-sans font-semibold',
        'text-[0.8125rem] leading-none tracking-[0.02em]',
        'px-[0.75em] py-[0.4em] rounded-pill border whitespace-nowrap',
        tones[tone],
        className ?? '',
      ].filter(Boolean).join(' ')}
      {...rest}
    >
      {dot && <span className="w-[0.5em] h-[0.5em] rounded-full bg-current" aria-hidden="true" />}
      {children}
    </span>
  );
}
