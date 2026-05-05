import type { Session, ParticipantResponse, Proposal } from './database'

export interface SessionWithResponses extends Session {
  establishment_response?: ParticipantResponse
  trainer_response?: ParticipantResponse
  proposals?: Proposal[]
  proposals_count?: number
}

export interface NewSessionFormData {
  program_id: string
  custom_program_name: string
  establishment_name: string
  establishment_email: string
  trainer_name: string
  trainer_email: string
  location_label: string
  period_start: string
  period_end: string
  duration_days: number
  scheduling_mode: 'continuous' | 'discontinuous'
  slot_mode: 'full_day' | 'half_day'
  establishment_comment: string
  trainer_comment: string
}
