import { Hero } from "@/widgets/hero";
import { Marquee } from "@/widgets/marquee";
import { Services } from "@/widgets/services";
import { Process } from "@/widgets/process";
import { Stats } from "@/widgets/stats";
import { Portfolio } from "@/widgets/portfolio";
import { TechStack } from "@/widgets/tech-stack";
import { CTA } from "@/widgets/cta";
import { SocialFollow } from "@/widgets/social-follow";

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
      <Portfolio />
      <TechStack />
      <CTA />
      <SocialFollow />
    </main>
  );
}
