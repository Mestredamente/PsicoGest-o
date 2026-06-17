import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { Patient } from '@/lib/mock-data'
import { PersonalTab } from './tabs/PersonalTab'
import { PaymentTab } from './tabs/PaymentTab'
import { ClinicalTab } from './tabs/ClinicalTab'
import { HistoryTab } from './tabs/HistoryTab'

interface Props {
  isOpen: boolean
  onClose: () => void
  patient: Patient | null
  onSave: (p: Patient) => void
}

const defaultPatient: Patient = {
  id: '',
  name: '',
  age: 0,
  status: 'Ativo',
  complaint: '',
  history: '',
  meds: '',
  notes: '',
  lastSession: '',
  nextSession: '',
  email: '',
  phone: '',
  cpf: '',
  address: { cep: '', street: '', number: '', neighborhood: '', city: '', state: '' },
  emergencyContact: '',
  paymentData: { document: '', businessName: '' },
}

export function PatientManagementDialog({ isOpen, onClose, patient, onSave }: Props) {
  const [formData, setFormData] = useState<Patient>(defaultPatient)
  const [activeTab, setActiveTab] = useState('personal')

  useEffect(() => {
    if (isOpen) {
      setFormData(patient || { ...defaultPatient })
      setActiveTab('personal')
    }
  }, [isOpen, patient])

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddressChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      address: { ...(prev.address || defaultPatient.address!), [field]: value },
    }))
  }

  const handlePaymentChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      paymentData: { ...(prev.paymentData || defaultPatient.paymentData!), [field]: value },
    }))
  }

  const handleSave = () => {
    if (!formData.name || !formData.emergencyContact) {
      alert('Preencha os campos obrigatórios: Nome e Contato de Emergência.')
      return
    }
    onSave(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] md:h-[80vh] flex flex-col p-0 overflow-hidden bg-slate-50 gap-0">
        <DialogHeader className="p-6 pb-4 bg-white border-b border-slate-100 flex-none">
          <DialogTitle className="text-2xl text-cyan-900">
            {patient ? `Gerenciar Paciente: ${patient.name}` : 'Novo Paciente'}
          </DialogTitle>
          <DialogDescription>
            Visualize e edite as informações completas do paciente.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <div className="px-6 pt-2 bg-white flex-none">
            <TabsList className="w-full justify-start border-b border-slate-200 rounded-none h-auto p-0 bg-transparent gap-6">
              <TabsTrigger
                value="personal"
                className="data-[state=active]:border-cyan-900 data-[state=active]:text-cyan-900 border-b-2 border-transparent rounded-none px-2 py-3"
              >
                Dados Pessoais
              </TabsTrigger>
              <TabsTrigger
                value="payment"
                className="data-[state=active]:border-cyan-900 data-[state=active]:text-cyan-900 border-b-2 border-transparent rounded-none px-2 py-3"
              >
                Pagamento
              </TabsTrigger>
              <TabsTrigger
                value="scheduling"
                className="data-[state=active]:border-cyan-900 data-[state=active]:text-cyan-900 border-b-2 border-transparent rounded-none px-2 py-3"
              >
                Agendamentos
              </TabsTrigger>
              <TabsTrigger
                value="clinical"
                className="data-[state=active]:border-cyan-900 data-[state=active]:text-cyan-900 border-b-2 border-transparent rounded-none px-2 py-3"
              >
                Clínico
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="data-[state=active]:border-cyan-900 data-[state=active]:text-cyan-900 border-b-2 border-transparent rounded-none px-2 py-3"
              >
                Histórico
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1 p-6">
            <TabsContent value="personal" className="mt-0 outline-none">
              <PersonalTab
                formData={formData}
                onChange={handleChange}
                onAddressChange={handleAddressChange}
              />
            </TabsContent>
            <TabsContent value="payment" className="mt-0 outline-none">
              <PaymentTab
                formData={formData}
                onChange={handlePaymentChange}
                copyFromPersonal={() => {
                  handlePaymentChange('document', formData.cpf || '')
                  handlePaymentChange('businessName', formData.name || '')
                }}
              />
            </TabsContent>
            <TabsContent value="scheduling" className="mt-0 outline-none">
              <div className="bg-white p-6 rounded-xl border border-slate-100">
                <h3 className="text-lg font-semibold text-cyan-900 mb-4">Sessões do Paciente</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                    <p className="text-sm text-slate-500 mb-1">Última sessão</p>
                    <p className="font-medium text-slate-800">
                      {formData.lastSession || 'Nenhuma'}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                    <p className="text-sm text-slate-500 mb-1">Próxima sessão</p>
                    <p className="font-medium text-cyan-900">
                      {formData.nextSession || 'Não agendada'}
                    </p>
                  </div>
                </div>
                <div className="p-8 border border-dashed border-slate-200 rounded-lg text-center text-slate-400">
                  Integração com a agenda em breve.
                </div>
              </div>
            </TabsContent>
            <TabsContent value="clinical" className="mt-0 outline-none">
              <ClinicalTab formData={formData} onChange={handleChange} />
            </TabsContent>
            <TabsContent value="history" className="mt-0 outline-none">
              <HistoryTab patient={formData} />
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <DialogFooter className="p-6 bg-white border-t border-slate-100 flex-none">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-cyan-900 hover:bg-cyan-800 text-white">
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
