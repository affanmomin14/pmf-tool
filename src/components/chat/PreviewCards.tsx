'use client'

import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { PREVIEW_SIGNALS } from '@/lib/constants'

interface PreviewCardsProps {
  onContinue: () => void
}

const SEVERITY_MAP = {
  risk: { bg: '#FEF2F2', border: '#FECACA', dot: '#EF4444', label: 'bg-red-50 text-red-700' },
  signal: { bg: '#FFFBEB', border: '#FDE68A', dot: '#F59E0B', label: 'bg-amber-50 text-amber-700' },
  strength: { bg: '#ECFDF5', border: '#A7F3D0', dot: '#10B981', label: 'bg-emerald-50 text-emerald-700' },
}

export function PreviewCards({ onContinue }: PreviewCardsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="px-5 py-2"
    >
      <div className="ml-[42px] max-w-lg flex flex-col gap-3">
        {PREVIEW_SIGNALS.map((signal, i) => {
          const s = SEVERITY_MAP[signal.type]
          return (
            <motion.div
              key={signal.title}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
              className="rounded-2xl p-4"
              style={{ background: s.bg, border: `1px solid ${s.border}` }}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl shrink-0 mt-0.5">{signal.emoji}</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-[6px] h-[6px] rounded-full" style={{ background: s.dot }} />
                    <p className="text-[13px] font-semibold text-foreground">{signal.title}</p>
                  </div>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{signal.description}</p>
                </div>
              </div>
            </motion.div>
          )
        })}

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="mt-1"
        >
          <Button
            onClick={onContinue}
            className="rounded-xl text-[13px] font-medium cursor-pointer gap-2 text-white h-11"
            style={{
              background: 'linear-gradient(135deg, #0F172A, #1E293B)',
              minHeight: '44px',
            }}
            aria-label="Unlock full report"
          >
            Unlock Full Report
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
