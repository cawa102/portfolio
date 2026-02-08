export interface SkillCategory {
  readonly name: string
  readonly skills: readonly string[]
}

export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  { name: 'Languages', skills: ['Python', 'TypeScript', 'JavaScript'] },
  { name: 'Frontend', skills: ['Next.js', 'React', 'Tailwind CSS'] },
  { name: 'Backend', skills: ['Node.js', 'Supabase', 'PostgreSQL'] },
  {
    name: 'AI / LLM',
    skills: ['Claude Code', 'MCP', 'Multi-Agent Orchestration'],
  },
  {
    name: 'Security',
    skills: [
      'Penetration Testing',
      'Vulnerability Detection',
      'Static Analysis',
      'DevSecOps',
    ],
  },
  {
    name: 'DevOps',
    skills: ['Docker', 'Vercel', 'GitHub Actions', 'CI/CD'],
  },
  { name: 'Testing', skills: ['Vitest', 'Playwright', 'pytest'] },
] as const
