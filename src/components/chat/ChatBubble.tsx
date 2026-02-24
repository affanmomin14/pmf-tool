'use client'

import { motion } from 'framer-motion'

import type { ChatMessage } from '@/lib/types'

interface ChatBubbleProps {
  message: ChatMessage
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isBot = message.role === 'bot'
  const isInsight = message.type === 'insight'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
      className={`flex items-end gap-2.5 px-5 py-1.5 ${isBot ? '' : 'flex-row-reverse'}`}
    >
      {isBot && (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg, #0F172A, #334155)' }}
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
            />
          </svg>
        </div>
      )}

      <div
        className={`max-w-[75%] px-4 py-3 ${
          isBot
            ? isInsight
              ? 'rounded-2xl rounded-bl-lg bg-emerald-50 border border-emerald-100'
              : 'rounded-2xl rounded-bl-lg bg-card border border-border'
            : 'rounded-2xl rounded-br-lg text-white'
        }`}
        style={
          !isBot
            ? {
                background: 'linear-gradient(135deg, #0F172A, #1E293B)',
                boxShadow: '0 2px 8px rgba(15, 23, 42, 0.15)',
              }
            : isInsight
              ? undefined
              : {
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                }
        }
      >
        {isInsight && (
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">Insight</span>
          </div>
        )}
        <p
          className={`text-[14px] leading-relaxed ${isBot ? (isInsight ? 'text-emerald-900' : 'text-foreground') : 'text-white'}`}
        >
          {message.content}
        </p>
      </div>
    </motion.div>
  )
}
