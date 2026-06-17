import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Patient } from '@/lib/mock-data'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Props {
  formData: Patient
  onChange: (field: string, value: any) => void
  onAddressChange: (field: string, value: string) => void
}

export function PersonalTab({ formData, onChange, onAddressChange }: Props) {
  const isMinor = formData.age < 18

  const fetchCep = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '')
    if (cleanCep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
        const data = await res.json()
        if (!data.erro) {
          onAddressChange('street', data.logradouro)
          onAddressChange('neighborhood', data.bairro)
          onAddressChange('city', data.localidade)
          onAddressChange('state', data.uf)
        }
      } catch (e) {
        console.error('Erro ao buscar CEP', e)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-100 space-y-4">
        <h3 className="text-lg font-semibold text-cyan-900">Dados Básicos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>
              Nome Completo <span className="text-red-500">*</span>
            </Label>
            <Input
              value={formData.name}
              onChange={(e) => onChange('name', e.target.value)}
              placeholder="Ex: João da Silva"
            />
          </div>
          <div className="space-y-2">
            <Label>CPF</Label>
            <Input
              value={formData.cpf || ''}
              onChange={(e) => onChange('cpf', e.target.value)}
              placeholder="000.000.000-00"
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={formData.email || ''}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="joao@email.com"
            />
          </div>
          <div className="space-y-2">
            <Label>Telefone (com DDI/DDD)</Label>
            <div className="flex gap-2">
              <Input className="w-20" placeholder="+55" defaultValue="+55" />
              <Input
                className="flex-1"
                value={formData.phone || ''}
                onChange={(e) => onChange('phone', e.target.value)}
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Idade</Label>
            <Input
              type="number"
              value={formData.age}
              onChange={(e) => onChange('age', parseInt(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={formData.status} onValueChange={(v) => onChange('status', v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-100 space-y-4">
        <h3 className="text-lg font-semibold text-cyan-900">Endereço</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>CEP</Label>
            <Input
              value={formData.address?.cep || ''}
              onChange={(e) => onAddressChange('cep', e.target.value)}
              onBlur={(e) => fetchCep(e.target.value)}
              placeholder="00000-000"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Logradouro</Label>
            <Input
              value={formData.address?.street || ''}
              onChange={(e) => onAddressChange('street', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Número</Label>
            <Input
              value={formData.address?.number || ''}
              onChange={(e) => onAddressChange('number', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Bairro</Label>
            <Input
              value={formData.address?.neighborhood || ''}
              onChange={(e) => onAddressChange('neighborhood', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Cidade</Label>
            <Input
              value={formData.address?.city || ''}
              onChange={(e) => onAddressChange('city', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Estado</Label>
            <Input
              value={formData.address?.state || ''}
              onChange={(e) => onAddressChange('state', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-100 space-y-4">
        <h3 className="text-lg font-semibold text-cyan-900">Contatos e Responsáveis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>
              Contato de Emergência <span className="text-red-500">*</span>
            </Label>
            <Input
              value={formData.emergencyContact || ''}
              onChange={(e) => onChange('emergencyContact', e.target.value)}
              placeholder="Nome e Telefone"
            />
          </div>
          {isMinor && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
              <Label>
                Responsável Legal <span className="text-red-500">*</span>
              </Label>
              <Input
                value={formData.legalGuardian || ''}
                onChange={(e) => onChange('legalGuardian', e.target.value)}
                placeholder="Nome do responsável"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
