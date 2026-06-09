export interface StatItem {
  to:        number;
  suffix:    string;
  label:     string;
  decimals?: number;
}

export const STATS: StatItem[] = [
  { to: 120,  suffix: '+',  label: 'Products shipped' },
  { to: 6,    suffix: 'wk', label: 'Average MVP timeline' },
  { to: 99.9, suffix: '%',  label: 'Uptime across fleet', decimals: 1 },
  { to: 38,   suffix: '',   label: 'Engineers & designers' },
];
