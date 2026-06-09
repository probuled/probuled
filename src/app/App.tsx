import { useReveal }   from '@/shared/hooks';
import { LandingPage } from '@/pages/landing';

export function App() {
  useReveal();
  return <LandingPage />;
}
