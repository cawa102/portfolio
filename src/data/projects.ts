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
    title: 'TomoToken',
    description:
      'Claude Code token usage visualized as a 3D pet that grows from your coding habits',
    techStack: ['TypeScript', 'Three.js', 'Blender', 'Claude Code'],
    status: 'Beta',
    version: 'v0.1.0',
    repoUrl: 'https://github.com/cawa102/tomotoken',
  },
  {
    title: 'qnote',
    description:
      'AI-friendly terminal note app with FTS5 search and bidirectional Markdown links',
    techStack: ['TypeScript', 'Node.js', 'SQLite', 'MCP'],
    status: 'Beta',
    version: 'v0.1.0',
    repoUrl: 'https://github.com/cawa102/qnote',
  },
  {
    title: 'cveSentinel',
    description:
      'AI-powered vulnerability scanner combining NVD and Google OSV with zero false positives',
    techStack: ['Python', 'NVD', 'Google OSV', 'Claude Code'],
    status: 'Beta',
    version: 'v0.2.0',
    repoUrl: 'https://github.com/cawa102/cveSentinel',
  },
  {
    title: 'Research',
    description:
      'Penetration test reports and academic papers on security and industrial AI applications',
    techStack: ['Pentest', 'Academia', 'Security'],
    status: 'Release',
    version: 'v1.0',
    repoUrl: 'https://github.com/cawa102/Research',
  },
] as const
