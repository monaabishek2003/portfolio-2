export interface Meta {
  name: string;
  shortName: string;
  role: string;
  location: string;
  title: string;
  description: string;
}

export interface Hero {
  kicker: string;
  headline: string[];
  intro: string;
  scrollHint: string;
  konamiHint: string;
}

export interface Closing {
  lines: string[];
}

export interface Story {
  label: string;
  heading: string;
  paragraphs: string[];
}

export interface Principle {
  n: string;
  title: string;
  body: string;
}

export interface Principles {
  label: string;
  heading: string;
  items: Principle[];
}

export interface Role {
  company: string;
  companyNote: string;
  role: string;
  period: string;
  summary: string;
  stack: string[];
  highlights: string[];
}

export interface Work {
  label: string;
  heading: string;
  roles: Role[];
}

export interface ProjectLinks {
  live: string;
  repo: string;
}

export interface Project {
  name: string;
  hero: boolean;
  year: string;
  status: string;
  tagline: string;
  description: string;
  stack: string[];
  links: ProjectLinks;
}

export interface Projects {
  label: string;
  heading: string;
  items: Project[];
}

export interface OffTheClockItem {
  tag: string;
  body: string;
}

export interface OffTheClock {
  label: string;
  heading: string;
  items: OffTheClockItem[];
}

export interface NowItem {
  k: string;
  v: string;
}

export interface Now {
  label: string;
  heading: string;
  updated: string;
  items: NowItem[];
}

export interface Social {
  label: string;
  url: string;
}

export interface Contact {
  label: string;
  heading: string;
  blurb: string;
  email: string;
  socials: Social[];
}

export interface Colophon {
  lines: string[];
}

export interface EasterEgg {
  pledge: string;
  pledgeText: string;
  turn: string;
  turnText: string;
  prestige: string;
  prestigeText: string;
  footnote: string;
}

export interface WhisperKeyword {
  word: string;
  text: string;
}

export interface Whispers {
  hint: string;
  keywords: WhisperKeyword[];
}

export interface TabTitle {
  away: string;
}

export interface Content {
  meta: Meta;
  hero: Hero;
  closing: Closing;
  story: Story;
  principles: Principles;
  work: Work;
  projects: Projects;
  offTheClock: OffTheClock;
  now: Now;
  contact: Contact;
  colophon: Colophon;
  easterEgg: EasterEgg;
  whispers: Whispers;
  tabTitle: TabTitle;
}
