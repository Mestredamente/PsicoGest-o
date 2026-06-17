import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Plus } from 'lucide-react'
import { mockPatients, mockSessions, type Patient } from '@/lib/mock-data'
import { SessionCard } from '@/components/dashboard/SessionCard'
import { PatientCard } from '@/components/dashboard/PatientCard'
import { PatientRecordSheet } from '@/components/dashboard/PatientRecordSheet'
import { NewSessionDialog } from '@/components/dashboard/NewSessionDialog'

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPatientRecord, setSelectedPatientRecord] = useState<Patient | null>(null)
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false)

  // Current Date formatting
  const formattedDate = useMemo(() => {
    const dateStr = new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date())
    return dateStr.charAt(0).toUpperCase() + dateStr.slice(1)
  }, [])

  // Filter patients based on search
  const filteredPatients = useMemo(() => {
    const filtered = mockPatients.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    return searchQuery ? filtered : filtered.slice(0, 5)
  }, [searchQuery])

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 md:pb-0 animate-in fade-in duration-500">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <p className="text-slate-500 font-medium tracking-wide text-sm uppercase">
            {formattedDate}
          </p>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Olá, Dr. Rafael 👋</h1>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar pacientes..."
            className="pl-10 bg-white border-slate-200 shadow-sm rounded-xl h-11 focus-visible:ring-primary/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      {/* Today's Schedule Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800">Próximas Sessões de Hoje</h2>
          <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full">
            {mockSessions.length} agendas
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockSessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
          {mockSessions.length === 0 && (
            <div className="col-span-full py-8 text-center bg-white rounded-xl border border-dashed border-slate-200 text-slate-500">
              Não há sessões agendadas para hoje.
            </div>
          )}
        </div>
      </section>

      {/* Patients Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-800">Meus Pacientes</h2>

        {filteredPatients.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onViewRecord={setSelectedPatientRecord}
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center bg-white rounded-xl border border-dashed border-slate-200">
            <p className="text-slate-500 font-medium">
              Nenhum paciente encontrado com "{searchQuery}"
            </p>
            <Button variant="link" onClick={() => setSearchQuery('')} className="text-primary mt-2">
              Limpar busca
            </Button>
          </div>
        )}
      </section>

      {/* Floating Action Button */}
      <Button
        className="fixed bottom-24 md:bottom-10 right-6 md:right-10 h-16 w-16 rounded-full shadow-2xl shadow-primary/30 hover:scale-105 hover:shadow-primary/40 transition-all duration-300 p-0 z-50 bg-primary hover:bg-primary/90"
        onClick={() => setIsSessionModalOpen(true)}
      >
        <Plus className="h-8 w-8 text-white" />
        <span className="sr-only">Iniciar Nova Sessão</span>
      </Button>

      {/* Slide-over for Patient Record */}
      <PatientRecordSheet
        patient={selectedPatientRecord}
        isOpen={!!selectedPatientRecord}
        onClose={() => setSelectedPatientRecord(null)}
      />

      {/* Modal for New Session */}
      <NewSessionDialog
        isOpen={isSessionModalOpen}
        onClose={() => setIsSessionModalOpen(false)}
        patients={mockPatients}
      />
    </div>
  )
}
