type TextItem = { type: 'text'; label: string };
type LogoItem = { type: 'logo'; src: string; alt: string; height: string; offset?: string };
export type MarqueeItem = TextItem | LogoItem;

export const MARQUEE_ITEMS: MarqueeItem[] = [
  { type: 'logo', src: '/assets/ze-coxinha.png', alt: 'Zé Coxinha', height: 'h-16' },
  { type: 'logo', src: '/assets/isi-tics.png', alt: 'ISI-TICS', height: 'h-36', offset: 'mt-3' },
];
