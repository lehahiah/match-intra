import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import SessionNew from './pages/SessionNew'
import SessionDetail from './pages/SessionDetail'
import EstablishmentResponse from './pages/EstablishmentResponse'
import TrainerResponse from './pages/TrainerResponse'
import Thanks from './pages/Thanks'
import ProtectedRoute from './components/auth/ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
  },
  {
    path: '/sessions/new',
    element: <ProtectedRoute><SessionNew /></ProtectedRoute>,
  },
  {
    path: '/sessions/:id',
    element: <ProtectedRoute><SessionDetail /></ProtectedRoute>,
  },
  {
    path: '/r/establishment/:token',
    element: <EstablishmentResponse />,
  },
  {
    path: '/r/trainer/:token',
    element: <TrainerResponse />,
  },
  {
    path: '/thanks',
    element: <Thanks />,
  },
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
