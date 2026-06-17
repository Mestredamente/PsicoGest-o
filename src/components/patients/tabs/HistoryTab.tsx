import type { Patient } from '@/lib/mock-data'

interface Props {
  patient: Patient
}

export function HistoryTab({ patient }: Props) {
  // Mock history events
  const events = [
    { date: 'Hoje', action: 'Visualização e atualização do prontuário' },
    { date: patient.lastSession || 'Semana passada', action: 'Sessão realizada com sucesso' },
    { date: 'Mês passado', action: 'Cadastro atualizado' },
    { date: 'Há 2 meses', action: 'Início do acompanhamento e triagem' },
  ]

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100 space-y-6">
      <h3 className="text-lg font-semibold text-cyan-900 mb-6">Histórico de Interações</h3>
      <div className="space-y-0">
        {events.map((event, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-cyan-900 mt-1.5 shadow-sm" />
              {i !== events.length - 1 && (
                <div className="w-px h-full bg-slate-200 mt-2 min-h-[30px]" />
              )}
            </div>
            <div className="pb-8">
              <p className="text-sm font-medium text-slate-800">{event.action}</p>
              <p className="text-xs text-slate-500 mt-1">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
