export const SITE_CONFIG = {
  name: 'cawa1',
  fullName: 'Kyosuke Kawai',
  title: 'cawa1 | AI Agent Developer & Security Engineer',
  description:
    'Portfolio of Kyosuke Kawai — building production-grade AI-driven applications with security at the core.',
  url: 'https://cawa1.dev',
} as const

export const SECTION_IDS = {
  hero: 'hero',
  about: 'about',
  projects: 'projects',
  skills: 'skills',
  education: 'education',
  blog: 'blog',
  contact: 'contact',
} as const

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
] as const

export const TYPING_CONFIG = {
  phrases: ['AI Agent Developer', 'Security Engineer', 'Full-Stack Developer'],
  typingSpeed: 100,
  deletingSpeed: 50,
  pauseAfterTyping: 2000,
  pauseAfterDeleting: 500,
} as const

export const ANIMATION_DEFAULTS = {
  duration: 0.6,
  ease: 'easeOut' as const,
  viewport: { once: true, amount: 0.2 },
  staggerChildren: 0.15,
} as const
