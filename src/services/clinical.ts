import pb from '@/lib/pocketbase/client'

export interface Patient {
  id: string
  name: string
  age: number
  status: string
  email: string
  phone: string
  created?: string
}

export interface Evolution {
  id: string
  patient_id: string
  date: string
  chief_complaint: string
  development: string
  action_plan: string
  ai_analysis: string
  is_signed: boolean
}

export interface Anamnesis {
  id: string
  patient_id: string
  template_type: string
  content: any
}

export const getPatients = () =>
  pb.collection('patients').getFullList<Patient>({ sort: '-created' })
export const getPatient = (id: string) => pb.collection('patients').getOne<Patient>(id)

export const getEvolutions = (patientId: string) =>
  pb
    .collection('evolutions')
    .getFullList<Evolution>({ filter: `patient_id = "${patientId}"`, sort: '-date' })
export const createEvolution = (data: Partial<Evolution>) =>
  pb.collection('evolutions').create<Evolution>({ ...data, user_id: pb.authStore.model?.id })
export const updateEvolution = (id: string, data: Partial<Evolution>) =>
  pb.collection('evolutions').update<Evolution>(id, data)

export const getAnamnesis = (patientId: string) =>
  pb
    .collection('anamnesis')
    .getFirstListItem<Anamnesis>(`patient_id = "${patientId}"`)
    .catch(() => null)
export const saveAnamnesis = (data: Partial<Anamnesis>) => {
  const payload = { ...data, user_id: pb.authStore.model?.id }
  if (data.id) return pb.collection('anamnesis').update<Anamnesis>(data.id, payload)
  return pb.collection('anamnesis').create<Anamnesis>(payload)
}

export const analyzeEvolution = (development: string) =>
  pb.send<{ analysis: string }>('/backend/v1/analyze-evolution', {
    method: 'POST',
    body: JSON.stringify({ development }),
    headers: { 'Content-Type': 'application/json' },
  })
