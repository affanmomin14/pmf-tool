'use client'

import { useState, useCallback } from 'react'

import type { UserResponse } from '@/lib/types'
import { QUESTIONS, MICRO_INSIGHTS } from '@/lib/constants'

export type AssessmentStep = 'question' | 'analysis' | 'preview' | 'report'

function getRandomInsight(step: number): string {
    const insights = MICRO_INSIGHTS[String(step)]
    if (!insights) return 'Processing your response...'
    return insights[Math.floor(Math.random() * insights.length)]
}

export function useAssessment() {
    const [step, setStep] = useState<AssessmentStep>('question')
    const [questionIndex, setQuestionIndex] = useState(0)
    const [responses, setResponses] = useState<UserResponse[]>([])
    const [insightText, setInsightText] = useState<string | null>(null)
    const [emailUnlocked, setEmailUnlocked] = useState(false)

    const currentQuestion = QUESTIONS[questionIndex] ?? null
    const totalQuestions = QUESTIONS.length

    const answerQuestion = useCallback(
        (answer: string) => {
            const q = QUESTIONS[questionIndex]
            if (!q) return

            const newResponse: UserResponse = {
                step: q.step,
                question: q.question,
                answer,
            }
            setResponses(prev => [...prev, newResponse])

            // Show micro-insight
            const insight = getRandomInsight(q.step)
            setInsightText(insight)

            // After a brief pause for the insight toast, advance
            const nextIndex = questionIndex + 1
            setTimeout(() => {
                setInsightText(null)
                if (nextIndex < QUESTIONS.length) {
                    setQuestionIndex(nextIndex)
                } else {
                    setStep('analysis')
                }
            }, 2000)
        },
        [questionIndex],
    )

    const completeAnalysis = useCallback(() => {
        setStep('preview')
    }, [])

    const submitEmail = useCallback((email: string) => {
        setEmailUnlocked(true)
        setStep('report')
    }, [])

    return {
        step,
        questionIndex,
        currentQuestion,
        totalQuestions,
        responses,
        insightText,
        emailUnlocked,
        answerQuestion,
        completeAnalysis,
        submitEmail,
    }
}
