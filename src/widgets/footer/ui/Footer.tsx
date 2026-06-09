import { COLS } from '../footer.constants';

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#E4E1D6] pt-[4rem] pb-8">
      <div className="w-full max-w-container mx-auto px-[clamp(1.25rem,4vw,4rem)]">
        <div className="footer-grid grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-8">
          <div>
            <div className="flex items-center gap-[0.7rem] font-display font-bold text-[1.25rem]">
              <img src="/assets/logo/probuled-mark.png" alt="Probuled" className="w-9 h-9 rounded-[9px]" />
              Probuled
            </div>
            <p className="text-[0.9375rem] text-[#807D72] mt-4 max-w-[30ch]">
              Built pro, delivered right. A software studio shipping modern web products with React, Vite and Tailwind.
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.heading}>
              <h4 className="text-[0.8125rem] uppercase tracking-[0.02em] text-[#807D72] mb-4 font-bold">
                {col.heading}
              </h4>
              {col.links.map((link) => (
                <a
                  key={link}
                  href="#top"
                  className="block text-[0.9375rem] text-[#424039] py-[0.3rem] [transition:color_150ms_cubic-bezier(0.4,0,0.2,1)] hover:text-[#534AB7]"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-[3rem] pt-6 border-t border-[#E4E1D6] text-[0.8125rem] text-[#807D72] flex-wrap gap-4">
          <span>© 2026 Probuled. All rights reserved.</span>
          <span>Privacy · Terms · hello@probuled.com</span>
        </div>
      </div>
    </footer>
  );
}
