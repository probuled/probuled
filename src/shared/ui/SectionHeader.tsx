import React from 'react';

interface SectionHeaderProps {
  eyebrow: React.ReactNode;
  title: string;
  sub: string;
}

export function SectionHeader({ eyebrow, title, sub }: SectionHeaderProps) {
  return (
    <div className="reveal max-w-narrow mx-auto text-center mb-[3rem]">
      <span className="inline-flex items-center gap-2 text-[0.75rem] font-bold tracking-[0.16em] uppercase text-[#157E5E]">
        {eyebrow}
      </span>
      <h2 className="font-display font-semibold tracking-[-0.015em] leading-[1.25] text-[clamp(2rem,1.4rem+2.6vw,3rem)] mt-[0.8rem]">
        {title}
      </h2>
      <p className="text-[clamp(1.05rem,1rem+0.4vw,1.3rem)] text-[#807D72] leading-[1.62] mt-4">{sub}</p>
    </div>
  );
}
