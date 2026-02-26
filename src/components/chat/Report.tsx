'use client'

import { useState, useEffect } from 'react'

import { motion } from 'framer-motion'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  AreaChart,
  Area,
  PieChart,
  Pie,
} from 'recharts'

import { Button } from '@/components/ui/button'
import { REPORT_SECTIONS } from '@/lib/constants'
import type { ReportSection, ReportMetric } from '@/lib/types'

interface ReportProps {
  isUnlocked: boolean
}

/* === Chart Data === */
const RADAR_DATA = [
  { dimension: 'Retention', score: 72, fullMark: 100 },
  { dimension: 'Positioning', score: 45, fullMark: 100 },
  { dimension: 'Distribution', score: 28, fullMark: 100 },
  { dimension: 'Monetization', score: 58, fullMark: 100 },
  { dimension: 'Market Fit', score: 63, fullMark: 100 },
  { dimension: 'Moat', score: 41, fullMark: 100 },
]

const BAR_DATA = [
  { name: 'PMF Score', value: 47, color: '#F59E0B' },
  { name: 'Retention', value: 72, color: '#10B981' },
  { name: 'Positioning', value: 45, color: '#F59E0B' },
  { name: 'Distribution', value: 28, color: '#EF4444' },
  { name: 'Monetization', value: 58, color: '#10B981' },
  { name: 'Moat', value: 41, color: '#F59E0B' },
]

const GROWTH_DATA = [
  { month: 'Now', current: 47, projected: 47 },
  { month: 'Wk 2', current: 47, projected: 52 },
  { month: 'Wk 4', current: 47, projected: 58 },
  { month: 'Wk 6', current: 47, projected: 64 },
  { month: 'Wk 8', current: 47, projected: 71 },
  { month: 'Wk 12', current: 47, projected: 78 },
]

const FUNNEL_DATA = [
  { stage: 'Awareness', value: 100, color: '#3B82F6' },
  { stage: 'Activation', value: 72, color: '#8B5CF6' },
  { stage: 'Retention', value: 48, color: '#F59E0B' },
  { stage: 'Revenue', value: 31, color: '#10B981' },
  { stage: 'Referral', value: 18, color: '#EC4899' },
]

const GAUGE_DATA = [
  { name: 'score', value: 47 },
  { name: 'remaining', value: 53 },
]

const DIMENSION_SCORES = [
  { label: 'Retention', score: 72, color: '#10B981' },
  { label: 'Positioning', score: 45, color: '#F59E0B' },
  { label: 'Distribution', score: 28, color: '#EF4444' },
  { label: 'Monetization', score: 58, color: '#10B981' },
  { label: 'Market Fit', score: 63, color: '#10B981' },
  { label: 'Moat', score: 41, color: '#F59E0B' },
]

/* === Severity Styles === */
const SEVERITY: Record<string, { bg: string; border: string; accent: string; badge: string }> = {
  critical: { bg: '#FEF2F2', border: '#FED7D7', accent: '#EF4444', badge: 'bg-red-50 text-red-700 border-red-100' },
  warning: {
    bg: '#FFFBEB',
    border: '#FDE68A',
    accent: '#F59E0B',
    badge: 'bg-amber-50 text-amber-700 border-amber-100',
  },
  positive: {
    bg: '#ECFDF5',
    border: '#A7F3D0',
    accent: '#10B981',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  },
  neutral: {
    bg: '#F8FAFC',
    border: '#E2E8F0',
    accent: '#64748B',
    badge: 'bg-slate-50 text-slate-600 border-slate-200',
  },
}

const TREND: Record<string, { icon: string; color: string }> = {
  up: { icon: '↑', color: '#10B981' },
  down: { icon: '↓', color: '#EF4444' },
  neutral: { icon: '→', color: '#64748B' },
}

const SEVERITY_LABEL: Record<string, string> = {
  critical: 'Critical',
  warning: 'Attention',
  positive: 'Strong',
  neutral: 'Neutral',
}

const ease = [0.25, 1, 0.5, 1] as const

/* === Animated Counter === */
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let frame: number
    const start = Date.now()
    const duration = 1200

    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target])

  return <>{count}{suffix}</>
}

/* === Sub-components === */
function MetricChip({ metric }: { metric: ReportMetric }) {
  const t = TREND[metric.trend]
  return (
    <div className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-lg bg-white border border-border/50 shadow-sm">
      <span className="text-muted-foreground">{metric.label}</span>
      <span className="font-semibold text-foreground">{metric.value}</span>
      <span className="font-bold" style={{ color: t.color }}>
        {t.icon}
      </span>
    </div>
  )
}

function SeverityBadge({ severity }: { severity: ReportSection['severity'] }) {
  const s = SEVERITY[severity]
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md border ${s.badge}`}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.accent }} />
      {SEVERITY_LABEL[severity]}
    </span>
  )
}

function ReportCard({ section, index, isBlurred }: { section: ReportSection; index: number; isBlurred: boolean }) {
  const s = SEVERITY[section.severity]
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease }}
      className="rounded-2xl p-5 transition-all duration-200 border"
      style={{
        background: s.bg,
        borderColor: s.border,
        filter: isBlurred ? 'blur(5px)' : 'none',
        userSelect: isBlurred ? 'none' : 'auto',
        pointerEvents: isBlurred ? 'none' : 'auto',
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-start gap-3">
          <span className="text-lg">{section.icon}</span>
          <div>
            <h3 className="text-[14px] font-semibold text-foreground mb-0.5">{section.title}</h3>
            <p className="text-[12.5px] text-muted-foreground leading-relaxed">{section.content}</p>
          </div>
        </div>
        <SeverityBadge severity={section.severity} />
      </div>
      {section.metrics && (
        <div className="flex flex-wrap gap-1.5 mt-3 ml-8">
          {section.metrics.map(m => (
            <MetricChip key={m.label} metric={m} />
          ))}
        </div>
      )}
    </motion.div>
  )
}

/* === Custom Tooltip === */
function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; name?: string }[]; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-border rounded-lg shadow-lg px-3 py-2 text-[12px]">
      <p className="font-semibold text-foreground">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-muted-foreground">
          {p.name === 'projected' ? 'Projected' : 'Current'}: <span className="font-semibold text-foreground">{p.value}</span>
        </p>
      ))}
    </div>
  )
}

function ScoreTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-border rounded-lg shadow-lg px-3 py-2 text-[12px]">
      <p className="font-semibold text-foreground">{label}</p>
      <p className="text-muted-foreground">
        Score: <span className="font-semibold text-foreground">{payload[0].value}/100</span>
      </p>
    </div>
  )
}

/* === Main Report === */
export function Report({ isUnlocked }: ReportProps) {
  const [emailSent, setEmailSent] = useState(false)
  const scorePct = 47
  const scoreColor = '#F59E0B'

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="py-4">
      <div className="max-w-2xl mx-auto">
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
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                variant={emailSent ? 'secondary' : 'outline'}
                className="rounded-xl text-[13px] font-medium cursor-pointer gap-2 h-10"
                style={{ minHeight: '44px' }}
                aria-label="Send report to email"
                onClick={() => setEmailSent(true)}
                disabled={emailSent}
              >
                {emailSent ? (
                  <>✅ Report Sent</>
                ) : (
                  <>📧 Send to Email</>
                )}
              </Button>
            </motion.div>
          )}
        </div>

        {/* === Gauge Score Hero === */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="card-elevated p-6 mb-5"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Semi-circular gauge */}
            <div className="relative" style={{ width: 160, height: 100 }}>
              <svg width={160} height={100} viewBox="0 0 160 100">
                {/* Background arc */}
                <path
                  d="M 15 90 A 65 65 0 0 1 145 90"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth={10}
                  strokeLinecap="round"
                />
                {/* Score arc */}
                <motion.path
                  d="M 15 90 A 65 65 0 0 1 145 90"
                  fill="none"
                  stroke={scoreColor}
                  strokeWidth={10}
                  strokeLinecap="round"
                  strokeDasharray="204"
                  initial={{ strokeDashoffset: 204 }}
                  animate={{ strokeDashoffset: 204 * (1 - scorePct / 100) }}
                  transition={{ delay: 0.3, duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
                />
              </svg>
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-center">
                <span className="text-[28px] font-bold text-foreground tabular-nums leading-none">
                  <AnimatedCounter target={scorePct} />
                </span>
                <span className="text-[10px] text-muted-foreground font-medium block">/100</span>
              </div>
            </div>

            {/* Score description */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-[18px] font-semibold text-foreground mb-1">PMF Score: Emerging</h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed mb-3">
                Your product shows early PMF signals but needs critical improvements in distribution and positioning.
              </p>

              {/* Score heatmap */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {DIMENSION_SCORES.map(d => (
                  <div
                    key={d.label}
                    className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-md"
                    style={{ background: `${d.color}10`, border: `1px solid ${d.color}25` }}
                  >
                    <span
                      className="w-2 h-2 rounded-sm"
                      style={{ background: d.color }}
                    />
                    <span className="text-muted-foreground">{d.label}</span>
                    <span className="font-bold" style={{ color: d.color }}>{d.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* === Charts Grid === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="card-elevated p-4"
          >
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Dimension Scores
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={RADAR_DATA} cx="50%" cy="50%" outerRadius="75%">
                <PolarGrid stroke="#E2E8F0" strokeWidth={0.5} />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: '#64748B', fontSize: 10 }} tickLine={false} />
                <Radar
                  dataKey="score"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.15}
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#10B981' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="card-elevated p-4"
          >
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Score Breakdown
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={BAR_DATA} layout="vertical" margin={{ left: 0, right: 12, top: 0, bottom: 0 }}>
                <CartesianGrid horizontal={false} stroke="#E2E8F0" strokeWidth={0.5} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: '#94A3B8' }} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 10, fill: '#64748B' }}
                  tickLine={false}
                  axisLine={false}
                  width={80}
                />
                <Tooltip content={<ScoreTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={14}>
                  {BAR_DATA.map(entry => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Growth Trajectory Area Chart */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="card-elevated p-4"
          >
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Growth Trajectory
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={GROWTH_DATA} margin={{ left: -10, right: 10, top: 5, bottom: 0 }}>
                <defs>
                  <linearGradient id="projectedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="currentGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#94A3B8" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" strokeWidth={0.5} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94A3B8' }} tickLine={false} axisLine={false} />
                <YAxis domain={[30, 90]} tick={{ fontSize: 10, fill: '#94A3B8' }} tickLine={false} axisLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="current" stroke="#94A3B8" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#currentGrad)" name="current" />
                <Area type="monotone" dataKey="projected" stroke="#10B981" strokeWidth={2} fill="url(#projectedGrad)" name="projected" />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-[10px] text-muted-foreground text-center mt-1">
              <span className="inline-block w-3 h-0.5 bg-emerald-500 mr-1 align-middle rounded-full" /> Projected with Sprint 0
              <span className="inline-block w-3 h-0.5 bg-slate-400 ml-3 mr-1 align-middle rounded-full border-dashed" /> Current trajectory
            </p>
          </motion.div>

          {/* Funnel Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="card-elevated p-4"
          >
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              AARRR Funnel
            </p>
            <div className="space-y-2 py-2">
              {FUNNEL_DATA.map((stage, i) => (
                <div key={stage.stage} className="flex items-center gap-3">
                  <span className="text-[10px] text-muted-foreground w-16 text-right shrink-0">
                    {stage.stage}
                  </span>
                  <div className="flex-1 h-6 bg-slate-50 rounded-md overflow-hidden relative">
                    <motion.div
                      className="h-full rounded-md flex items-center justify-end pr-2"
                      style={{ background: stage.color }}
                      initial={{ width: '0%' }}
                      animate={{ width: `${stage.value}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                    >
                      <span className="text-[10px] font-bold text-white">{stage.value}%</span>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* === Report Sections === */}
        <div className="flex flex-col gap-3 relative">
          {REPORT_SECTIONS.map((section, i) => (
            <ReportCard key={section.id} section={section} index={i} isBlurred={!isUnlocked && i > 1} />
          ))}
          {!isUnlocked && (
            <div
              className="absolute bottom-0 left-0 right-0 h-[55%] pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, transparent, var(--background))' }}
            />
          )}
        </div>

        {/* === Sprint 0 CTA === */}
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
