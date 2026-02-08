export interface Project {
  readonly title: string
  readonly description: string
  readonly techStack: readonly string[]
  readonly status: 'Release' | 'Beta'
  readonly version: string
  readonly repoUrl: string
}

export const PROJECTS: readonly Project[] = [
  {
    title: 'VibeHackAI',
    description:
      'Human-led AI penetration testing framework with 5 coordinated agents and MCP integration',
    techStack: ['Python', 'Claude Code', 'Docker', 'MCP'],
    status: 'Beta',
    version: 'v2.0',
    repoUrl: 'https://github.com/cawa102/VibeHackAI',
  },
  {
    title: 'cveSentinel',
    description:
      'AI-powered vulnerability detection combining NVD and Google OSV with zero false positives',
    techStack: ['Python', 'NVD API', 'Google OSV', 'PyPI'],
    status: 'Beta',
    version: 'v0.2.0',
    repoUrl: 'https://github.com/cawa102/cveSentinel',
  },
  {
    title: 'PluginArena',
    description:
      'Community-driven Claude Code extension ranking platform with ELO-based pairwise voting',
    techStack: ['Next.js', 'React', 'Supabase', 'Tailwind CSS'],
    status: 'Beta',
    version: 'v0.1.0',
    repoUrl: 'https://github.com/cawa102/PluginArena',
  },
  {
    title: 'SkillsGate',
    description:
      '6-layer defense-in-depth security scanner for Claude Code extensions with policy enforcement',
    techStack: ['TypeScript', 'Node.js', 'Vitest', 'Zod'],
    status: 'Release',
    version: 'v1.0.0',
    repoUrl: 'https://github.com/cawa102/SkillsGate',
  },
] as const
