'use client'

import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { MagicCard } from '@/components/ui/magicui/magic-card'
import { REPORT_SECTIONS } from '@/lib/constants'
import type { ReportSection, ReportMetric } from '@/lib/types'

interface ReportProps {
  isUnlocked: boolean
}

const SEVERITY = {
  critical: { bg: '#FEF2F2', border: '#FECACA', accent: '#EF4444', gradient: 'rgba(239,68,68,0.06)' },
  warning: { bg: '#FFFBEB', border: '#FDE68A', accent: '#F59E0B', gradient: 'rgba(245,158,11,0.06)' },
  positive: { bg: '#ECFDF5', border: '#A7F3D0', accent: '#10B981', gradient: 'rgba(16,185,129,0.06)' },
  neutral: { bg: '#F8FAFC', border: '#E2E8F0', accent: '#94A3B8', gradient: 'rgba(148,163,184,0.04)' },
}

const TREND = { up: { icon: '↑', color: '#10B981' }, down: { icon: '↓', color: '#EF4444' }, neutral: { icon: '→', color: '#94A3B8' } }

function MetricPill({ metric }: { metric: ReportMetric }) {
  const t = TREND[metric.trend]
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-secondary">
      <span className="text-muted-foreground">{metric.label}</span>
      <span className="font-semibold text-foreground">{metric.value}</span>
      <span className="font-bold" style={{ color: t.color }}>{t.icon}</span>
    </span>
  )
}

function ReportCard({ section, index, isBlurred }: { section: ReportSection; index: number; isBlurred: boolean }) {
  const s = SEVERITY[section.severity]
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
    >
      <MagicCard
        className="rounded-2xl p-5 transition-all duration-200"
        gradientColor={s.gradient}
        style={{
          background: s.bg,
          border: `1px solid ${s.border}`,
          filter: isBlurred ? 'blur(5px)' : 'none',
          userSelect: isBlurred ? 'none' : 'auto',
          pointerEvents: isBlurred ? 'none' : 'auto',
        }}
      >
        <div className="flex items-start gap-3 mb-2">
          <span className="text-lg">{section.icon}</span>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-[14px] font-semibold text-foreground">{section.title}</h3>
              <div className="w-[6px] h-[6px] rounded-full" style={{ background: s.accent }} />
            </div>
            <p className="text-[12px] text-muted-foreground leading-relaxed">{section.content}</p>
          </div>
        </div>
        {section.metrics && (
          <div className="flex flex-wrap gap-1.5 mt-3 ml-8">
            {section.metrics.map(m => <MetricPill key={m.label} metric={m} />)}
          </div>
        )}
      </MagicCard>
    </motion.div>
  )
}

export function Report({ isUnlocked }: ReportProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="px-5 py-4">
      <div className="ml-[42px] max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[22px] text-foreground tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Your PMF Insights Report
            </h2>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Generated {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          {isUnlocked && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
              <Button
                variant="outline"
                className="rounded-xl text-[13px] font-medium cursor-pointer gap-2 h-10"
                style={{ minHeight: '44px' }}
                aria-label="Download PDF report"
              >
                📄 Download PDF
              </Button>
            </motion.div>
          )}
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-3 relative">
          {REPORT_SECTIONS.map((section, i) => (
            <ReportCard key={section.id} section={section} index={i} isBlurred={!isUnlocked && i > 1} />
          ))}
          {!isUnlocked && (
            <div className="absolute bottom-0 left-0 right-0 h-[55%] pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #FAFBFC)' }} />
          )}
        </div>

        {/* Sprint 0 CTA */}
        {isUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-8 card-elevated p-8 text-center"
          >
            <h3 className="text-[20px] text-foreground mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Ready to act on these insights?
            </h3>
            <p className="text-[13px] text-muted-foreground mb-6 max-w-md mx-auto">
              Book a Sprint 0 session to turn this diagnostic into a 4-week execution plan.
            </p>
            <a
              href="https://cal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-[15px] font-semibold text-white transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_12px_32px_-6px_rgba(15,23,42,0.3)]"
              style={{
                background: 'linear-gradient(135deg, #0F172A, #1E293B)',
                boxShadow: '0 6px 20px -4px rgba(15, 23, 42, 0.25)',
                minHeight: '52px',
              }}
              aria-label="Book Sprint 0 session"
            >
              🚀 Book Your Sprint 0
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
