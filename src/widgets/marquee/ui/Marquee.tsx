import { MARQUEE_ITEMS } from "../marquee.constants";

export function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section className="group py-[2.5rem] border-y border-[#E4E1D6] bg-white overflow-hidden">
      <div className="text-center text-[0.8125rem] text-[#807D72] font-semibold tracking-[0.02em] uppercase mb-6">
        Clientes que confiam na ProBuled
      </div>
      <div className="flex items-center w-max animate-scroll-x group-hover:[animation-play-state:paused]">
        {items.map((item, i) =>
          item.type === "logo" ? (
            <div
              key={i}
              className={`h-24 flex items-center justify-center px-6 sm:px-14 ${item.offset ?? ""}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className={`${item.height} w-auto object-contain grayscale opacity-50 [transition:filter_200ms_ease,opacity_200ms_ease] hover:grayscale-0 hover:opacity-100`}
              />
            </div>
          ) : (
            <span
              key={i}
              className="px-6 sm:px-14 font-display font-bold text-[1.5rem] text-[#ABA79A] whitespace-nowrap [transition:color_150ms_cubic-bezier(0.4,0,0.2,1)] hover:text-[#534AB7]"
            >
              {item.label}
            </span>
          ),
        )}
      </div>
    </section>
  );
}
