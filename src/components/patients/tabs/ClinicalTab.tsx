import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { Patient } from '@/lib/mock-data'

interface Props {
  formData: Patient
  onChange: (field: string, value: string) => void
}

export function ClinicalTab({ formData, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-100 space-y-4">
        <h3 className="text-lg font-semibold text-cyan-900">Resumo Clínico</h3>

        <div className="space-y-2">
          <Label>Queixa Principal</Label>
          <Textarea
            className="min-h-[100px] resize-none"
            value={formData.complaint || ''}
            onChange={(e) => onChange('complaint', e.target.value)}
            placeholder="Descreva a queixa principal do paciente..."
          />
        </div>

        <div className="space-y-2">
          <Label>Histórico Breve / Anotações Gerais</Label>
          <Textarea
            className="min-h-[150px] resize-none"
            value={formData.history || ''}
            onChange={(e) => onChange('history', e.target.value)}
            placeholder="Informações relevantes sobre o histórico do paciente..."
          />
        </div>

        <div className="space-y-2">
          <Label>Medicamentos em uso</Label>
          <Textarea
            className="min-h-[80px] resize-none"
            value={formData.meds || ''}
            onChange={(e) => onChange('meds', e.target.value)}
            placeholder="Ex: Sertralina 50mg, Zolpidem 10mg..."
          />
        </div>
      </div>
    </div>
  )
}
