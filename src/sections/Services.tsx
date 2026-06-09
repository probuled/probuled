import { Card } from '../components/Card';
import { Icon } from '../components/Icon';
import { SecHead } from '../components/SecHead';
import { SERVICES } from '../data/services';

export function Services() {
  return (
    <section className="py-[clamp(4rem,8vw,8rem)] relative" id="services">
      <div className="w-full max-w-container mx-auto px-[clamp(1.25rem,4vw,4rem)]">
        <SecHead
          eyebrow={<><Icon name="zap" size={14} /> What we do</>}
          title="Engineering that earns its keep"
          sub="Three ways teams partner with Probuled — each delivered by a senior pod, not a hand-off."
        />
        <div className="grid-3 grid grid-cols-[repeat(3,1fr)] gap-[1.4rem]">
          {SERVICES.map((s, i) => (
            <div className="reveal h-full" data-delay={String(i + 1)} key={s.title}>
              <Card interactive pad="lg" icon={<Icon name={s.icon} />} title={s.title} className="h-full">
                {s.body}
                <ul className="mt-4 p-0 list-none flex flex-col gap-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-[0.9375rem] text-[#424039]">
                      <span className="text-[#157E5E] flex-none"><Icon name="check" size={16} /></span>
                      {p}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
