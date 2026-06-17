import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import type { Patient } from '@/lib/mock-data'

interface Props {
  formData: Patient
  onChange: (field: string, value: string) => void
  copyFromPersonal: () => void
}

export function PaymentTab({ formData, onChange, copyFromPersonal }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-cyan-900">Dados de Faturamento</h3>
          <p className="text-sm text-slate-500">
            Informações utilizadas para emissão de notas fiscais e recibos.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={copyFromPersonal}
          className="text-cyan-900 border-cyan-200 hover:bg-cyan-50"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copiar do Cadastro
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>CPF / CNPJ</Label>
          <Input
            value={formData.paymentData?.document || ''}
            onChange={(e) => onChange('document', e.target.value)}
            placeholder="000.000.000-00 ou 00.000.000/0001-00"
          />
        </div>
        <div className="space-y-2">
          <Label>Razão Social / Nome Completo</Label>
          <Input
            value={formData.paymentData?.businessName || ''}
            onChange={(e) => onChange('businessName', e.target.value)}
            placeholder="Nome para faturamento"
          />
        </div>
      </div>
    </div>
  )
}
