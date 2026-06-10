import { Button } from '@/shared/ui';
import { Icon }   from '@/shared/ui';

export function CTA() {
  return (
    <section className="py-[clamp(4rem,8vw,8rem)]" id="cta">
      <div className="w-full max-w-container mx-auto px-[clamp(1.25rem,4vw,4rem)]">
        <div className="reveal relative overflow-hidden rounded-2xl text-white text-center px-[clamp(3rem,6vw,5rem)] py-[clamp(3rem,6vw,5rem)] shadow-brand bg-[linear-gradient(135deg,#534AB7_0%,#38317E_100%)]">
          <div className="absolute rounded-full blur-[60px] opacity-50 z-0 pointer-events-none w-[380px] h-[380px] bg-[radial-gradient(circle_at_50%_50%,#63CDA6,#1D9E75)] top-[-120px] right-[-60px] animate-floaty-reverse" />
          <h2 className="font-display font-semibold text-[clamp(2rem,1.4rem+2.6vw,3rem)] relative z-[1]">
            Vamos construir algo pro.
          </h2>
          <p className="relative z-[1] mt-4 mb-8 max-w-[48ch] mx-auto text-[rgba(255,255,255,0.82)]">
            Conte o que você quer lançar. Respondemos em até um dia com um plano, um cronograma e um primeiro marco fechado.
          </p>
          <div className="relative z-[1] flex gap-4 justify-center flex-wrap">
            <Button variant="inverse" size="lg" as="a" href="#top" iconRight={<Icon name="arrow-right" size={18} />}>
              Iniciar um projeto
            </Button>
            <Button variant="ghost" size="lg" as="a" href="#top" style={{ color: '#fff' }} iconLeft={<Icon name="mail" size={18} />}>
              hello@probuled.com
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
