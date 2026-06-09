import { useCountUp } from '../hooks/useCountUp';
import { STATS } from '../data/stats';
import type { StatItem } from '../data/stats';

function Stat({ to, suffix, label, decimals }: StatItem) {
  const [ref, val] = useCountUp(to, decimals);
  return (
    <div className="stat text-center" ref={ref}>
      <div className="font-display font-extrabold text-[clamp(2.6rem,5vw,3.8rem)] leading-none tracking-[-0.02em]">
        <span className="text-grad-light">{val}{suffix}</span>
      </div>
      <div className="mt-[0.6rem] text-[rgba(241,239,232,0.66)] text-[0.9375rem]">{label}</div>
    </div>
  );
}

export function Stats() {
  return (
    <section className="py-[clamp(4rem,8vw,8rem)] relative overflow-hidden bg-[#2C2C2A] text-[#F1EFE8]">
      <div className="absolute rounded-full blur-[60px] opacity-[0.4] z-0 pointer-events-none w-[520px] h-[520px] bg-[radial-gradient(circle_at_30%_30%,#8F86DC,#534AB7)] top-[-200px] right-[10%] animate-floaty" />
      <div className="w-full max-w-container mx-auto px-[clamp(1.25rem,4vw,4rem)] relative z-[1]">
        <div className="stats-4 grid grid-cols-[repeat(4,1fr)] gap-8">
          {STATS.map((s) => <Stat key={s.label} {...s} />)}
        </div>
      </div>
    </section>
  );
}
