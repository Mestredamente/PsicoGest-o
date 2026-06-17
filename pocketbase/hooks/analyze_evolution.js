routerAdd(
  'POST',
  '/backend/v1/analyze-evolution',
  (e) => {
    const body = e.requestInfo().body || {}
    if (!body.development) return e.badRequestError('development is required')

    const reply = $ai.chat({
      model: 'fast',
      messages: [
        {
          role: 'system',
          content:
            'Você é um assistente clínico de psicologia. Analise a evolução da sessão a seguir, identifique possíveis distorções cognitivas, mecanismos de defesa e sugira pontos para a próxima sessão. Seja conciso, profissional e use terminologia clínica.',
        },
        { role: 'user', content: body.development },
      ],
    })

    return e.json(200, { analysis: reply.choices[0].message.content })
  },
  $apis.requireAuth(),
)
