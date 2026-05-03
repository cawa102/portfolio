'use client'

import { GraduationCap } from 'lucide-react'
import ScrollAnimation from '@/components/ui/ScrollAnimation'
import SectionOverlay from '@/components/world/SectionOverlay'
import { SECTION_IDS } from '@/lib/constants'

export default function Education() {
  return (
    <SectionOverlay id={SECTION_IDS.education} sectionIndex={4} align="right">
      <h2 className="mb-8 font-display text-3xl font-bold text-warm-text md:text-4xl">
        Education
      </h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <ScrollAnimation direction="up">
          <div className="flex items-start gap-4 rounded-2xl border border-cream-200 bg-cream-50 p-5 shadow-soft">
            <GraduationCap className="h-7 w-7 flex-shrink-0 text-golden" />
            <div className="text-left">
              <p className="font-display text-base font-semibold text-warm-text">
                Master&apos;s in CyberSecurity
              </p>
              <p className="text-sm text-warm-text-light">
                Queen&apos;s University Belfast
              </p>
              <p className="mt-1 text-xs text-warm-text-light/80">2025 - Present</p>
            </div>
          </div>
        </ScrollAnimation>
        <ScrollAnimation direction="up" delay={0.15}>
          <div className="flex items-start gap-4 rounded-2xl border border-cream-200 bg-cream-50 p-5 shadow-soft">
            <GraduationCap className="h-7 w-7 flex-shrink-0 text-golden" />
            <div className="text-left">
              <p className="font-display text-base font-semibold text-warm-text">
                Bachelor&apos;s of Engineering in Electronics and Mechanical Engineering
              </p>
              <p className="text-sm text-warm-text-light">
                National Institute of Technology, Ishikawa College (Japan)
              </p>
              <p className="mt-1 text-xs text-warm-text-light/80">2018 - 2023</p>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </SectionOverlay>
  )
}
