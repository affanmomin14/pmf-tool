'use client'

import { useState, useEffect, useCallback } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import { Progress } from '@/components/ui/progress'
import { LOADING_LABELS, PMF_FACTS } from '@/lib/constants'

interface AnalysisLoaderProps {
  onComplete: () => void
}

const TOTAL_DURATION = 8000
const FACT_INTERVAL = 4000

export function AnalysisLoader({ onComplete }: AnalysisLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [labelIndex, setLabelIndex] = useState(0)
  const [factIndex, setFactIndex] = useState(0)

  const handleComplete = useCallback(() => {
    onComplete()
  }, [onComplete])

  useEffect(() => {
    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const p = Math.min((elapsed / TOTAL_DURATION) * 100, 100)
      setProgress(p)
      if (p >= 100) {
        clearInterval(interval)
        setTimeout(handleComplete, 400)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [handleComplete])

  useEffect(() => {
    const interval = setInterval(() => {
      setLabelIndex(prev => (prev + 1) % LOADING_LABELS.length)
    }, TOTAL_DURATION / LOADING_LABELS.length)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex(prev => (prev + 1) % PMF_FACTS.length)
    }, FACT_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
      className="px-5 py-4"
    >
      <div className="ml-[42px] max-w-lg">
        {/* Progress card */}
        <div className="card-elevated p-6 mb-3">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #0F172A, #334155)' }}
            >
              <svg className="w-4 h-4 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-foreground">Analyzing your responses</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={labelIndex}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-[12px] text-muted-foreground"
                >
                  {LOADING_LABELS[labelIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <Progress value={progress} className="h-1.5" />
          <p className="text-[11px] text-muted-foreground text-right mt-2 tabular-nums">{Math.round(progress)}%</p>
        </div>

        {/* Fact carousel */}
        <div className="card-elevated p-5 min-h-[96px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={factIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
            >
              <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mb-2">
                Did you know?
              </span>
              <p className="text-[14px] font-semibold text-foreground leading-snug">{PMF_FACTS[factIndex].title}</p>
              <p className="text-[12px] text-muted-foreground mt-1 leading-relaxed">
                {PMF_FACTS[factIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
