import type { Proposal, CompatibilityLevel, PreferenceLevel } from './database'

export interface MatchUnit {
  date: string
  slot: 'morning' | 'afternoon'
  preference_level: PreferenceLevel
  keep_until: string | null
}

export interface MatchingInput {
  session_id: string
  duration_days: number
  total_units: number
  scheduling_mode: 'continuous' | 'discontinuous'
  slot_mode: 'full_day' | 'half_day'
  period_start: string
  period_end: string
  common_units: MatchUnit[]
}

export interface ProposalCandidate {
  units: MatchUnit[]
  score: number
  compatibility_level: CompatibilityLevel
  dominant_preference: PreferenceLevel
  earliest_keep_until: string | null
}

export type ProposalWithRank = Proposal & { rank: number }
