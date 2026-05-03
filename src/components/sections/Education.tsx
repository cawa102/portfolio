'use client'

import { Briefcase, GraduationCap } from 'lucide-react'
import ScrollAnimation from '@/components/ui/ScrollAnimation'
import SectionOverlay from '@/components/world/SectionOverlay'
import { SECTION_IDS } from '@/lib/constants'

export default function Education() {
  return (
    <SectionOverlay
      id={SECTION_IDS.education}
      sectionIndex={4}
      align="right"
      widthClass="max-w-md sm:mr-12 lg:mr-24"
    >
      <h2 className="mb-8 font-display text-3xl font-bold text-cream-50 md:text-4xl">
        Education
      </h2>
      <div className="flex flex-col gap-5">
        <ScrollAnimation direction="up">
          <div className="text-shadow-none flex items-start gap-4 rounded-2xl border border-cream-200 bg-cream-50 p-5 shadow-soft">
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
          <div className="text-shadow-none flex items-start gap-4 rounded-2xl border border-cream-200 bg-cream-50 p-5 shadow-soft">
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
      <h2 className="mb-8 mt-12 font-display text-3xl font-bold text-cream-50 md:text-4xl">
        Experience
      </h2>
      <div className="flex flex-col gap-5">
        <ScrollAnimation direction="up">
          <div className="text-shadow-none flex items-start gap-4 rounded-2xl border border-cream-200 bg-cream-50 p-5 shadow-soft">
            <Briefcase className="h-7 w-7 flex-shrink-0 text-golden" />
            <div className="text-left">
              <p className="font-display text-base font-semibold text-warm-text">
                Operational Technology System Engineer
              </p>
              <p className="text-sm text-warm-text-light">
                Kanazawa Murata Manufacturing (2-month Internship)
              </p>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </SectionOverlay>
  )
}
