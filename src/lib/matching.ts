import { parseISO, differenceInDays } from 'date-fns'
import { isKeepUntilExpired } from './dates'
import type { Availability, Session } from '../types/database'
import type { MatchUnit, ProposalCandidate } from '../types/proposal'

/**
 * Point d'entrée principal du moteur de matching.
 * Prend les disponibilités brutes des deux participants et retourne
 * jusqu'à 5 propositions triées par score décroissant.
 */
export function runMatching(
  session: Session,
  establishmentAvailabilities: Availability[],
  trainerAvailabilities: Availability[],
  trainerGlobalPreference: string | null,
  trainerKeepUntil: string | null,
): ProposalCandidate[] {
  const commonUnits = buildCommonUnits(
    establishmentAvailabilities,
    trainerAvailabilities,
    trainerGlobalPreference,
    trainerKeepUntil,
  )

  if (commonUnits.length === 0) return []

  const candidates = generateCandidates(session, commonUnits)
  const scored = candidates.map(scoreProposal)

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
}

function buildCommonUnits(
  establishmentAvails: Availability[],
  trainerAvails: Availability[],
  trainerGlobalPreference: string | null,
  trainerKeepUntil: string | null,
): MatchUnit[] {
  const estabSet = new Set(
    establishmentAvails
      .filter((a) => a.is_available)
      .map((a) => `${a.availability_date}|${a.slot}`),
  )

  return trainerAvails
    .filter((a) => {
      if (!a.is_available) return false
      const effectiveKeepUntil = a.keep_until ?? trainerKeepUntil
      if (effectiveKeepUntil && isKeepUntilExpired(effectiveKeepUntil)) return false
      return estabSet.has(`${a.availability_date}|${a.slot}`)
    })
    .map((a) => ({
      date: a.availability_date,
      slot: a.slot,
      preference_level: (a.preference_level ?? trainerGlobalPreference ?? 'possible') as MatchUnit['preference_level'],
      keep_until: a.keep_until ?? trainerKeepUntil,
    }))
    .sort((a, b) => a.date.localeCompare(b.date) || a.slot.localeCompare(b.slot))
}

function generateCandidates(session: Session, units: MatchUnit[]): MatchUnit[][] {
  const { total_units, scheduling_mode, slot_mode } = session

  if (slot_mode === 'full_day') {
    const fullDays = buildFullDays(units)
    if (scheduling_mode === 'continuous') {
      return findContinuousSequences(fullDays, session.duration_days)
    } else {
      return findCombinations(fullDays, session.duration_days)
    }
  } else {
    if (scheduling_mode === 'continuous') {
      return findContinuousHalfDays(units, total_units)
    } else {
      return findCombinations(units, total_units)
    }
  }
}

function buildFullDays(units: MatchUnit[]): MatchUnit[][] {
  const byDate = new Map<string, MatchUnit[]>()
  for (const unit of units) {
    if (!byDate.has(unit.date)) byDate.set(unit.date, [])
    byDate.get(unit.date)!.push(unit)
  }
  return Array.from(byDate.entries())
    .filter(([, slots]) => slots.some((s) => s.slot === 'morning') && slots.some((s) => s.slot === 'afternoon'))
    .map(([, slots]) => slots)
    .sort((a, b) => a[0].date.localeCompare(b[0].date))
}

function findContinuousSequences(days: MatchUnit[][], needed: number): MatchUnit[][] {
  const results: MatchUnit[][] = []
  for (let i = 0; i <= days.length - needed; i++) {
    const sequence = days.slice(i, i + needed)
    if (isConsecutiveDays(sequence.map((d) => d[0].date))) {
      results.push(sequence.flat())
    }
  }
  return results
}

function findContinuousHalfDays(units: MatchUnit[], needed: number): MatchUnit[][] {
  const results: MatchUnit[][] = []
  for (let i = 0; i <= units.length - needed; i++) {
    const sequence = units.slice(i, i + needed)
    if (isConsecutiveUnits(sequence)) {
      results.push(sequence)
    }
  }
  return results
}

function findCombinations<T>(items: T[], size: number): T[][] {
  if (size === 0) return [[]]
  if (items.length < size) return []
  const [first, ...rest] = items
  const withFirst = findCombinations(rest, size - 1).map((c) => [first, ...c])
  const withoutFirst = findCombinations(rest, size)
  return [...withFirst, ...withoutFirst].slice(0, 20)
}

function isConsecutiveDays(dates: string[]): boolean {
  for (let i = 1; i < dates.length; i++) {
    if (differenceInDays(parseISO(dates[i]), parseISO(dates[i - 1])) !== 1) return false
  }
  return true
}

function isConsecutiveUnits(units: MatchUnit[]): boolean {
  for (let i = 1; i < units.length; i++) {
    const prev = units[i - 1]
    const curr = units[i]
    if (prev.date === curr.date) {
      if (!(prev.slot === 'morning' && curr.slot === 'afternoon')) return false
    } else {
      const gap = differenceInDays(parseISO(curr.date), parseISO(prev.date))
      if (gap !== 1 || curr.slot !== 'morning') return false
    }
  }
  return true
}

function scoreProposal(units: MatchUnit[]): ProposalCandidate {
  let score = 50

  const preferences = units.map((u) => u.preference_level)
  const idealCount = preferences.filter((p) => p === 'ideal').length
  const possibleCount = preferences.filter((p) => p === 'possible').length
  const confirmCount = preferences.filter((p) => p === 'confirm_later').length

  const dominant = idealCount >= possibleCount && idealCount >= confirmCount
    ? 'ideal'
    : possibleCount >= confirmCount ? 'possible' : 'confirm_later'

  if (dominant === 'ideal') score += 25
  else if (dominant === 'possible') score += 15
  else score += 5

  const keepUntils = units.map((u) => u.keep_until).filter(Boolean) as string[]
  const minDays = keepUntils.length > 0
    ? Math.min(...keepUntils.map((k) => differenceInDays(parseISO(k), new Date())))
    : 99
  if (minDays > 14) score += 10
  else if (minDays >= 7) score += 5

  const dates = [...new Set(units.map((u) => u.date))]
  const span = dates.length > 1
    ? differenceInDays(parseISO(dates[dates.length - 1]), parseISO(dates[0]))
    : 0
  if (span <= dates.length) score += 10
  else if (span <= dates.length * 2) score += 5

  score = Math.min(score, 100)

  const compatibility_level = score >= 80 ? 'strong' : score >= 60 ? 'medium' : 'fragile'
  const earliest_keep_until = keepUntils.length > 0
    ? keepUntils.sort()[0]
    : null

  return {
    units,
    score,
    compatibility_level,
    dominant_preference: dominant,
    earliest_keep_until,
  }
}
