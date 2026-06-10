import type { StatData } from './stats.types';

export const STATS: StatData[] = [
  { to: 120,  suffix: '+',  label: 'Produtos entregues' },
  { to: 6,    suffix: 'sem', label: 'Tempo médio de MVP' },
  { to: 99.9, suffix: '%',  label: 'Uptime da frota', decimals: 1 },
  { to: 38,   suffix: '',   label: 'Engenheiros e designers' },
];
