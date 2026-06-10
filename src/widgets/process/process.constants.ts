import type { Step } from './process.types';

export const STEPS: Step[] = [
  { number: '01', title: 'Descoberta',     description: "Mapeamos o problema, definimos o escopo com precisão e alinhamos o que significa 'pronto'." },
  { number: '02', title: 'Design',         description: 'Fluxos e interface no nosso sistema, validados com usuários reais desde cedo.' },
  { number: '03', title: 'Desenvolvimento', description: 'Engenheiros sênior entregam em incrementos semanais que você pode ver e usar.' },
  { number: '04', title: 'Entrega',        description: 'Testado, deployado e documentado, entregue com código que é seu.' },
];
