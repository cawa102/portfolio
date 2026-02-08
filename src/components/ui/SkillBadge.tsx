interface SkillBadgeProps {
  readonly name: string
}

export default function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <span className="rounded-lg border border-bg-tertiary bg-bg-secondary px-3 py-1.5 text-sm text-text-primary transition-colors hover:border-accent-cyan/50">
      {name}
    </span>
  )
}
