import { useState } from "react";
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { LegalModal } from "../../../shared/ui/LegalModal";
import { handleAnchorClick } from "@/shared/lib/scrollToAnchor";
import { COLS } from "../footer.constants";
import { PRIVACIDADE_CONTENT, TERMOS_CONTENT } from "../footer.legal";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/probuled.com.br/",
    Icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/probuled/",
    Icon: FaLinkedin,
  },
  { label: "X", href: "https://x.com/probuled", Icon: FaXTwitter },
  { label: "Email", href: "mailto:probuled@gmail.com", Icon: MdOutlineEmail },
];

type Modal = 'privacidade' | 'termos' | null;

export function Footer() {
  const [modal, setModal] = useState<Modal>(null);

  return (
    <footer
      className="bg-[#18171580] border-t border-[#E4E1D6]/10"
      style={{ background: "#131210" }}
    >
      {/* Top strip — tagline */}
      <div className="w-full border-b border-white/[0.06]">
        <div className="w-full max-w-container mx-auto px-[clamp(1.25rem,4vw,4rem)] py-10 flex flex-col items-center text-center gap-6 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div className="flex flex-col items-stretch gap-6 w-fit sm:contents">
            <p className="font-display font-bold text-[clamp(1.25rem,2.5vw,1.75rem)] text-white leading-tight max-w-[24ch]">
              Built pro, <span className="text-grad-light">delivered right.</span>
            </p>
            <a
              href="#cta"
              onClick={handleAnchorClick}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 rounded-lg bg-[#534AB7] hover:bg-[#6560C8] text-white font-semibold text-[0.8rem] [transition:background_150ms_ease] shrink-0"
            >
              Iniciar um projeto
            </a>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="w-full max-w-container mx-auto px-[clamp(1.25rem,4vw,4rem)] py-14">
        <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-12">
          {/* Brand column */}
          <div className="flex flex-col gap-6 items-center text-center sm:items-start sm:text-left">
            <a href="#top" onClick={handleAnchorClick} className="w-fit ml-0 -mt-10 sm:-ml-10 sm:-mt-16">
              <img
                src="/assets/logo/probuled-horizontal-sem-fundo.png"
                alt="ProBuled — Built pro, delivered right"
                className="h-44 sm:h-64 w-auto max-w-full rounded-2xl"
              />
            </a>
            <p className="text-[0.9rem] text-white/50 leading-relaxed max-w-[30ch] -mt-8 sm:-mt-12">
              Estúdio de software especializado em transformar ideias em
              produtos digitais modernos, do design à produção.
            </p>
            <div className="flex items-center gap-2.5 mt-1">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 text-white/40 [transition:color_150ms_ease,border-color_150ms_ease,background_150ms_ease] hover:text-white hover:border-white/20 hover:bg-white/5"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {COLS.map(({ heading, links }) => (
            <div key={heading}>
              <p className="text-[0.75rem] font-semibold tracking-[0.08em] uppercase text-white/30 mb-5">
                {heading}
              </p>
              <ul className="flex flex-col gap-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={handleAnchorClick}
                      className="text-[0.9rem] text-white/50 hover:text-white [transition:color_150ms_ease]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="w-full max-w-container mx-auto px-[clamp(1.25rem,4vw,4rem)] py-5 flex flex-col items-center text-center gap-4 sm:flex-row sm:items-center sm:justify-between sm:text-left text-[0.8rem] text-white/25">
          <span>© 2026 ProBuled. Todos os direitos reservados.</span>
          <div className="flex items-center gap-5">
            <button
              onClick={() => setModal('privacidade')}
              className="hover:text-white/50 [transition:color_150ms_ease] cursor-pointer"
            >
              Privacidade
            </button>
            <button
              onClick={() => setModal('termos')}
              className="hover:text-white/50 [transition:color_150ms_ease] cursor-pointer"
            >
              Termos
            </button>
          </div>
        </div>
      </div>
      {modal === 'privacidade' && (
        <LegalModal title="Política de Privacidade" onClose={() => setModal(null)}>
          {PRIVACIDADE_CONTENT}
        </LegalModal>
      )}
      {modal === 'termos' && (
        <LegalModal title="Termos de Uso" onClose={() => setModal(null)}>
          {TERMOS_CONTENT}
        </LegalModal>
      )}
    </footer>
  );
}
