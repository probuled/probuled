import { Icon }          from '@/shared/ui';
import { SectionHeader } from '@/shared/ui';
import { STEPS }         from '../process.constants';

export function Process() {
  return (
    <section className="py-[clamp(4rem,8vw,8rem)] relative bg-white border-y border-[#E4E1D6]" id="process">
      <div className="w-full max-w-container mx-auto px-[clamp(1.25rem,4vw,4rem)]">
        <SectionHeader
          eyebrow={<><Icon name="git-branch" size={14} /> Processo</>}
          title="Um caminho claro da ideia ao produto"
          sub="Sem caixas-pretas. Toda semana você vê progresso que pode clicar."
        />
        <div className="steps-4 grid grid-cols-[repeat(4,1fr)] gap-[1.2rem]">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="relative pt-8 pb-6 px-6 bg-white border border-[#E4E1D6] rounded-lg shadow-xs [transition:transform_240ms_cubic-bezier(0.16,1,0.3,1),box-shadow_240ms_cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-md reveal"
              data-delay={String(i + 1)}
            >
              <div className="font-display font-extrabold text-[2.4rem] leading-none text-[#D9D6F6]">{step.number}</div>
              <h3 className="font-display font-semibold text-[clamp(1.2rem,1.05rem+0.7vw,1.5rem)] mt-[0.8rem] mb-[0.5rem]">{step.title}</h3>
              <p className="text-[0.9375rem] text-[#424039]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
