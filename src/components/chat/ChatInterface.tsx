'use client'

import { useRef, useEffect } from 'react'

import { AnimatePresence } from 'framer-motion'

import { QUESTIONS } from '@/lib/constants'
import { useChat } from '@/hooks/useChat'

import { ChatBubble } from './ChatBubble'
import { CategoryCards } from './CategoryCards'
import { QuestionInput } from './QuestionInput'
import { TypingIndicator } from './TypingIndicator'
import { AnalysisLoader } from './AnalysisLoader'
import { PreviewCards } from './PreviewCards'
import { EmailGate } from './EmailGate'
import { Report } from './Report'

export function ChatInterface() {
  const {
    messages,
    currentStep,
    questionIndex,
    isTyping,
    emailUnlocked,
    startChat,
    selectCategory,
    answerQuestion,
    completeAnalysis,
    showEmailGate,
    submitEmail,
  } = useChat()

  const chatEndRef = useRef<HTMLDivElement>(null)
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!hasStarted.current) {
      hasStarted.current = true
      startChat()
    }
  }, [startChat])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping, currentStep])

  const currentQuestion = QUESTIONS[questionIndex]
  const isShowingCategories =
    currentStep === 'category-select' &&
    messages.some(m => m.type === 'categories') &&
    !messages.some(m => m.role === 'user')

  const isShowingQuestionInput =
    currentStep === 'questions' &&
    messages.length > 0 &&
    !isTyping

  const lastBotMessage = [...messages].reverse().find(m => m.role === 'bot')
  const isWaitingForAnswer = lastBotMessage?.type === 'question' || lastBotMessage?.type === 'categories'

  return (
    <section
      id="chat"
      className="min-h-screen relative bg-background"
    >
      {/* Chat header */}
      <div
        className="sticky top-0 z-20 px-6 py-4 flex items-center gap-3"
        style={{
          background: 'rgba(250, 251, 252, 0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(15, 23, 42, 0.06)',
        }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #0F172A, #334155)' }}
        >
          <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">PMF Diagnostic Assistant</p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" style={{ boxShadow: '0 0 6px rgba(16, 185, 129, 0.5)' }} />
            <span className="text-[11px] text-muted-foreground">Online</span>
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div className="max-w-3xl mx-auto pb-8 pt-4">
        {messages.map(message => {
          if (message.type === 'categories' || message.type === 'question' || message.type === 'preview' || message.type === 'email-gate' || message.type === 'report') {
            return (
              <div key={message.id}>
                <ChatBubble message={{ ...message, type: 'text' }} />

                {message.type === 'categories' && isShowingCategories && (
                  <CategoryCards
                    categories={message.options as import('@/lib/types').CategoryOption[]}
                    onSelect={selectCategory}
                    disabled={!isWaitingForAnswer}
                  />
                )}

                {message.type === 'preview' && (
                  <PreviewCards onContinue={showEmailGate} />
                )}

                {message.type === 'email-gate' && !emailUnlocked && (
                  <EmailGate onSubmit={submitEmail} disabled={false} />
                )}

                {message.type === 'report' && (
                  <Report isUnlocked={emailUnlocked} />
                )}
              </div>
            )
          }

          return <ChatBubble key={message.id} message={message} />
        })}

        {/* Question input */}
        {isShowingQuestionInput && isWaitingForAnswer && lastBotMessage?.type === 'question' && currentQuestion && (
          <QuestionInput
            type={currentQuestion.type}
            placeholder={currentQuestion.placeholder}
            options={currentQuestion.options}
            onSubmit={answerQuestion}
            disabled={isTyping}
          />
        )}

        {/* Analysis loader */}
        {currentStep === 'analysis' && (
          <AnalysisLoader onComplete={completeAnalysis} />
        )}

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && <TypingIndicator />}
        </AnimatePresence>

        <div ref={chatEndRef} />
      </div>
    </section>
  )
}
