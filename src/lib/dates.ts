import { format, eachDayOfInterval, parseISO, differenceInDays, isAfter } from 'date-fns'
import { fr } from 'date-fns/locale'

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, 'd MMMM yyyy', { locale: fr })
}

export function formatDateShort(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, 'dd/MM/yyyy')
}

export function formatDayLabel(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, 'EEEE d MMMM', { locale: fr })
}

export function getDaysInPeriod(start: string, end: string): string[] {
  return eachDayOfInterval({
    start: parseISO(start),
    end: parseISO(end),
  }).map((d) => format(d, 'yyyy-MM-dd'))
}

export function isKeepUntilExpired(keepUntil: string | null): boolean {
  if (!keepUntil) return false
  return isAfter(new Date(), parseISO(keepUntil))
}

export function daysUntilExpiry(keepUntil: string): number {
  return differenceInDays(parseISO(keepUntil), new Date())
}

export function toISODate(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

export function computeTotalUnits(durationDays: number): number {
  return durationDays * 2
}
