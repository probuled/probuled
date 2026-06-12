import { useState } from 'react';
import { Button } from '@/shared/ui';
import { Icon }   from '@/shared/ui';
import { useScrolled }  from '@/shared/hooks';
import { handleAnchorClick } from '@/shared/lib/scrollToAnchor';
import { NAV_LINKS } from '../nav.constants';

export function Nav() {
  const scrolled = useScrolled(24);
  const [open, setOpen] = useState(false);
  const solid = scrolled || open;

  return (
    <nav
      className={[
        'fixed inset-x-0 top-0 z-[200] border-b',
        '[transition:background_240ms_cubic-bezier(0.4,0,0.2,1),box-shadow_240ms_cubic-bezier(0.4,0,0.2,1),border-color_240ms_cubic-bezier(0.4,0,0.2,1)]',
        solid
          ? 'bg-[rgba(241,239,232,0.82)] backdrop-blur-[14px] saturate-[1.4] border-[#E4E1D6] shadow-xs'
          : 'border-transparent',
      ].join(' ')}
    >
      <div className="w-full max-w-wide mx-auto px-[clamp(1.25rem,4vw,4rem)] flex items-center justify-between h-[74px]">
        <a
          className="flex items-center gap-[0.7rem] font-display font-bold text-[clamp(1.1rem,4vw,1.35rem)] tracking-[-0.02em]"
          href="#top"
          onClick={(e) => { handleAnchorClick(e); setOpen(false); }}
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
            <a key={href} href={href} className="nav-link" onClick={handleAnchorClick}>{label}</a>
          ))}
        </div>

        <div className="flex items-center gap-[0.8rem]">
          <div className="nav-cta-desktop flex items-center">
            <Button variant="primary" size="sm" as="a" href="#cta" onClick={handleAnchorClick}>
              Iniciar um projeto
            </Button>
          </div>

          <button
            type="button"
            className="nav-burger items-center justify-center w-11 h-11 -mr-1 rounded-[10px] text-[#2C2763] hover:bg-black/[0.05] transition-colors"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'x' : 'menu'} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown — only reachable through the burger (≤880px) */}
      <div
        className={[
          'nav-mobile absolute inset-x-0 top-[74px] origin-top overflow-hidden',
          'bg-[rgba(241,239,232,0.97)] backdrop-blur-[14px] saturate-[1.4] border-b border-[#E4E1D6] shadow-md',
          '[transition:opacity_220ms_ease,transform_220ms_cubic-bezier(0.16,1,0.3,1)]',
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none',
        ].join(' ')}
      >
        <div className="w-full max-w-wide mx-auto px-[clamp(1.25rem,4vw,4rem)] py-3 flex flex-col">
          {NAV_LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="nav-link py-3 text-[1.05rem] border-b border-[#E4E1D6]/60 last:border-b-0"
              onClick={(e) => { handleAnchorClick(e); setOpen(false); }}
            >
              {label}
            </a>
          ))}
          <Button
            variant="primary"
            size="md"
            as="a"
            href="#cta"
            block
            className="mt-4 mb-1"
            onClick={(e) => { handleAnchorClick(e); setOpen(false); }}
          >
            Iniciar um projeto
          </Button>
        </div>
      </div>
    </nav>
  );
}
