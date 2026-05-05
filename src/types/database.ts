export type SchedulingMode = 'continuous' | 'discontinuous'
export type SlotMode = 'full_day' | 'half_day'
export type Slot = 'morning' | 'afternoon'
export type Role = 'establishment' | 'trainer'
export type PreferenceLevel = 'ideal' | 'possible' | 'confirm_later'
export type CompatibilityLevel = 'strong' | 'medium' | 'fragile'

export type SessionStatus =
  | 'draft'
  | 'sent'
  | 'partial_response'
  | 'complete_responses'
  | 'match_found'
  | 'no_match'
  | 'confirmed'
  | 'closed'

export type ResponseStatus = 'not_started' | 'in_progress' | 'submitted'
export type ProposalStatus = 'proposed' | 'selected' | 'discarded'

export interface Program {
  id: string
  name: string
  catalog_duration_days: number | null
  active: boolean
  created_at: string
}

export interface Session {
  id: string
  reference: string | null
  program_id: string | null
  custom_program_name: string | null
  establishment_name: string
  establishment_email: string
  trainer_name: string
  trainer_email: string
  location_label: string
  period_start: string
  period_end: string
  duration_days: number
  total_units: number
  scheduling_mode: SchedulingMode
  slot_mode: SlotMode
  establishment_comment: string | null
  trainer_comment: string | null
  status: SessionStatus
  created_by: string | null
  created_at: string
  updated_at: string
  sent_at: string | null
  matched_at: string | null
  confirmed_at: string | null
}

export interface AccessToken {
  id: string
  session_id: string
  role: Role
  token: string
  expires_at: string | null
  first_opened_at: string | null
  submitted_at: string | null
  active: boolean
  created_at: string
}

export interface ParticipantResponse {
  id: string
  session_id: string
  role: Role
  global_preference: PreferenceLevel | null
  keep_until: string | null
  comment: string | null
  response_status: ResponseStatus
  responded_at: string | null
  created_at: string
  updated_at: string
}

export interface Availability {
  id: string
  session_id: string
  role: Role
  availability_date: string
  slot: Slot
  is_available: boolean
  preference_level: PreferenceLevel | null
  keep_until: string | null
  created_at: string
  updated_at: string
}

export interface ProposalDate {
  date: string
  slots: Slot[]
}

export interface Proposal {
  id: string
  session_id: string
  proposal_type: string
  proposal_rank: number
  score: number
  compatibility_level: CompatibilityLevel
  dates_json: ProposalDate[]
  units_count: number
  earliest_keep_until: string | null
  dominant_preference: PreferenceLevel | null
  status: ProposalStatus
  created_at: string
}
