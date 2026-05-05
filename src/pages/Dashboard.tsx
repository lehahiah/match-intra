import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Match Intra</h1>
        <Button onClick={() => navigate('/sessions/new')} size="sm">
          Nouvelle session
        </Button>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-8">
        <p className="text-gray-500">— Dashboard à implémenter (Phase 6)</p>
      </main>
    </div>
  )
}
