migrate(
  (app) => {
    const patients = new Collection({
      name: 'patients',
      type: 'base',
      listRule: "@request.auth.id != '' && user_id = @request.auth.id",
      viewRule: "@request.auth.id != '' && user_id = @request.auth.id",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != '' && user_id = @request.auth.id",
      deleteRule: "@request.auth.id != '' && user_id = @request.auth.id",
      fields: [
        {
          name: 'user_id',
          type: 'relation',
          required: true,
          collectionId: '_pb_users_auth_',
          cascadeDelete: true,
          maxSelect: 1,
        },
        { name: 'name', type: 'text', required: true },
        { name: 'age', type: 'number' },
        { name: 'status', type: 'select', values: ['Ativo', 'Inativo'], maxSelect: 1 },
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(patients)

    const evolutions = new Collection({
      name: 'evolutions',
      type: 'base',
      listRule: "@request.auth.id != '' && user_id = @request.auth.id",
      viewRule: "@request.auth.id != '' && user_id = @request.auth.id",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != '' && user_id = @request.auth.id",
      deleteRule: "@request.auth.id != '' && user_id = @request.auth.id",
      fields: [
        {
          name: 'user_id',
          type: 'relation',
          required: true,
          collectionId: '_pb_users_auth_',
          cascadeDelete: true,
          maxSelect: 1,
        },
        {
          name: 'patient_id',
          type: 'relation',
          required: true,
          collectionId: patients.id,
          cascadeDelete: true,
          maxSelect: 1,
        },
        { name: 'date', type: 'date', required: true },
        { name: 'chief_complaint', type: 'text' },
        { name: 'development', type: 'text' },
        { name: 'action_plan', type: 'text' },
        { name: 'ai_analysis', type: 'text' },
        { name: 'is_signed', type: 'bool' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(evolutions)

    const anamnesis = new Collection({
      name: 'anamnesis',
      type: 'base',
      listRule: "@request.auth.id != '' && user_id = @request.auth.id",
      viewRule: "@request.auth.id != '' && user_id = @request.auth.id",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != '' && user_id = @request.auth.id",
      deleteRule: "@request.auth.id != '' && user_id = @request.auth.id",
      fields: [
        {
          name: 'user_id',
          type: 'relation',
          required: true,
          collectionId: '_pb_users_auth_',
          cascadeDelete: true,
          maxSelect: 1,
        },
        {
          name: 'patient_id',
          type: 'relation',
          required: true,
          collectionId: patients.id,
          cascadeDelete: true,
          maxSelect: 1,
        },
        {
          name: 'template_type',
          type: 'select',
          values: ['TCC', 'Psicanálise', 'Humanista'],
          maxSelect: 1,
        },
        { name: 'content', type: 'json' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(anamnesis)
  },
  (app) => {
    try {
      app.delete(app.findCollectionByNameOrId('anamnesis'))
    } catch (_) {}
    try {
      app.delete(app.findCollectionByNameOrId('evolutions'))
    } catch (_) {}
    try {
      app.delete(app.findCollectionByNameOrId('patients'))
    } catch (_) {}
  },
)
