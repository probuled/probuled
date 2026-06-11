import { Icon, SectionHeader } from "@/shared/ui";
import { SOCIAL_NETWORKS } from "../social-follow.constants";

export function SocialFollow() {
  return (
    <section className="py-[clamp(4rem,8vw,8rem)] bg-white border-t border-[#E4E1D6]" id="community">
      <div className="w-full max-w-container mx-auto px-[clamp(1.25rem,4vw,4rem)]">
        <SectionHeader
          eyebrow={<><Icon name="users" size={14} /> Comunidade</>}
          title="Acompanhe a ProBuled"
          sub="Conteúdo sobre produto, engenharia e bastidores do estúdio. Siga onde preferir."
        />

        <div className="grid-3 grid grid-cols-[repeat(3,1fr)] gap-[1.4rem]">
          {SOCIAL_NETWORKS.map(({ label, handle, description, href, Icon: NetworkIcon, cta, theme }, i) => (
            <div className="reveal" data-delay={String(i + 1)} key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  "--net-border": theme.borderColor,
                  "--net-shadow": theme.shadowColor,
                } as React.CSSProperties}
                className="social-card group flex flex-col gap-5 h-full rounded-2xl border border-[#E4E1D6] bg-white p-8"
              >
                <div className="flex items-center justify-between">
                  <div
                    style={{ background: theme.iconBg }}
                    className="flex items-center justify-center w-12 h-12 rounded-xl text-white"
                  >
                    <NetworkIcon size={22} />
                  </div>
                  <span
                    style={{ color: theme.borderColor } as React.CSSProperties}
                    className="opacity-30 [transition:opacity_200ms,transform_200ms] group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1"
                  >
                    <Icon name="arrow-up-right" size={18} />
                  </span>
                </div>

                <div className="flex flex-col gap-1 flex-1">
                  <span className="font-display font-bold text-[1.1rem]">{label}</span>
                  <span className="text-[0.875rem] text-[#807D72] font-mono">{handle}</span>
                  <p className="text-[0.9375rem] text-[#424039] leading-[1.55] mt-2">{description}</p>
                </div>

                <span
                  style={{ color: theme.ctaColor }}
                  className="inline-flex items-center gap-2 text-[0.875rem] font-semibold"
                >
                  {cta}
                  <Icon name="arrow-right" size={14} />
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
