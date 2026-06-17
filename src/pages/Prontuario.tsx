import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Mic, Sparkles, FileText, Activity, Save, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from 'sonner'
import {
  getPatient,
  getEvolutions,
  createEvolution,
  updateEvolution,
  getAnamnesis,
  saveAnamnesis,
  analyzeEvolution,
  type Patient,
  type Evolution,
  type Anamnesis,
} from '@/services/clinical'

export default function Prontuario() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [patient, setPatient] = useState<Patient | null>(null)

  // Evolutions
  const [evolutions, setEvolutions] = useState<Evolution[]>([])
  const [selectedEv, setSelectedEv] = useState<Partial<Evolution>>({
    date: new Date().toISOString().split('T')[0],
    chief_complaint: '',
    development: '',
    action_plan: '',
    ai_analysis: '',
    is_signed: false,
  })
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Anamnesis
  const [anamnese, setAnamnese] = useState<Partial<Anamnesis>>({
    template_type: 'TCC',
    content: {},
  })

  useEffect(() => {
    if (!id) return
    getPatient(id)
      .then(setPatient)
      .catch(() => navigate('/pacientes'))
    loadEvolutions()
    loadAnamnesis()
  }, [id])

  const loadEvolutions = () => {
    if (!id) return
    getEvolutions(id).then(setEvolutions)
  }

  const loadAnamnesis = () => {
    if (!id) return
    getAnamnesis(id).then((res) => {
      if (res) setAnamnese(res)
    })
  }

  const handleSaveEv = async () => {
    if (!id) return
    try {
      const payload = { ...selectedEv, patient_id: id }
      if (selectedEv.id) {
        await updateEvolution(selectedEv.id, payload)
      } else {
        await createEvolution(payload)
      }
      toast.success('Evolução salva com sucesso!')
      loadEvolutions()
      if (!selectedEv.id) {
        setSelectedEv({
          date: new Date().toISOString().split('T')[0],
          chief_complaint: '',
          development: '',
          action_plan: '',
          ai_analysis: '',
          is_signed: false,
        })
      }
    } catch (e) {
      toast.error('Erro ao salvar evolução')
    }
  }

  const handleSimulateMic = () => {
    setSelectedEv((prev) => ({
      ...prev,
      development:
        (prev.development ? prev.development + ' ' : '') +
        'Paciente relata aumento de ansiedade durante a semana. Menciona dificuldade para dormir e pensamentos acelerados no trabalho.',
    }))
  }

  const handleAnalyze = async () => {
    if (!selectedEv.development) {
      toast.error('Preencha o desenvolvimento para analisar.')
      return
    }
    setIsAnalyzing(true)
    try {
      const res = await analyzeEvolution(selectedEv.development)
      setSelectedEv((prev) => ({ ...prev, ai_analysis: res.analysis }))
      toast.success('Análise concluída.')
    } catch (e) {
      toast.error('Erro ao gerar análise.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleSaveAnamnese = async () => {
    if (!id) return
    try {
      await saveAnamnesis({ ...anamnese, patient_id: id })
      toast.success('Anamnese salva!')
      loadAnamnesis()
    } catch (e) {
      toast.error('Erro ao salvar anamnese.')
    }
  }

  if (!patient) return null

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 animate-in fade-in duration-500">
      <header className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/pacientes')}
          className="text-slate-500"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-cyan-900 flex items-center gap-2">
            Prontuário Digital: {patient.name}
          </h1>
          <p className="text-slate-500 text-sm">
            {patient.age} anos • Status: {patient.status}
          </p>
        </div>
      </header>

      <Tabs defaultValue="evolucoes" className="w-full">
        <TabsList className="bg-white border border-slate-100 p-1 rounded-lg w-full justify-start h-auto flex-wrap">
          <TabsTrigger
            value="evolucoes"
            className="data-[state=active]:bg-cyan-50 data-[state=active]:text-cyan-900"
          >
            <Activity className="w-4 h-4 mr-2" />
            Evoluções
          </TabsTrigger>
          <TabsTrigger
            value="anamnese"
            className="data-[state=active]:bg-cyan-50 data-[state=active]:text-cyan-900"
          >
            <FileText className="w-4 h-4 mr-2" />
            Anamnese
          </TabsTrigger>
          <TabsTrigger
            value="documentos"
            className="data-[state=active]:bg-cyan-50 data-[state=active]:text-cyan-900"
            disabled
          >
            Documentos
          </TabsTrigger>
          <TabsTrigger
            value="escalas"
            className="data-[state=active]:bg-cyan-50 data-[state=active]:text-cyan-900"
            disabled
          >
            Escalas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="evolucoes" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
              <Button
                onClick={() =>
                  setSelectedEv({
                    date: new Date().toISOString().split('T')[0],
                    chief_complaint: '',
                    development: '',
                    action_plan: '',
                    ai_analysis: '',
                    is_signed: false,
                  })
                }
                className="w-full bg-cyan-900 hover:bg-cyan-800 text-white"
              >
                Nova Evolução
              </Button>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-3">
                  {evolutions.map((ev) => (
                    <Card
                      key={ev.id}
                      className={`cursor-pointer transition-colors ${selectedEv.id === ev.id ? 'border-cyan-500 bg-cyan-50' : 'hover:bg-slate-50'}`}
                      onClick={() => setSelectedEv(ev)}
                    >
                      <CardContent className="p-4">
                        <div className="font-semibold text-cyan-900 flex justify-between items-center">
                          {new Date(ev.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                          {ev.is_signed && <Check className="w-4 h-4 text-green-600" />}
                        </div>
                        <div className="text-sm text-slate-600 mt-1 line-clamp-2">
                          {ev.chief_complaint || 'Sem queixa registrada'}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {evolutions.length === 0 && (
                    <p className="text-sm text-slate-500 text-center py-4">
                      Nenhuma evolução encontrada.
                    </p>
                  )}
                </div>
              </ScrollArea>
            </div>

            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Data da Sessão</Label>
                      <Input
                        type="date"
                        value={selectedEv.date?.substring(0, 10) || ''}
                        onChange={(e) => setSelectedEv({ ...selectedEv, date: e.target.value })}
                        disabled={selectedEv.is_signed}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Queixa Principal</Label>
                      <Input
                        placeholder="Resumo da queixa"
                        value={selectedEv.chief_complaint || ''}
                        onChange={(e) =>
                          setSelectedEv({ ...selectedEv, chief_complaint: e.target.value })
                        }
                        disabled={selectedEv.is_signed}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 relative">
                    <div className="flex justify-between items-center">
                      <Label>Desenvolvimento da Sessão</Label>
                      {!selectedEv.is_signed && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleSimulateMic}
                          className="text-cyan-600 hover:text-cyan-800 hover:bg-cyan-50"
                          title="Simular Ditado"
                        >
                          <Mic className="w-4 h-4 mr-1" /> Ditado
                        </Button>
                      )}
                    </div>
                    <Textarea
                      className="min-h-[120px] bg-white"
                      placeholder="Anotações clínicas da sessão..."
                      value={selectedEv.development || ''}
                      onChange={(e) =>
                        setSelectedEv({ ...selectedEv, development: e.target.value })
                      }
                      disabled={selectedEv.is_signed}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Plano de Ação</Label>
                    <Textarea
                      className="min-h-[80px]"
                      placeholder="Intervenções, tarefas de casa..."
                      value={selectedEv.action_plan || ''}
                      onChange={(e) =>
                        setSelectedEv({ ...selectedEv, action_plan: e.target.value })
                      }
                      disabled={selectedEv.is_signed}
                    />
                  </div>

                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-cyan-900 font-semibold flex items-center gap-2">
                        <Sparkles className="w-4 h-4" /> Análise de IA
                      </Label>
                      {!selectedEv.is_signed && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleAnalyze}
                          disabled={isAnalyzing || !selectedEv.development}
                        >
                          {isAnalyzing ? 'Analisando...' : 'Gerar Análise'}
                        </Button>
                      )}
                    </div>
                    <Textarea
                      className="min-h-[100px] bg-white border-slate-200"
                      placeholder="Insights gerados pela IA aparecerão aqui."
                      value={selectedEv.ai_analysis || ''}
                      onChange={(e) =>
                        setSelectedEv({ ...selectedEv, ai_analysis: e.target.value })
                      }
                      disabled={selectedEv.is_signed}
                    />
                    <p className="text-[11px] text-slate-500 italic mt-2">
                      Esta análise é gerada por IA e não substitui julgamento clínico. O
                      profissional é responsável por todas as decisões terapêuticas.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sign"
                        checked={selectedEv.is_signed}
                        onCheckedChange={(checked) =>
                          setSelectedEv({ ...selectedEv, is_signed: !!checked })
                        }
                        disabled={selectedEv.is_signed && !!selectedEv.id}
                      />
                      <Label
                        htmlFor="sign"
                        className="text-sm font-medium text-slate-700 cursor-pointer"
                      >
                        Assinatura Digital (Finalizar Evolução)
                      </Label>
                    </div>
                    {!selectedEv.is_signed || !selectedEv.id ? (
                      <Button onClick={handleSaveEv} className="bg-cyan-900 hover:bg-cyan-800">
                        <Save className="w-4 h-4 mr-2" /> Salvar
                      </Button>
                    ) : (
                      <Badge variant="secondary" className="bg-slate-100 text-slate-600 px-3 py-1">
                        Evolução Bloqueada
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="anamnese" className="mt-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <Label className="text-base">Abordagem Clínica:</Label>
                <Select
                  value={anamnese.template_type}
                  onValueChange={(val) => setAnamnese({ ...anamnese, template_type: val })}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TCC">TCC</SelectItem>
                    <SelectItem value="Psicanálise">Psicanálise</SelectItem>
                    <SelectItem value="Humanista">Humanista</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4 pt-4 border-t">
                {anamnese.template_type === 'TCC' && (
                  <>
                    <div className="space-y-2">
                      <Label>Histórico do Problema</Label>
                      <Textarea
                        className="min-h-[100px]"
                        value={anamnese.content?.historico || ''}
                        onChange={(e) =>
                          setAnamnese({
                            ...anamnese,
                            content: { ...anamnese.content, historico: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Crenças Centrais Identificadas</Label>
                      <Textarea
                        className="min-h-[100px]"
                        value={anamnese.content?.crencas || ''}
                        onChange={(e) =>
                          setAnamnese({
                            ...anamnese,
                            content: { ...anamnese.content, crencas: e.target.value },
                          })
                        }
                      />
                    </div>
                  </>
                )}
                {anamnese.template_type === 'Psicanálise' && (
                  <>
                    <div className="space-y-2">
                      <Label>Dinâmica Familiar</Label>
                      <Textarea
                        className="min-h-[100px]"
                        value={anamnese.content?.dinamica || ''}
                        onChange={(e) =>
                          setAnamnese({
                            ...anamnese,
                            content: { ...anamnese.content, dinamica: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Associações e Sonhos</Label>
                      <Textarea
                        className="min-h-[100px]"
                        value={anamnese.content?.sonhos || ''}
                        onChange={(e) =>
                          setAnamnese({
                            ...anamnese,
                            content: { ...anamnese.content, sonhos: e.target.value },
                          })
                        }
                      />
                    </div>
                  </>
                )}
                {anamnese.template_type === 'Humanista' && (
                  <>
                    <div className="space-y-2">
                      <Label>Visão de Mundo e Relações</Label>
                      <Textarea
                        className="min-h-[100px]"
                        value={anamnese.content?.visao || ''}
                        onChange={(e) =>
                          setAnamnese({
                            ...anamnese,
                            content: { ...anamnese.content, visao: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Sentido de Vida e Valores</Label>
                      <Textarea
                        className="min-h-[100px]"
                        value={anamnese.content?.valores || ''}
                        onChange={(e) =>
                          setAnamnese({
                            ...anamnese,
                            content: { ...anamnese.content, valores: e.target.value },
                          })
                        }
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="flex justify-end pt-4">
                <Button onClick={handleSaveAnamnese} className="bg-cyan-900 hover:bg-cyan-800">
                  <Save className="w-4 h-4 mr-2" /> Salvar Anamnese
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
