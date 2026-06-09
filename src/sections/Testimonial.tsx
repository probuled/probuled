import { Badge } from '../components/Badge';

export function Testimonial() {
  return (
    <section className="py-[clamp(4rem,8vw,8rem)] relative bg-purple-100" id="work">
      <div className="w-full max-w-container mx-auto px-[clamp(1.25rem,4vw,4rem)]">
        <div className="reveal max-w-narrow mx-auto text-center">
          <Badge tone="teal" dot>Client story</Badge>

          <blockquote
            className="font-display font-semibold text-[clamp(2rem,1.4rem+2.6vw,3rem)] leading-[1.3] tracking-[-0.01em] mt-[1.4rem]"
          >
            "Probuled shipped our platform in six weeks — typed, tested and genuinely
            <span className="text-grad"> built right</span>. It felt like an in-house team, not an agency."
          </blockquote>

          <div className="flex items-center justify-center gap-[0.9rem] mt-8">
            <div className="w-12 h-12 rounded-full text-white flex items-center justify-center font-display font-bold bg-gradient-to-br from-purple-600 to-purple-800">
              MR
            </div>
            <div className="text-left">
              <b className="font-bold block">Mara Reis</b>
              <span className="text-[0.9375rem] text-[#807D72]">VP Product, Meridian</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
