import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { CalendarDays, ChevronRight } from 'lucide-react'
import type { Patient } from '@/lib/mock-data'

interface PatientCardProps {
  patient: Patient
  onViewRecord: (patient: Patient) => void
}

export function PatientCard({ patient, onViewRecord }: PatientCardProps) {
  const initials = patient.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()

  return (
    <Card className="hover-card-effect border-transparent shadow-sm flex flex-col h-full">
      <CardContent className="p-5 flex-1">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-12 w-12 border-2 border-primary/10">
            <AvatarImage src={patient.avatarUrl} alt={patient.name} />
            <AvatarFallback className="bg-primary/5 text-primary font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-slate-800 leading-tight">{patient.name}</h3>
            <span className="text-sm text-slate-500">{patient.age} anos</span>
          </div>
        </div>

        <div className="space-y-2 mt-4 text-sm">
          <div className="flex items-center justify-between text-slate-600">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 text-slate-400" />
              Última sessão
            </span>
            <span className="font-medium">{patient.lastSession}</span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 text-slate-400" />
              Próxima sessão
            </span>
            <span className="font-medium text-primary">{patient.nextSession}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 mt-auto">
        <Button
          variant="outline"
          className="w-full justify-between text-slate-600 hover:text-primary hover:border-primary/30 group transition-colors"
          onClick={() => onViewRecord(patient)}
        >
          Ver prontuário
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-slate-400 group-hover:text-primary" />
        </Button>
      </CardFooter>
    </Card>
  )
}
