export interface ChatMessage {
  id: string
  role: 'bot' | 'user'
  content: string
  type: 'text' | 'categories' | 'question' | 'insight' | 'loading' | 'preview' | 'email-gate' | 'report' | 'cta'
  options?: CategoryOption[] | QuestionOption[]
  timestamp: number
}

export interface CategoryOption {
  id: string
  icon: string
  title: string
  description: string
  count: number
}

export interface QuestionOption {
  id: string
  label: string
  value: string
}

export interface UserResponse {
  step: number
  question: string
  answer: string
}

export interface PreviewSignal {
  type: 'risk' | 'signal' | 'strength'
  emoji: string
  title: string
  description: string
}

export interface ReportSection {
  id: string
  title: string
  icon: string
  content: string
  severity: 'critical' | 'warning' | 'positive' | 'neutral'
  metrics?: ReportMetric[]
}

export interface ReportMetric {
  label: string
  value: string
  trend: 'up' | 'down' | 'neutral'
}

export type ChatStep =
  | 'landing'
  | 'category-select'
  | 'questions'
  | 'analysis'
  | 'preview'
  | 'email-gate'
  | 'report'
  | 'cta'
