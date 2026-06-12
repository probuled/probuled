import { Button, Icon } from '@/shared/ui';
import { useScrolled }  from '@/shared/hooks';
import { NAV_LINKS } from '../nav.constants';

export function Nav() {
  const scrolled = useScrolled(24);

  return (
    <nav
      className={[
        'fixed inset-x-0 top-0 z-[200] border-b',
        '[transition:background_240ms_cubic-bezier(0.4,0,0.2,1),box-shadow_240ms_cubic-bezier(0.4,0,0.2,1),border-color_240ms_cubic-bezier(0.4,0,0.2,1)]',
        scrolled
          ? 'bg-[rgba(241,239,232,0.82)] backdrop-blur-[14px] saturate-[1.4] border-[#E4E1D6] shadow-xs'
          : 'border-transparent',
      ].join(' ')}
    >
      <div className="w-full max-w-wide mx-auto px-[clamp(1.25rem,4vw,4rem)] flex items-center justify-between h-[74px]">
        <a
          className="flex items-center gap-[0.7rem] font-display font-bold text-[1.35rem] tracking-[-0.02em]"
          href="#top"
        >
          <img
            src="/assets/logo/probuled-mark.png"
            alt="ProBuled"
            className="w-[38px] h-[38px] rounded-[10px] shadow-sm"
          />
          <span className="text-[#2C2763]">ProBuled</span>
        </a>

        <div className="nav-links flex items-center gap-8">
          {NAV_LINKS.map(([href, label]) => (
            <a key={href} href={href} className="nav-link">{label}</a>
          ))}
        </div>

        <div className="flex items-center gap-[0.8rem]">
          <Button variant="ghost" size="sm" as="a" href="#top">Entrar</Button>
          <Button variant="primary" size="sm" as="a" href="#cta" iconRight={<Icon name="arrow-right" size={16} />}>
            Iniciar um projeto
          </Button>
        </div>
      </div>
    </nav>
  );
}
