import { SESSION_STATUS_LABELS, SESSION_STATUS_COLORS, RESPONSE_STATUS_LABELS, RESPONSE_STATUS_COLORS, COMPATIBILITY_LABELS, COMPATIBILITY_COLORS } from '../../lib/status'
import type { SessionStatus, ResponseStatus, CompatibilityLevel } from '../../types/database'

interface SessionStatusBadgeProps {
  status: SessionStatus
}

export function SessionStatusBadge({ status }: SessionStatusBadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${SESSION_STATUS_COLORS[status]}`}>
      {SESSION_STATUS_LABELS[status]}
    </span>
  )
}

interface ResponseStatusBadgeProps {
  status: ResponseStatus
  role: 'establishment' | 'trainer'
}

export function ResponseStatusBadge({ status, role }: ResponseStatusBadgeProps) {
  const label = role === 'establishment' ? 'Établissement' : 'Intervenant'
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500">{label}</span>
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${RESPONSE_STATUS_COLORS[status]}`}>
        {RESPONSE_STATUS_LABELS[status]}
      </span>
    </div>
  )
}

interface CompatibilityBadgeProps {
  level: CompatibilityLevel
  score: number
}

export function CompatibilityBadge({ level, score }: CompatibilityBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium border ${COMPATIBILITY_COLORS[level]}`}>
      {score}/100 — {COMPATIBILITY_LABELS[level]}
    </span>
  )
}
