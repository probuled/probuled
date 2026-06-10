import type { StatData } from './stats.types';

export const STATS: StatData[] = [
  { to: 120,  suffix: '+',  label: 'Products shipped' },
  { to: 6,    suffix: 'wk', label: 'Average MVP timeline' },
  { to: 99.9, suffix: '%',  label: 'Uptime across fleet', decimals: 1 },
  { to: 38,   suffix: '',   label: 'Engineers & designers' },
];
