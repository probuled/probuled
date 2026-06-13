type TextItem = { type: 'text'; label: string };
type LogoItem = { type: 'logo'; src: string; alt: string; height: string; offset?: string };
export type MarqueeItem = TextItem | LogoItem;

export const MARQUEE_ITEMS: MarqueeItem[] = [
  { type: 'logo', src: '/assets/ze-coxinha.webp', alt: 'Zé Coxinha', height: 'h-16' },
  { type: 'logo', src: '/assets/isi-tics.webp', alt: 'ISI-TICS', height: 'h-36', offset: 'mt-3' },
  { type: 'logo', src: '/assets/torres-barros.webp', alt: 'Torres & Barros', height: 'h-28' },
  { type: 'logo', src: '/assets/neosense.webp', alt: 'Neosense', height: 'h-24' },
  { type: 'logo', src: '/assets/fuctura.webp', alt: 'Fuctura', height: 'h-28' },
  { type: 'logo', src: '/assets/pedra-do-mar.webp', alt: 'Pedra do Mar', height: 'h-28' },
];
