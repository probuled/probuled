import { Icon } from '@/shared/ui';

export function HeroCodeCard() {
  return (
    <div className="hero__visual relative z-[1]">
      <div className="float-badge absolute bg-white border border-[#E4E1D6] rounded-md shadow-lg px-[0.95rem] py-[0.7rem] flex items-center gap-[0.6rem] z-[2] text-[0.9375rem] font-semibold top-[-26px] left-[-34px] animate-bob">
        <span className="w-[34px] h-[34px] rounded-[9px] bg-teal-50 text-teal-600 flex items-center justify-center">
          <Icon name="check-circle" size={20} />
        </span>
        Entregue em 6 semanas
      </div>

      <div className="codecard bg-[#211D44] rounded-xl shadow-[0_40px_90px_-30px_rgba(44,28,90,0.6)] border border-[rgba(238,237,254,0.1)] overflow-hidden [transform:perspective(1400px)_rotateY(-9deg)_rotateX(4deg)] [transition:transform_420ms_cubic-bezier(0.16,1,0.3,1)] hover:[transform:perspective(1400px)_rotateY(-3deg)_rotateX(1deg)]">
        <div className="flex items-center gap-2 px-[1.1rem] py-[0.9rem] bg-black/[0.18] border-b border-[rgba(238,237,254,0.08)]">
          <span className="w-[11px] h-[11px] rounded-full bg-[#ED6A5E]" />
          <span className="w-[11px] h-[11px] rounded-full bg-[#F5BF4F]" />
          <span className="w-[11px] h-[11px] rounded-full bg-[#61C554]" />
          <span className="ml-[0.7rem] font-mono text-[12px] text-[rgba(238,237,254,0.6)]">App.tsx · probuled</span>
        </div>
        <div className="px-[clamp(1rem,4vw,1.5rem)] pt-[1.3rem] pb-[1.7rem] font-mono text-[clamp(10px,2.7vw,13.5px)] leading-[1.85] text-[#CFCBE8]">
          <span className="block whitespace-pre"><span className="text-[#6E6A90]">// shipped, typed and tested</span></span>
          <span className="block whitespace-pre"><span className="text-[#8F86DC]">import</span>{' { ship } '}<span className="text-[#8F86DC]">from</span> <span className="text-[#63CDA6]">'@probuled/core'</span></span>
          <span className="block whitespace-pre">&nbsp;</span>
          <span className="block whitespace-pre"><span className="text-[#8F86DC]">export default function</span> <span className="text-[#B9B3ED]">App</span>() {'{'}</span>
          <span className="block whitespace-pre">{'  '}<span className="text-[#8F86DC]">return</span> ship({'{'}</span>
          <span className="block whitespace-pre">{'    '}stack: [<span className="text-[#63CDA6]">'React'</span>, <span className="text-[#63CDA6]">'Vite'</span>, <span className="text-[#63CDA6]">'Tailwind'</span>],</span>
          <span className="block whitespace-pre">{'    '}weeks: <span className="text-[#E0A800]">6</span>,</span>
          <span className="block whitespace-pre">{'    '}quality: <span className="text-[#63CDA6]">'pro'</span><span className="inline-block w-2 h-4 bg-[#63CDA6] [vertical-align:-2px] animate-blink" /></span>
          <span className="block whitespace-pre">{'  '}{'}'}</span>
          <span className="block whitespace-pre">{'}'}</span>
        </div>
      </div>

      <div className="float-badge absolute bg-white border border-[#E4E1D6] rounded-md shadow-lg px-[0.95rem] py-[0.7rem] flex items-center gap-[0.6rem] z-[2] text-[0.9375rem] font-semibold bottom-[-22px] right-[-26px] animate-bob-delayed">
        <span className="w-[34px] h-[34px] rounded-[9px] bg-purple-100 text-purple-600 flex items-center justify-center">
          <Icon name="gauge" size={20} />
        </span>
        99,9% de uptime
      </div>
    </div>
  );
}
