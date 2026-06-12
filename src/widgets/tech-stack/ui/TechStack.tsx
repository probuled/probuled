import { Icon } from "@/shared/ui";
import { SectionHeader } from "@/shared/ui";
import { TECH } from "../tech-stack.constants";

export function TechStack() {
  return (
    <section className="py-[clamp(4rem,8vw,8rem)] relative" id="stack">
      <div className="w-full max-w-container mx-auto px-[clamp(1.25rem,4vw,4rem)]">
        <SectionHeader
          eyebrow={
            <>
              <Icon name="cpu" size={14} /> Tecnologia
            </>
          }
          title="A ferramenta certa para cada problema"
          sub="Cada projeto começa pelo diagnóstico da dor, a escolha da stack é consequência, não premissa."
        />
        <div className="tech-6 grid grid-cols-[repeat(6,1fr)] gap-4">
          {TECH.map((tech, i) => (
            <div
              key={tech.name}
              className="flex flex-col items-center gap-[0.7rem] py-6 px-3 bg-white border border-[#E4E1D6] rounded-md [transition:transform_240ms_cubic-bezier(0.16,1,0.3,1),box-shadow_240ms_cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-md hover:border-[#B9B3ED] reveal"
              data-delay={String((i % 4) + 1)}
            >
              <span className="w-[46px] h-[46px] rounded-[12px] bg-[#EEEDFE] flex items-center justify-center text-[#534AB7]">
                <Icon name={tech.icon} size={24} />
              </span>
              <span className="text-[0.8125rem] font-semibold text-[#424039] text-center">
                {tech.name}
              </span>
              <span className="text-[0.75rem] text-[#807D72] text-center leading-[1.4]">
                {tech.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
