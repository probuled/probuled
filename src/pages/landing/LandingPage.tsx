import { Hero } from "@/widgets/hero";
import { Marquee } from "@/widgets/marquee";
import { Services } from "@/widgets/services";
import { Process } from "@/widgets/process";
import { Stats } from "@/widgets/stats";
import { TechStack } from "@/widgets/tech-stack";
import { Testimonial } from "@/widgets/testimonial";
import { CTA } from "@/widgets/cta";

// Page-level content only. Global chrome (Nav/Footer) lives in the root route
// layout (src/routes/__root.tsx) so it is shared across future routes.
export function LandingPage() {
  return (
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
  );
}
