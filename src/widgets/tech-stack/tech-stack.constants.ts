import type { TechItem } from './tech-stack.types';

export const TECH: TechItem[] = [
  { icon: 'code',          name: 'Frontend',       sub: 'Web, PWA e interfaces ricas' },
  { icon: 'terminal',      name: 'Backend & API',  sub: 'REST, GraphQL e tempo real' },
  { icon: 'smartphone',    name: 'Mobile',         sub: 'iOS, Android e cross-platform' },
  { icon: 'layers',        name: 'Design system',  sub: 'Componentes, tokens e guias' },
  { icon: 'cloud',         name: 'Cloud & Infra',  sub: 'Deploy, CI/CD e observabilidade' },
  { icon: 'cpu',           name: 'Dados',          sub: 'Pipelines, analytics e integrações' },
];
