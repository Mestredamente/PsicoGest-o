import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Video, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Session } from '@/lib/mock-data'

export function SessionCard({ session }: { session: Session }) {
  const statusColors = {
    Confirmado: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200',
    Pendente: 'bg-amber-100 text-amber-800 hover:bg-amber-200',
    Cancelado: 'bg-rose-100 text-rose-800 hover:bg-rose-200',
  }

  return (
    <Card className="hover-card-effect border-transparent shadow-sm">
      <CardContent className="p-5 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="font-semibold text-lg text-slate-800">{session.patientName}</div>
          <Badge
            variant="secondary"
            className={cn('font-medium shadow-none', statusColors[session.status])}
          >
            {session.status}
          </Badge>
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="font-medium text-slate-700">{session.time}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {session.type === 'Online' ? (
              <Video className="w-4 h-4 text-slate-400" />
            ) : (
              <User className="w-4 h-4 text-slate-400" />
            )}
            <span>{session.type}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
