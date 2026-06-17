import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Navigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Stethoscope } from 'lucide-react'

export default function Login() {
  const { signIn, isAuthenticated } = useAuth()
  const [email, setEmail] = useState('mestredamente1@gmail.com')
  const [password, setPassword] = useState('Skip@Pass')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) return <Navigate to="/pacientes" />

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await signIn(email, password)
    if (error) {
      toast.error('Email ou senha incorretos.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md shadow-lg border-slate-100">
        <CardHeader className="text-center space-y-4 pt-8">
          <div className="mx-auto bg-cyan-900 w-16 h-16 rounded-2xl flex items-center justify-center">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-cyan-900">Gestão Clínica</CardTitle>
            <CardDescription>Acesse seu painel profissional</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pb-8">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                required
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                type="password"
                required
                className="bg-white"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-cyan-900 hover:bg-cyan-800 text-white"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
