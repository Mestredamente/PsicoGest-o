import { useState, useMemo, useEffect } from 'react'
import { Search, Plus, FileText } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getPatients, type Patient } from '@/services/clinical'
import { Link } from 'react-router-dom'
import { useRealtime } from '@/hooks/use-realtime'

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')

  const loadData = () => {
    getPatients().then(setPatients).catch(console.error)
  }

  useEffect(() => {
    loadData()
  }, [])

  useRealtime('patients', () => {
    loadData()
  })

  const filteredPatients = useMemo(() => {
    return patients.filter((p) => {
      const matchName = p.name.toLowerCase().includes(search.toLowerCase())
      const matchStatus = statusFilter === 'Todos' || p.status === statusFilter
      return matchName && matchStatus
    })
  }, [patients, search, statusFilter])

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 md:pb-0 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-cyan-900 tracking-tight">Pacientes</h1>
          <p className="text-slate-500 mt-1">
            Gerencie os cadastros e prontuários dos seus pacientes.
          </p>
        </div>
        <Button className="bg-cyan-900 hover:bg-cyan-800 text-white" disabled>
          <Plus className="w-4 h-4 mr-2" /> Novo Paciente
        </Button>
      </header>

      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar por nome..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos os Status</SelectItem>
              <SelectItem value="Ativo">Ativos</SelectItem>
              <SelectItem value="Inativo">Inativos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold text-slate-700">Paciente</TableHead>
              <TableHead className="font-semibold text-slate-700">Status</TableHead>
              <TableHead className="font-semibold text-slate-700">Idade</TableHead>
              <TableHead className="font-semibold text-slate-700 hidden md:table-cell">
                Contato
              </TableHead>
              <TableHead className="font-semibold text-slate-700 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((p) => (
              <TableRow key={p.id} className="hover:bg-slate-50/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-slate-200">
                      <AvatarFallback className="bg-cyan-50 text-cyan-900">
                        {p.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-slate-900">{p.name}</p>
                      <p className="text-xs text-slate-500 hidden sm:block">
                        {p.email || 'Sem email'}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={p.status === 'Ativo' ? 'default' : 'secondary'}
                    className={p.status === 'Ativo' ? 'bg-cyan-900 hover:bg-cyan-800' : ''}
                  >
                    {p.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-slate-700">{p.age} anos</span>
                  {p.age < 18 && (
                    <Badge
                      variant="outline"
                      className="ml-2 text-[10px] uppercase tracking-wider text-slate-500"
                    >
                      Menor
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell text-slate-600">
                  {p.phone || '-'}
                </TableCell>
                <TableCell className="text-right">
                  <Link to={`/pacientes/${p.id}/prontuario`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-cyan-900 hover:text-cyan-800 hover:bg-cyan-50"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Prontuário
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            {filteredPatients.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                  Nenhum paciente encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
