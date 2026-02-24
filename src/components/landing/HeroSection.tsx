'use client'

import { useRef } from 'react'

import { motion, useInView } from 'framer-motion'

import { TextGenerateEffect } from '@/components/ui/aceternity/text-generate-effect'
import { BackgroundBeams } from '@/components/ui/aceternity/background-beams'
import { ShimmerButton } from '@/components/ui/magicui/shimmer-button'
import { NumberTicker } from '@/components/ui/magicui/number-ticker'
import { MagicCard } from '@/components/ui/magicui/magic-card'

interface HeroSectionProps {
  onStartAssessment: () => void
  analysisCount: number
}

const ease = [0.25, 1, 0.5, 1] as const

export function HeroSection({ onStartAssessment, analysisCount }: HeroSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section
      ref={ref}
      className="relative min-h-[100vh] flex flex-col items-center justify-center px-6 pt-28 pb-20 overflow-hidden"
    >
      {/* Aceternity: Background Beams */}
      <BackgroundBeams />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Overline badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="mb-7"
        >
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-[13px] font-medium text-muted-foreground"
            style={{
              background: 'rgba(241, 245, 249, 0.8)',
              border: '1px solid rgba(226, 232, 240, 0.8)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span className="relative flex h-[6px] w-[6px]">
              <span
                className="absolute inset-0 rounded-full bg-emerald-500"
                style={{ animation: 'pulse-ring 2s cubic-bezier(0,0,0.2,1) infinite' }}
              />
              <span className="relative rounded-full h-[6px] w-[6px] bg-emerald-500" />
            </span>
            <span>
              <NumberTicker value={analysisCount} className="font-semibold text-foreground" />+ diagnostics completed
            </span>
          </div>
        </motion.div>

        {/* Headline — Aceternity: TextGenerateEffect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="mb-5"
        >
          <TextGenerateEffect
            words="Validate your path to Product-Market Fit in 3 minutes"
            className="text-[2.75rem] sm:text-[3.5rem] md:text-[4rem] text-foreground"
            highlightWords={['Product-Market', 'Fit']}
            duration={0.5}
          />
        </motion.div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7, ease }}
          className="text-[17px] md:text-lg leading-relaxed text-muted-foreground max-w-xl mx-auto mb-10"
        >
          A free, AI-driven diagnostic for post-MVP founders. Identify traction gaps, market risks, and your next move.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.9, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          {/* Magic UI: ShimmerButton */}
          <ShimmerButton onClick={onStartAssessment} aria-label="Start free assessment">
            Start Free Assessment
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </ShimmerButton>

          <span className="text-[13px] text-muted-foreground">No signup required &middot; 3 min</span>
        </motion.div>

        {/* Social proof row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.1, ease }}
          className="flex flex-col items-center gap-6"
        >
          {/* Testimonial cards */}
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
            {[
              {
                name: 'Sarah K.',
                role: 'CEO, DataStack',
                quote: 'Identified our retention gap in 3 minutes. Changed our roadmap.',
              },
              {
                name: 'Marcus L.',
                role: 'Founder, Brevity',
                quote: 'The PMF score convinced our investors we had the right strategy.',
              },
              {
                name: 'Priya R.',
                role: 'CTO, Flowbase',
                quote: 'Best free diagnostic for early-stage. Actionable, not theoretical.',
              },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.3 + i * 0.08, duration: 0.5, ease }}
              >
                <MagicCard
                  className="card-elevated px-5 py-4 max-w-[240px] text-left"
                  gradientColor="rgba(16, 185, 129, 0.08)"
                >
                  <p className="text-[13px] leading-snug text-muted-foreground mb-3">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #0F172A, #334155)' }}
                    >
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-foreground leading-tight">{t.name}</p>
                      <p className="text-[11px] text-muted-foreground leading-tight">{t.role}</p>
                    </div>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </div>

          {/* Trust line */}
          <div className="flex items-center gap-6 text-[12px] text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Free forever</span>
            </div>
            <div className="w-px h-3 bg-border" />
            <div className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              <span>No signup wall</span>
            </div>
            <div className="w-px h-3 bg-border" />
            <span>
              Built by <span className="font-medium text-foreground">Wednesday Solutions</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
