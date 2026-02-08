'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { Project } from '@/data/projects'

interface ProjectCardProps {
  readonly project: Project
}

const statusStyles = {
  Release: 'bg-accent-green/20 text-accent-green',
  Beta: 'bg-accent-amber/20 text-accent-amber',
} as const

export default function ProjectCard({ project }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.a
      href={project.repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl border border-bg-tertiary bg-bg-secondary p-6 transition-all duration-300 hover:border-accent-cyan/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-xl font-semibold text-text-primary">
          {project.title}
        </h3>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[project.status]}`}
        >
          {project.version} {project.status}
        </span>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-text-secondary">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-bg-tertiary px-2 py-1 text-xs text-text-muted"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.a>
  )
}
