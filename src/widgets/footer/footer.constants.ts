import type { FooterColumn } from './footer.types';

export const COLS: FooterColumn[] = [
  {
    heading: 'Navegação',
    links: [
      { label: 'Serviços',    href: '#services'  },
      { label: 'Processo',    href: '#process'   },
      { label: 'Portfólio',  href: '#portfolio' },
      { label: 'Tecnologia',  href: '#stack'     },
      { label: 'Comunidade',  href: '#community' },
    ],
  },
  {
    heading: 'Serviços',
    links: [
      { label: 'Engenharia de produto', href: '#services' },
      { label: 'Plataforma & MVP',      href: '#services' },
      { label: 'Escala & confiabilidade', href: '#services' },
    ],
  },
];
