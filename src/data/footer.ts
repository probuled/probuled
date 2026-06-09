export interface FooterColumn {
  heading: string;
  links:   string[];
}

export const COLS: FooterColumn[] = [
  { heading: 'Company',   links: ['About', 'Work', 'Careers', 'Contact'] },
  { heading: 'Services',  links: ['Product engineering', 'MVP sprints', 'Scale & SRE'] },
  { heading: 'Resources', links: ['Blog', 'Case studies', 'Open source'] },
];
