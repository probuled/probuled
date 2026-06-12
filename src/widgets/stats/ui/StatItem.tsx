import { useCountUp } from '@/shared/hooks';
import type { StatData } from '../stats.types';

export function StatItem({ to, suffix, label, decimals }: StatData) {
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
