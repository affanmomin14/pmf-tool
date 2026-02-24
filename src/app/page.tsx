'use client'

import { useState, useCallback } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import { ShimmerButton } from '@/components/ui/magicui/shimmer-button'
import { MagicCard } from '@/components/ui/magicui/magic-card'
import { HeroSection } from '@/components/landing/HeroSection'
import { ChatInterface } from '@/components/chat/ChatInterface'

const MOCK_ANALYSIS_COUNT = 12847

const ease = [0.25, 1, 0.5, 1] as const

export default function Home() {
  const [showChat, setShowChat] = useState(false)

  const handleStartAssessment = useCallback(() => {
    setShowChat(true)
    setTimeout(() => {
      document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }, [])

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between glass-light">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #0F172A, #334155)' }}
          >
            <span className="text-white font-bold text-[13px]">P</span>
          </div>
          <span className="text-[15px] font-semibold text-foreground tracking-tight">PMF Insights</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#how-it-works"
            className="text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            How it Works
          </a>
          <a
            href="#testimonials"
            className="text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Testimonials
          </a>
          <button
            onClick={handleStartAssessment}
            className="text-[13px] font-medium text-foreground px-4 py-2 rounded-full transition-all duration-200 hover:bg-secondary cursor-pointer"
            style={{ border: '1px solid var(--border)', minHeight: '44px' }}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Landing Page */}
      <AnimatePresence>
        {!showChat && (
          <motion.div exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}>
            <HeroSection onStartAssessment={handleStartAssessment} analysisCount={MOCK_ANALYSIS_COUNT} />

            {/* === How It Works === */}
            <section id="how-it-works" className="py-24 px-6">
              <div className="max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, ease }}
                  className="text-center mb-16"
                >
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-600 mb-3 px-3 py-1 rounded-full bg-emerald-50">
                    How It Works
                  </span>
                  <h2
                    className="text-3xl md:text-[42px] leading-[1.15] text-foreground font-normal tracking-tight"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Three minutes from question
                    <br />
                    to <span className="italic text-gradient">strategic clarity</span>
                  </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {[
                    {
                      step: '01',
                      title: 'Pick your challenge',
                      description:
                        'Select from 5 critical PMF dimensions — retention, positioning, distribution, monetization, or market fit.',
                      icon: '🎯',
                    },
                    {
                      step: '02',
                      title: 'Answer 5 questions',
                      description:
                        'Our AI asks targeted questions and generates real-time micro-insights as you respond.',
                      icon: '💬',
                    },
                    {
                      step: '03',
                      title: 'Get your report',
                      description:
                        'Receive a 9-section diagnostic with risk signals, strengths, and a Sprint 0 action plan.',
                      icon: '📊',
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ delay: i * 0.12, duration: 0.6, ease }}
                    >
                      <MagicCard
                        className="card-elevated p-8 h-full text-center group hover:-translate-y-1 transition-transform duration-300"
                        gradientColor="rgba(16, 185, 129, 0.06)"
                      >
                        <div className="flex justify-center mb-5">
                          <div
                            className="w-11 h-11 rounded-full flex items-center justify-center text-[13px] font-bold text-white"
                            style={{ background: 'linear-gradient(135deg, #0F172A, #334155)' }}
                          >
                            {item.step}
                          </div>
                        </div>
                        <span className="text-2xl mb-3 block">{item.icon}</span>
                        <h3 className="text-[15px] font-semibold text-foreground mb-2 tracking-tight">{item.title}</h3>
                        <p className="text-[13px] text-muted-foreground leading-relaxed">{item.description}</p>
                      </MagicCard>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Divider */}
            <div className="max-w-5xl mx-auto px-6">
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            {/* === Testimonials === */}
            <section id="testimonials" className="py-24 px-6">
              <div className="max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, ease }}
                  className="text-center mb-16"
                >
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-600 mb-3 px-3 py-1 rounded-full bg-emerald-50">
                    Trusted by Founders
                  </span>
                  <h2
                    className="text-3xl md:text-[42px] leading-[1.15] text-foreground font-normal tracking-tight"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Real results from <span className="italic text-gradient">real founders</span>
                  </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    {
                      quote:
                        'We were about to double down on paid ads. The PMF report showed us retention was the real problem. Saved months and $40K in ad spend.',
                      name: 'Akash M.',
                      role: 'Co-founder, NoteStack',
                      metric: 'Saved $40K',
                    },
                    {
                      quote:
                        'The positioning audit was spot-on. We changed our homepage copy and saw a 34% increase in signup-to-activation.',
                      name: 'Elena V.',
                      role: 'CEO, Briefcase',
                      metric: '+34% activation',
                    },
                    {
                      quote:
                        'Best free tool for early-stage founders. The Sprint 0 plan gave us a clear 4-week roadmap we actually executed.',
                      name: 'Jordan T.',
                      role: 'Founder, Climbr',
                      metric: 'PMF in 8 weeks',
                    },
                    {
                      quote:
                        "I've used every PMF framework out there. This is the only one that gives actionable insights, not just theory.",
                      name: 'Priya S.',
                      role: 'CTO, DataLayer',
                      metric: '2x iteration speed',
                    },
                  ].map((t, i) => (
                    <motion.div
                      key={t.name}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ delay: i * 0.08, duration: 0.5, ease }}
                    >
                      <MagicCard className="card-elevated p-7 h-full" gradientColor="rgba(16, 185, 129, 0.05)">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full text-emerald-700 bg-emerald-50">
                            {t.metric}
                          </span>
                        </div>
                        <p className="text-[14px] text-muted-foreground leading-[1.7] mb-5">&ldquo;{t.quote}&rdquo;</p>
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold text-white"
                            style={{ background: 'linear-gradient(135deg, #0F172A, #334155)' }}
                          >
                            {t.name[0]}
                          </div>
                          <div>
                            <p className="text-[13px] font-semibold text-foreground leading-tight">{t.name}</p>
                            <p className="text-[12px] text-muted-foreground">{t.role}</p>
                          </div>
                        </div>
                      </MagicCard>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* === Bottom CTA === */}
            <section className="py-24 px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="max-w-3xl mx-auto text-center"
              >
                <h2
                  className="text-3xl md:text-[42px] leading-[1.15] text-foreground mb-4 font-normal tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Ready to find your <span className="italic text-gradient">PMF gaps</span>?
                </h2>
                <p className="text-[15px] text-muted-foreground mb-8 max-w-md mx-auto">
                  No signup. No credit card. Get your full diagnostic in under 3 minutes.
                </p>
                <ShimmerButton onClick={handleStartAssessment} aria-label="Start free assessment">
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
              </motion.div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-border">
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #0F172A, #334155)' }}
                  >
                    <span className="text-white font-bold text-[8px]">P</span>
                  </div>
                  <span className="text-[12px] text-muted-foreground">PMF Insights by Wednesday Solutions</span>
                </div>
                <p className="text-[12px] text-muted-foreground">
                  &copy; {new Date().getFullYear()} Wednesday Solutions. All rights reserved.
                </p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Interface */}
      {showChat && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.15 }}>
          <ChatInterface />
        </motion.div>
      )}
    </main>
  )
}
