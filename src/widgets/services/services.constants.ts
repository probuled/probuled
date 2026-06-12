import type { ServiceItem } from './services.types';

export const SERVICES: ServiceItem[] = [
  {
    icon:   'code',
    title:  'Engenharia de produto',
    body:   'Aplicações full-stack tipadas, testadas e prontas para produção, com a stack certa para cada projeto.',
    points: ['Design systems', 'Bibliotecas de componentes', 'API & infra'],
  },
  {
    icon:   'layers',
    title:  'Plataforma & MVP',
    body:   'Do repositório em branco ao produto no ar. Escopo enxuto, entregas semanais e código que é seu.',
    points: ['MVPs em 6 semanas', 'Pipelines CI/CD', 'Deploys em nuvem'],
  },
  {
    icon:   'gauge',
    title:  'Escala & confiabilidade',
    body:   'Auditorias de performance, observabilidade e hardening para seu software crescer sem perder velocidade.',
    points: ['Core Web Vitals', 'Monitoramento', 'Suporte on-call'],
  },
];
