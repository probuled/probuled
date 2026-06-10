import type { ServiceItem } from './services.types';

export const SERVICES: ServiceItem[] = [
  {
    icon:   'code',
    title:  'Product engineering',
    body:   'Full-stack React apps built on Vite and Tailwind — typed, tested and production-ready.',
    points: ['Design systems', 'Component libraries', 'API & infra'],
  },
  {
    icon:   'layers',
    title:  'Platform & MVP',
    body:   'From blank repo to live product. We scope tight, ship weekly and hand you code you own.',
    points: ['6-week MVPs', 'CI/CD pipelines', 'Cloud deploys'],
  },
  {
    icon:   'gauge',
    title:  'Scale & reliability',
    body:   'Performance audits, observability and hardening so your software stays fast as you grow.',
    points: ['Core Web Vitals', 'Monitoring', 'On-call support'],
  },
];
