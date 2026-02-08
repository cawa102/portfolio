export interface ContactLink {
  readonly name: string
  readonly url: string
  readonly icon: string
}

export const CONTACT_LINKS: readonly ContactLink[] = [
  { name: 'GitHub', url: 'https://github.com/cawa102', icon: 'Github' },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/kyosuke-kawai-68919b389',
    icon: 'Linkedin',
  },
  { name: 'Medium', url: 'https://medium.com/@ccawa102', icon: 'BookOpen' },
  { name: 'Email', url: 'mailto:kkawai01@qub.ac.uk', icon: 'Mail' },
] as const
