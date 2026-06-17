export type Patient = {
  id: string
  name: string
  age: number
  birthDate?: string
  status: 'Ativo' | 'Inativo'
  cpf?: string
  email?: string
  phone?: string
  address?: {
    cep: string
    street: string
    number: string
    neighborhood: string
    city: string
    state: string
  }
  emergencyContact?: string
  legalGuardian?: string
  paymentData?: {
    document: string
    businessName: string
  }
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
    status: 'Ativo',
    cpf: '123.456.789-00',
    email: 'ana.silva@email.com',
    phone: '(11) 98765-4321',
    address: {
      cep: '01001-000',
      street: 'Praça da Sé',
      number: '12',
      neighborhood: 'Sé',
      city: 'São Paulo',
      state: 'SP',
    },
    emergencyContact: 'Marcos Silva (11) 91234-5678',
    lastSession: '17 de Out',
    nextSession: '24 de Out',
    complaint: 'Ansiedade generalizada e estresse ocupacional',
    history:
      'Paciente relata melhora nas crises após iniciar medicação e rotina de técnicas de respiração.',
    meds: 'Sertralina 50mg/dia',
    notes:
      'Focar em mapeamento de gatilhos no ambiente corporativo e práticas de mindfulness estruturado.',
    avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=12',
  },
  {
    id: '2',
    name: 'Carlos Mendes',
    age: 45,
    status: 'Ativo',
    cpf: '234.567.890-11',
    email: 'carlos.mendes@email.com',
    phone: '(21) 97654-3210',
    address: {
      cep: '20040-002',
      street: 'Avenida Rio Branco',
      number: '156',
      neighborhood: 'Centro',
      city: 'Rio de Janeiro',
      state: 'RJ',
    },
    emergencyContact: 'Julia Mendes (21) 98765-4321',
    lastSession: '20 de Out',
    nextSession: '27 de Out',
    complaint: 'Sintomas depressivos e insônia',
    history: 'Relata dificuldade crônica para dormir e falta de energia durante o dia.',
    meds: 'Zolpidem 10mg (SOS), Escitalopram 10mg',
    notes: 'Trabalhar higiene do sono e ativação comportamental progressiva.',
    avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=45',
  },
  {
    id: '3',
    name: 'Juliana Costa',
    age: 28,
    status: 'Ativo',
    cpf: '345.678.901-22',
    email: 'juliana.costa@email.com',
    phone: '(31) 96543-2109',
    address: {
      cep: '30130-002',
      street: 'Avenida Afonso Pena',
      number: '1500',
      neighborhood: 'Centro',
      city: 'Belo Horizonte',
      state: 'MG',
    },
    emergencyContact: 'Roberto Costa (31) 95432-1098',
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
    status: 'Inativo',
    cpf: '456.789.012-33',
    email: 'roberto.alves@email.com',
    phone: '(41) 95432-1098',
    address: {
      cep: '80020-000',
      street: 'Rua XV de Novembro',
      number: '100',
      neighborhood: 'Centro',
      city: 'Curitiba',
      state: 'PR',
    },
    emergencyContact: 'Ana Alves (41) 94321-0987',
    lastSession: '10 de Out',
    nextSession: '-',
    complaint: 'Burnout, desmotivação profissional',
    history:
      'Afastamento médico do trabalho há 30 dias. Sentimentos de culpa e inutilidade intensos.',
    meds: 'Desvenlafaxina 50mg',
    notes: 'Paciente solicitou pausa no tratamento por motivos financeiros.',
    avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=15',
  },
  {
    id: '5',
    name: 'Mariana Souza',
    age: 22,
    status: 'Ativo',
    cpf: '567.890.123-44',
    email: 'mariana.souza@email.com',
    phone: '(51) 94321-0987',
    address: {
      cep: '90020-006',
      street: 'Rua dos Andradas',
      number: '1234',
      neighborhood: 'Centro Histórico',
      city: 'Porto Alegre',
      state: 'RS',
    },
    emergencyContact: 'Pedro Souza (51) 93210-9876',
    lastSession: '02 de Out',
    nextSession: '29 de Out',
    complaint: 'TDAH, dificuldades acadêmicas',
    history:
      'Dificuldade extrema em concluir o TCC. Procrastinação severa gerando ansiedade secundária.',
    meds: 'Venvanse 30mg',
    notes: 'Técnicas de Pomodoro adaptadas e quebra de grandes tarefas em micro-objetivos.',
    avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=33',
  },
  {
    id: '6',
    name: 'Lucas Ferreira',
    age: 14,
    status: 'Ativo',
    cpf: '678.901.234-55',
    email: 'lucas.familia@email.com',
    phone: '(61) 93210-9876',
    address: {
      cep: '70040-010',
      street: 'Esplanada dos Ministérios',
      number: 'S/N',
      neighborhood: 'Zona Cívico-Administrativa',
      city: 'Brasília',
      state: 'DF',
    },
    emergencyContact: 'Mãe: Claudia Ferreira (61) 98888-7777',
    legalGuardian: 'Claudia Ferreira (Mãe)',
    lastSession: '18 de Out',
    nextSession: '25 de Out',
    complaint: 'Bullying escolar e isolamento social',
    history:
      'Paciente apresenta retraimento após mudança de escola. Dificuldade de verbalizar sentimentos.',
    meds: 'Nenhum',
    notes:
      'Usar recursos lúdicos e jogos terapêuticos para facilitar a expressão. Marcar devolutiva com a mãe.',
    avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=66',
  },
  {
    id: '7',
    name: 'Beatriz Lima',
    age: 16,
    status: 'Ativo',
    cpf: '789.012.345-66',
    email: 'bia.lima@email.com',
    phone: '(71) 92109-8765',
    address: {
      cep: '40020-000',
      street: 'Praça Castro Alves',
      number: '10',
      neighborhood: 'Centro',
      city: 'Salvador',
      state: 'BA',
    },
    emergencyContact: 'Pai: Ricardo Lima (71) 97777-6666',
    legalGuardian: 'Ricardo Lima (Pai)',
    lastSession: '19 de Out',
    nextSession: '26 de Out',
    complaint: 'Ansiedade pré-vestibular e pressão familiar',
    history: 'Expectativas irreais sobre o próprio desempenho. Crises de choro antes de simulados.',
    meds: 'Nenhum',
    notes: 'Trabalhar expectativas e técnicas de regulação emocional para momentos de prova.',
    avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=77',
  },
  {
    id: '8',
    name: 'Fernando Gomes',
    age: 39,
    status: 'Inativo',
    cpf: '890.123.456-77',
    email: 'fernando.gomes@email.com',
    phone: '(81) 91098-7654',
    address: {
      cep: '50030-230',
      street: 'Avenida Conde da Boa Vista',
      number: '50',
      neighborhood: 'Boa Vista',
      city: 'Recife',
      state: 'PE',
    },
    emergencyContact: 'Esposa: Camila Gomes (81) 96666-5555',
    lastSession: '05 de Set',
    nextSession: '-',
    complaint: 'Luto não elaborado',
    history:
      'Perda recente do pai. Sentimentos de negação e episódios de raiva no ambiente familiar.',
    meds: 'Clonazepam 5mg',
    notes: 'Paciente recebeu alta após 6 meses de acompanhamento.',
    avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=88',
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
