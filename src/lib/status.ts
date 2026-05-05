import type { SessionStatus, ResponseStatus, CompatibilityLevel, PreferenceLevel } from '../types/database'

export const SESSION_STATUS_LABELS: Record<SessionStatus, string> = {
  draft: 'Brouillon',
  sent: 'Envoyée',
  partial_response: 'Réponse partielle',
  complete_responses: 'Réponses complètes',
  match_found: 'Match trouvé',
  no_match: 'Sans solution',
  confirmed: 'Confirmée',
  closed: 'Clôturée',
}

export const SESSION_STATUS_COLORS: Record<SessionStatus, string> = {
  draft: 'bg-gray-100 text-gray-600',
  sent: 'bg-blue-100 text-blue-700',
  partial_response: 'bg-yellow-100 text-yellow-700',
  complete_responses: 'bg-orange-100 text-orange-700',
  match_found: 'bg-green-100 text-green-700',
  no_match: 'bg-red-100 text-red-700',
  confirmed: 'bg-emerald-100 text-emerald-700',
  closed: 'bg-gray-100 text-gray-400',
}

export const RESPONSE_STATUS_LABELS: Record<ResponseStatus, string> = {
  not_started: 'En attente',
  in_progress: 'En cours',
  submitted: 'Répondu',
}

export const RESPONSE_STATUS_COLORS: Record<ResponseStatus, string> = {
  not_started: 'bg-gray-100 text-gray-500',
  in_progress: 'bg-yellow-100 text-yellow-700',
  submitted: 'bg-green-100 text-green-700',
}

export const COMPATIBILITY_LABELS: Record<CompatibilityLevel, string> = {
  strong: 'Compatibilité forte',
  medium: 'Compatibilité moyenne',
  fragile: 'À sécuriser',
}

export const COMPATIBILITY_COLORS: Record<CompatibilityLevel, string> = {
  strong: 'bg-green-100 text-green-700 border-green-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  fragile: 'bg-red-100 text-red-700 border-red-200',
}

export const PREFERENCE_LABELS: Record<PreferenceLevel, string> = {
  ideal: 'Idéal',
  possible: 'Possible',
  confirm_later: 'À confirmer',
}

export function isSessionEditable(status: SessionStatus): boolean {
  return status === 'draft' || status === 'sent' || status === 'no_match'
}

export function canRunMatching(status: SessionStatus): boolean {
  return status === 'complete_responses' || status === 'match_found' || status === 'no_match'
}
