import type { Slot, PreferenceLevel, Role } from './database'

export interface AvailabilitySlot {
  date: string
  slot: Slot
  selected: boolean
}

export interface AvailabilityDay {
  date: string
  morning: boolean
  afternoon: boolean
}

export interface AvailabilityWithPreference {
  date: string
  slot: Slot
  role: Role
  preference_level: PreferenceLevel | null
  keep_until: string | null
}

export interface AvailabilitySubmission {
  session_id: string
  role: Role
  availabilities: AvailabilityWithPreference[]
  global_preference?: PreferenceLevel
  keep_until?: string
  comment?: string
}
