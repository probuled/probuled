import type { Step } from './process.types';

export const STEPS: Step[] = [
  { number: '01', title: 'Discover', description: "We map the problem, scope tightly and agree on what 'done' looks like." },
  { number: '02', title: 'Design',   description: 'Flows and UI in our system, validated against real users early.' },
  { number: '03', title: 'Build',    description: 'Senior engineers ship in weekly increments you can see and use.' },
  { number: '04', title: 'Deliver',  description: 'Tested, deployed and documented — handed over with code you own.' },
];
