import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Activity, Pill, Stethoscope, StickyNote } from 'lucide-react'
import type { Patient } from '@/lib/mock-data'

interface PatientRecordSheetProps {
  patient: Patient | null
  isOpen: boolean
  onClose: () => void
}

export function PatientRecordSheet({ patient, isOpen, onClose }: PatientRecordSheetProps) {
  if (!patient) return null

  const initials = patient.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md border-l overflow-y-auto custom-scrollbar">
        <SheetHeader className="mb-6">
          <div className="flex items-center gap-4 pt-4">
            <Avatar className="h-16 w-16 border-2 border-primary/10">
              <AvatarImage src={patient.avatarUrl} alt={patient.name} />
              <AvatarFallback className="bg-primary/5 text-primary text-xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle className="text-2xl text-slate-800">{patient.name}</SheetTitle>
              <SheetDescription className="text-base text-slate-500">
                {patient.age} anos • ID: #{patient.id.padStart(4, '0')}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6 text-slate-700">
          <section>
            <div className="flex items-center gap-2 mb-2 text-primary font-semibold">
              <Activity className="w-5 h-5" />
              Queixa Principal
            </div>
            <p className="bg-slate-50 p-4 rounded-lg text-sm border border-slate-100">
              {patient.complaint}
            </p>
          </section>

          <Separator className="bg-slate-100" />

          <section>
            <div className="flex items-center gap-2 mb-2 text-primary font-semibold">
              <Stethoscope className="w-5 h-5" />
              Histórico Breve
            </div>
            <p className="bg-slate-50 p-4 rounded-lg text-sm border border-slate-100 leading-relaxed">
              {patient.history}
            </p>
          </section>

          <Separator className="bg-slate-100" />

          <section>
            <div className="flex items-center gap-2 mb-2 text-primary font-semibold">
              <Pill className="w-5 h-5" />
              Medicamentos em uso
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {patient.meds.split(',').map((med) => (
                <Badge
                  key={med}
                  variant="secondary"
                  className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                >
                  {med.trim()}
                </Badge>
              ))}
            </div>
          </section>

          <Separator className="bg-slate-100" />

          <section>
            <div className="flex items-center gap-2 mb-2 text-primary font-semibold">
              <StickyNote className="w-5 h-5" />
              Anotações Rápidas (Última Sessão)
            </div>
            <p className="bg-yellow-50 p-4 rounded-lg text-sm border border-yellow-100 italic text-slate-700">
              "{patient.notes}"
            </p>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  )
}
