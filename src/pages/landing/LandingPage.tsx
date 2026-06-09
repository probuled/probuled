import { Nav }         from '@/widgets/nav';
import { Hero }        from '@/widgets/hero';
import { Marquee }     from '@/widgets/marquee';
import { Services }    from '@/widgets/services';
import { Process }     from '@/widgets/process';
import { Stats }       from '@/widgets/stats';
import { TechStack }   from '@/widgets/tech-stack';
import { Testimonial } from '@/widgets/testimonial';
import { CTA }         from '@/widgets/cta';
import { Footer }      from '@/widgets/footer';

export function LandingPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Process />
        <Stats />
        <TechStack />
        <Testimonial />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
