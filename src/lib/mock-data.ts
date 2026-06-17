export type Patient = {
  id: string
  name: string
  age: number
  lastSession: string
  nextSession: string
  complaint: string
  history: string
  meds: string
  notes: string
  avatarUrl?: string
}

export type Session = {
  id: string
  patientId: string
  patientName: string
  time: string
  type: 'Presencial' | 'Online'
  status: 'Confirmado' | 'Pendente' | 'Cancelado'
}

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Ana Silva',
    age: 34,
    lastSession: '17 de Out',
    nextSession: '24 de Out',
    complaint: 'Ansiedade generalizada e estresse ocupacional',
    history:
      'Paciente relata melhora nas crises após iniciar medicação e rotina de técnicas de respiração. Ainda apresenta picos de estresse no trabalho.',
    meds: 'Sertralina 50mg/dia',
    notes:
      'Focar em mapeamento de gatilhos no ambiente corporativo e práticas de mindfulness estruturado.',
    avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=12',
  },
  {
    id: '2',
    name: 'Carlos Mendes',
    age: 45,
    lastSession: '20 de Out',
    nextSession: '27 de Out',
    complaint: 'Sintomas depressivos e insônia',
    history:
      'Relata dificuldade crônica para dormir e falta de energia durante o dia. Iniciou acompanhamento psiquiátrico recentemente.',
    meds: 'Zolpidem 10mg (SOS), Escitalopram 10mg',
    notes: 'Trabalhar higiene do sono e ativação comportamental progressiva.',
    avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=45',
  },
  {
    id: '3',
    name: 'Juliana Costa',
    age: 28,
    lastSession: '15 de Out',
    nextSession: 'Hoje',
    complaint: 'Dificuldades em relacionamentos interpessoais',
    history:
      'Apresenta padrão de esquiva emocional. Na última sessão, conseguimos abordar o histórico familiar superficialmente.',
    meds: 'Nenhum',
    notes: 'Aprofundar questões familiares e usar técnicas de role-play para assertividade.',
    avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=88',
  },
  {
    id: '4',
    name: 'Roberto Alves',
    age: 52,
    lastSession: '10 de Out',
    nextSession: 'Hoje',
    complaint: 'Burnout, desmotivação profissional',
    history:
      'Afastamento médico do trabalho há 30 dias. Sentimentos de culpa e inutilidade intensos.',
    meds: 'Desvenlafaxina 50mg',
    notes: 'Reestruturação cognitiva sobre o papel do trabalho na identidade.',
    avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=15',
  },
  {
    id: '5',
    name: 'Mariana Souza',
    age: 22,
    lastSession: '02 de Out',
    nextSession: '29 de Out',
    complaint: 'TDAH, dificuldades acadêmicas',
    history:
      'Dificuldade extrema em concluir o TCC. Procrastinação severa gerando ansiedade secundária.',
    meds: 'Venvanse 30mg',
    notes: 'Técnicas de Pomodoro adaptadas e quebra de grandes tarefas em micro-objetivos.',
    avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=33',
  },
]

export const mockSessions: Session[] = [
  {
    id: 's1',
    patientId: '3',
    patientName: 'Juliana Costa',
    time: '14:00',
    type: 'Presencial',
    status: 'Confirmado',
  },
  {
    id: 's2',
    patientId: '4',
    patientName: 'Roberto Alves',
    time: '15:30',
    type: 'Online',
    status: 'Pendente',
  },
  {
    id: 's3',
    patientId: '2',
    patientName: 'Carlos Mendes',
    time: '17:00',
    type: 'Online',
    status: 'Cancelado',
  },
]
