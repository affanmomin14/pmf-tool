'use client'

import { useState } from 'react'

import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import type { QuestionOption } from '@/lib/types'

interface QuestionInputProps {
  type: 'textarea' | 'select'
  placeholder?: string
  options?: QuestionOption[]
  onSubmit: (answer: string) => void
  disabled: boolean
}

const MIN_TEXT_LENGTH = 10

export function QuestionInput({ type, placeholder, options, onSubmit, disabled }: QuestionInputProps) {
  const [value, setValue] = useState('')
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const isValid = type === 'select' ? selectedOption !== null : value.trim().length >= MIN_TEXT_LENGTH

  const handleSubmit = () => {
    if (!isValid || disabled) return
    const answer = type === 'select'
      ? options?.find(o => o.id === selectedOption)?.label ?? ''
      : value.trim()
    onSubmit(answer)
    setValue('')
    setSelectedOption(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && isValid) {
      e.preventDefault()
      handleSubmit()
    }
  }

  if (type === 'select' && options) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="px-5 py-2"
      >
        <div className="flex flex-col gap-1.5 ml-[42px]">
          {options.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.04, duration: 0.25 }}
            >
              <Button
                variant="outline"
                onClick={() => {
                  if (disabled) return
                  setSelectedOption(option.id)
                  onSubmit(option.label)
                }}
                disabled={disabled}
                className={`w-full justify-start text-left h-auto py-3 px-4 rounded-xl text-[13px] transition-all duration-150 cursor-pointer ${
                  selectedOption === option.id
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                    : 'border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
                style={{ minHeight: '44px' }}
                aria-label={option.label}
              >
                {option.label}
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="px-5 py-2"
    >
      <div className="ml-[42px] flex flex-col gap-2">
        <div className="relative">
          <Textarea
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={3}
            className="w-full resize-none rounded-xl px-4 py-3 text-[14px] bg-card border-border text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-1 focus-visible:ring-foreground/20"
            style={{ minHeight: '44px' }}
            aria-label="Your answer"
          />
          {value.length > 0 && value.trim().length < MIN_TEXT_LENGTH && (
            <p className="absolute -bottom-5 left-1 text-[10px] text-muted-foreground">
              {MIN_TEXT_LENGTH - value.trim().length} more characters
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={!isValid || disabled}
            className="rounded-xl text-[13px] font-medium cursor-pointer gap-2 h-11"
            style={{
              background: isValid && !disabled ? 'linear-gradient(135deg, #0F172A, #1E293B)' : undefined,
              color: isValid && !disabled ? 'white' : undefined,
              minHeight: '44px',
            }}
            variant={isValid && !disabled ? 'default' : 'secondary'}
            aria-label="Submit answer"
          >
            Send
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
