import { Nav }         from './sections/Nav';
import { Hero }        from './sections/Hero';
import { Marquee }     from './sections/Marquee';
import { Services }    from './sections/Services';
import { Process }     from './sections/Process';
import { Stats }       from './sections/Stats';
import { TechStack }   from './sections/TechStack';
import { Testimonial } from './sections/Testimonial';
import { CTA }         from './sections/CTA';
import { Footer }      from './sections/Footer';
import { useReveal }   from './hooks/useReveal';

export function App() {
  useReveal();
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
