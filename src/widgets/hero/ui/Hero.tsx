import { Button }       from '@/shared/ui';
import { Icon }         from '@/shared/ui';
import { HeroCodeCard } from './HeroCodeCard';

function DeliveryChip({ icon, label }: { icon: JSX.Element; label: string }) {
  return (
    <span className="inline-flex items-center gap-[0.45rem] font-mono text-[0.8125rem] font-medium text-[#424039] px-[0.75rem] py-[0.4rem] bg-white border border-[#E4E1D6] rounded-pill shadow-xs">
      {icon}
      {label}
    </span>
  );
}

export function Hero() {
  return (
    <header className="relative pt-[clamp(7rem,14vh,11rem)] pb-[clamp(4rem,8vw,8rem)] overflow-hidden" id="top">
      <div className="absolute rounded-full blur-[60px] opacity-50 z-0 pointer-events-none w-[520px] h-[520px] bg-[radial-gradient(circle_at_30%_30%,#8F86DC,#534AB7)] top-[-160px] right-[-120px] animate-floaty" />
      <div className="absolute rounded-full blur-[60px] opacity-50 z-0 pointer-events-none w-[380px] h-[380px] bg-[radial-gradient(circle_at_50%_50%,#63CDA6,#1D9E75)] bottom-[-140px] left-[-100px] animate-floaty-reverse" />

      <div className="hero-grid w-full max-w-wide mx-auto px-[clamp(1.25rem,4vw,4rem)] grid grid-cols-[1.05fr_0.95fr] gap-[clamp(2rem,5vw,5rem)] items-center">
        <div>
          <span className="enter inline-flex items-center gap-2 text-[0.75rem] font-bold tracking-[0.16em] uppercase text-[#157E5E]" data-d="1">
            <Icon name="sparkles" size={14} /> Software studio · Web · Mobile · APIs
          </span>

          <h1
            className="enter font-display font-bold tracking-[-0.03em] leading-[1.04] text-[clamp(3.25rem,1.8rem+6vw,6rem)] mt-[1.2rem]"
            data-d="2"
          >
            Built <span className="text-grad">pro</span>,<br />delivered right.
          </h1>

          <p className="enter text-[clamp(1.05rem,1rem+0.4vw,1.3rem)] text-[#424039] leading-[1.62] mt-6 max-w-[34ch]" data-d="3">
            A ProBuled projeta, desenvolve e entrega software web moderno. Engenharia e design de produto
            focados em fazer seu roadmap avançar toda semana.
          </p>

          <div className="enter flex flex-wrap gap-4 mt-[2.2rem]" data-d="4">
            <Button variant="primary" size="lg" as="a" href="#cta" className="animate-glow-pulse">
              Iniciar um projeto
            </Button>
            <Button variant="secondary" size="lg" as="a" href="#portfolio" iconLeft={<Icon name="play" size={16} />}>
              Ver nosso trabalho
            </Button>
          </div>

          <div className="enter flex items-center gap-[1.4rem] mt-[2.6rem] flex-wrap" data-d="5">
            <DeliveryChip icon={<Icon name="zap" size={13} />} label="Sem intermediários" />
            <DeliveryChip icon={<Icon name="git-branch" size={13} />} label="Código é seu" />
            <DeliveryChip icon={<Icon name="rocket" size={13} />} label="Zero surpresa" />
          </div>
        </div>

        <div className="enter" data-d="3">
          <HeroCodeCard />
        </div>
      </div>
    </header>
  );
}
