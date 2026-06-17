import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  DollarSign,
  Settings,
  BrainCircuit,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/pacientes', icon: Users, label: 'Pacientes' },
  { href: '/agenda', icon: CalendarDays, label: 'Agenda' },
  { href: '/financeiro', icon: DollarSign, label: 'Financeiro' },
  { href: '/configuracoes', icon: Settings, label: 'Configurações' },
]

export default function Layout() {
  const location = useLocation()

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-white flex-shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight">
            <BrainCircuit className="h-6 w-6" />
            <span>PsicoGestão</span>
          </div>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium group relative',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900',
                )}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full" />
                )}
                <item.icon
                  className={cn(
                    'h-5 w-5',
                    isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600',
                  )}
                />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
              DR
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-900">Dr. Rafael</span>
              <span className="text-xs text-slate-500">Psicólogo Clínico</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden pb-16 md:pb-0 relative">
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full h-16 bg-white border-t flex items-center justify-around z-40 pb-safe">
        {navItems.slice(0, 4).map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex flex-col items-center justify-center w-full h-full gap-1 transition-colors',
                isActive ? 'text-primary' : 'text-slate-400',
              )}
            >
              <item.icon className={cn('h-5 w-5', isActive && 'fill-primary/20')} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
