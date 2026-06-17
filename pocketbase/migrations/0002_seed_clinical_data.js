migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    let user
    try {
      user = app.findAuthRecordByEmail('_pb_users_auth_', 'mestredamente1@gmail.com')
    } catch (_) {
      user = new Record(users)
      user.setEmail('mestredamente1@gmail.com')
      user.setPassword('Skip@Pass')
      user.setVerified(true)
      user.set('name', 'Psicólogo Admin')
      app.save(user)
    }

    const patients = app.findCollectionByNameOrId('patients')
    let p1, p2
    try {
      p1 = app.findFirstRecordByData('patients', 'email', 'ana.silva@email.com')
    } catch (_) {
      p1 = new Record(patients)
      p1.set('user_id', user.id)
      p1.set('name', 'Ana Silva')
      p1.set('age', 34)
      p1.set('status', 'Ativo')
      p1.set('email', 'ana.silva@email.com')
      p1.set('phone', '(11) 98765-4321')
      app.save(p1)
    }

    try {
      p2 = app.findFirstRecordByData('patients', 'email', 'carlos.mendes@email.com')
    } catch (_) {
      p2 = new Record(patients)
      p2.set('user_id', user.id)
      p2.set('name', 'Carlos Mendes')
      p2.set('age', 45)
      p2.set('status', 'Ativo')
      p2.set('email', 'carlos.mendes@email.com')
      p2.set('phone', '(21) 97654-3210')
      app.save(p2)
    }

    const evolutions = app.findCollectionByNameOrId('evolutions')
    if (app.countRecords('evolutions') === 0) {
      const evs = [
        {
          p: p1.id,
          d: '2026-06-01 10:00:00.000Z',
          q: 'Ansiedade no trabalho',
          dev: 'Paciente relata pico de ansiedade ao apresentar projeto.',
          plan: 'Exercícios de respiração',
          ai: 'Foco em distorções cognitivas de catastrofização.',
        },
        {
          p: p1.id,
          d: '2026-06-08 10:00:00.000Z',
          q: 'Ansiedade generalizada',
          dev: 'Melhora nos sintomas, aplicou técnicas de respiração.',
          plan: 'Manter registro de pensamentos',
          ai: 'Reforço positivo na adesão ao plano de ação.',
        },
        {
          p: p1.id,
          d: '2026-06-15 10:00:00.000Z',
          q: 'Estresse',
          dev: 'Nova sobrecarga. Sentimento de incapacidade.',
          plan: 'Questionamento socrático',
          ai: 'Possível crença central de desamparo ativada.',
        },
        {
          p: p2.id,
          d: '2026-06-02 14:00:00.000Z',
          q: 'Insônia',
          dev: 'Acordando 3x por noite. Pensamentos acelerados.',
          plan: 'Higiene do sono',
          ai: 'Ansiedade antecipatória relacionada ao sono.',
        },
        {
          p: p2.id,
          d: '2026-06-09 14:00:00.000Z',
          q: 'Cansaço',
          dev: 'Conseguiu dormir melhor com higiene do sono.',
          plan: 'Ativação comportamental pela manhã',
          ai: 'Boa resposta à intervenção inicial.',
        },
      ]
      for (const e of evs) {
        const r = new Record(evolutions)
        r.set('user_id', user.id)
        r.set('patient_id', e.p)
        r.set('date', e.d)
        r.set('chief_complaint', e.q)
        r.set('development', e.dev)
        r.set('action_plan', e.plan)
        r.set('ai_analysis', e.ai)
        r.set('is_signed', true)
        app.save(r)
      }
    }
  },
  (app) => {},
)
