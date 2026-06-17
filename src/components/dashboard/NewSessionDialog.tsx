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
import { Play, Check, ChevronsUpDown } from 'lucide-react'
import type { Patient } from '@/lib/mock-data'
import { toast } from '@/hooks/use-toast'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'

interface NewSessionDialogProps {
  isOpen: boolean
  onClose: () => void
  patients: Patient[]
}

export function NewSessionDialog({ isOpen, onClose, patients }: NewSessionDialogProps) {
  const [selectedPatientId, setSelectedPatientId] = useState<string>('')
  const [openCombobox, setOpenCombobox] = useState(false)

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
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setSelectedPatientId('')
          onClose()
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl text-primary">Iniciar Nova Sessão</DialogTitle>
          <DialogDescription>
            Selecione o paciente abaixo para começar o registro do atendimento.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openCombobox}
                className="w-full justify-between font-normal"
              >
                {selectedPatientId
                  ? patients.find((p) => p.id === selectedPatientId)?.name
                  : 'Buscar paciente...'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
              <Command>
                <CommandInput placeholder="Buscar paciente..." />
                <CommandList>
                  <CommandEmpty>Nenhum paciente encontrado.</CommandEmpty>
                  <CommandGroup>
                    {patients.map((patient) => (
                      <CommandItem
                        key={patient.id}
                        value={patient.name}
                        onSelect={() => {
                          setSelectedPatientId(patient.id)
                          setOpenCombobox(false)
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            selectedPatientId === patient.id ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                        {patient.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <DialogFooter className="sm:justify-end">
          <Button
            variant="ghost"
            onClick={() => {
              setSelectedPatientId('')
              onClose()
            }}
            className="text-slate-500"
          >
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
