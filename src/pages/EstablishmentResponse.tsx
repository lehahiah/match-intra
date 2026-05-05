import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Session, AccessToken } from '../types/database'

export default function EstablishmentResponse() {
  const { token } = useParams<{ token: string }>()
  const navigate = useNavigate()
  const [session, setSession] = useState<Session | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!token) { setError('Lien invalide.'); setLoading(false); return }

      const { data: tokenRow } = await supabase
        .from('access_tokens')
        .select('*, sessions(*)')
        .eq('token', token)
        .eq('role', 'establishment')
        .eq('active', true)
        .single<AccessToken & { sessions: Session }>()

      if (!tokenRow) { setError("Ce lien n'est pas valide ou a expiré."); setLoading(false); return }
      if (tokenRow.sessions.status === 'confirmed') {
        setError('Cette session a déjà été confirmée. Vous pouvez contacter AEC si nécessaire.')
        setLoading(false)
        return
      }

      if (!tokenRow.first_opened_at) {
        await supabase.from('access_tokens').update({ first_opened_at: new Date().toISOString() }).eq('id', tokenRow.id)
      }

      setSession(tokenRow.sessions)
      setLoading(false)
    }
    load()
  }, [token])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>
  if (error) return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <p className="text-center text-gray-600 max-w-sm">{error}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-lg mx-auto">
        <p className="text-gray-500">— Formulaire établissement à implémenter (Phase 4)</p>
        <p className="text-sm text-gray-400 mt-2">Session : {session?.id}</p>
      </div>
    </div>
  )
}
