import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Play } from 'lucide-react'
import type { Patient } from '@/lib/mock-data'
import { toast } from '@/hooks/use-toast'

interface NewSessionDialogProps {
  isOpen: boolean
  onClose: () => void
  patients: Patient[]
}

export function NewSessionDialog({ isOpen, onClose, patients }: NewSessionDialogProps) {
  const [selectedPatientId, setSelectedPatientId] = useState<string>('')

  const handleStart = () => {
    if (!selectedPatientId) {
      toast({
        title: 'Atenção',
        description: 'Selecione um paciente para iniciar a sessão.',
        variant: 'destructive',
      })
      return
    }

    const patient = patients.find((p) => p.id === selectedPatientId)

    toast({
      title: 'Sessão Iniciada',
      description: `Sessão com ${patient?.name} em andamento.`,
    })

    // Reset and close
    setSelectedPatientId('')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl text-primary">Iniciar Nova Sessão</DialogTitle>
          <DialogDescription>
            Selecione o paciente abaixo para começar o registro do atendimento.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um paciente..." />
            </SelectTrigger>
            <SelectContent>
              {patients.map((patient) => (
                <SelectItem key={patient.id} value={patient.id}>
                  {patient.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter className="sm:justify-end">
          <Button variant="ghost" onClick={onClose} className="text-slate-500">
            Cancelar
          </Button>
          <Button onClick={handleStart} className="gap-2" disabled={!selectedPatientId}>
            <Play className="w-4 h-4 fill-current" />
            Iniciar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
