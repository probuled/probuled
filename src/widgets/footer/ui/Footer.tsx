import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/probuled.com.br/", Icon: FaInstagram },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/probuled/", Icon: FaLinkedin  },
  { label: "X",         href: "https://x.com/probuled", Icon: FaXTwitter  },
  { label: "Email",     href: "mailto:probuled@gmail.com", Icon: MdOutlineEmail },
];

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#E4E1D6] pt-[4rem] pb-8">
      <div className="w-full max-w-container mx-auto px-[clamp(1.25rem,4vw,4rem)]">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
          <div className="max-w-[32ch]">
            <div className="flex items-center gap-[0.7rem] font-display font-bold text-[1.25rem]">
              <img
                src="/assets/logo/probuled-mark.png"
                alt="ProBuled"
                className="w-9 h-9 rounded-[9px]"
              />
              ProBuled
            </div>
            <p className="text-[0.9375rem] text-[#807D72] mt-4">
              Built pro, delivered right. Um estúdio de software que projeta, desenvolve e entrega produtos digitais modernos.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-xl border border-[#E4E1D6] text-[#807D72] [transition:color_150ms_cubic-bezier(0.4,0,0.2,1),border-color_150ms_cubic-bezier(0.4,0,0.2,1),background_150ms_cubic-bezier(0.4,0,0.2,1)] hover:text-[#534AB7] hover:border-[#534AB7] hover:bg-[#534AB7]/5"
              >
                <Icon size={19} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-[3rem] pt-6 border-t border-[#E4E1D6] text-[0.8125rem] text-[#807D72] flex-wrap gap-4">
          <span>© 2026 ProBuled. Todos os direitos reservados.</span>
          <span>Privacidade · Termos</span>
        </div>
      </div>
    </footer>
  );
}
