import { CLIENTS } from '../data/marquee';

export function Marquee() {
  const items = [...CLIENTS, ...CLIENTS];
  return (
    <section className="group py-[2.5rem] border-y border-[#E4E1D6] bg-white overflow-hidden">
      <div className="text-center text-[0.8125rem] text-[#807D72] font-semibold tracking-[0.02em] uppercase mb-6">
        Teams that ship with Probuled
      </div>
      <div className="flex gap-[3.5rem] w-max animate-scroll-x group-hover:[animation-play-state:paused]">
        {items.map((m, i) => (
          <span
            key={i}
            className="font-display font-bold text-[1.5rem] text-[#ABA79A] whitespace-nowrap [transition:color_150ms_cubic-bezier(0.4,0,0.2,1)] hover:text-[#534AB7]"
          >
            {m}
          </span>
        ))}
      </div>
    </section>
  );
}
