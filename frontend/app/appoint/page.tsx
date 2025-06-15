"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Phone, MessageSquare, RotateCcw, User, Scissors, Building2, X, Check, Star } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"


function formatDate(dateStr: string) {
  if (!dateStr) return ""
  const [year, month, day] = dateStr.split("-")
  return `${day}/${month}/${year}`
}

function getStatusLabel(status: string) {
  switch (status) {
    case "pending":
      return "Pendente"
    case "confirmed":
      return "Confirmado"
    case "completed":
      return "Concluído"
    case "cancelled":
      return "Cancelado"
    case "rescheduled":
      return "Reagendado"
    default:
      return status
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "confirmed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "completed":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "cancelled":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    case "rescheduled":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }
}

export default function AppointmentsPage() {
  const router = useRouter()
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState("upcoming")
  const [rescheduleModal, setRescheduleModal] = useState<{ open: boolean, appointment: any | null }>({ open: false, appointment: null })
  const [newDate, setNewDate] = useState("")
  const [newTime, setNewTime] = useState("")
  const [rescheduling, setRescheduling] = useState(false)

  // Avaliação
  const [rateModal, setRateModal] = useState<{ open: boolean, appointment: any | null }>({ open: false, appointment: null })
  const [rateValue, setRateValue] = useState(5)
  const [rateComment, setRateComment] = useState("")
  const [ratingLoading, setRatingLoading] = useState(false)

  useEffect(() => {
    async function fetchAppointments() {
      setLoading(true)
      try {
        const token = localStorage.getItem("token")
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedules/client`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        setAppointments(Array.isArray(data) ? data : data.appointments || [])
      } catch {
        setAppointments([])
      } finally {
        setLoading(false)
      }
    }
    fetchAppointments()
  }, [])

  // Lógica para separar agendamentos futuros e históricos
  const now = new Date()
  const upcomingAppointments = appointments.filter((a: any) => {
    const date = new Date(`${a.date}T${a.time}`)
    return date >= now && a.status !== "cancelled"
  })
  const historyAppointments = appointments.filter((a: any) => {
    const date = new Date(`${a.date}T${a.time}`)
    return date < now || a.status === "cancelled" || a.status === "completed"
  })

  // Lógica para exibir telefone/endereço
  function renderContactInfo(appointment: any) {
    if (appointment.salonId) {
      // Salão
      return (
        <div className="flex flex-col md:flex-row md:items-center gap-2 mt-3">
          <div className="flex items-center gap-2 bg-[#FF96B2]/10 dark:bg-[#FF96B2]/10 px-3 py-2 rounded-lg">
            <Building2 className="w-4 h-4 text-[#FF96B2]" />
            <span className="font-medium text-[#313131] dark:text-white">{appointment.salonName}</span>
          </div>
          {appointment.salonAddress && (
            <div className="flex items-center gap-2 bg-[#f3f4f6] dark:bg-[#232326] px-3 py-2 rounded-lg">
              <MapPin className="w-4 h-4 text-[#FF96B2]" />
              <span className="text-sm text-[#313131]/80 dark:text-white/80">{appointment.salonAddress}</span>
            </div>
          )}
          {appointment.salonPhone && (
            <div className="flex items-center gap-2 bg-[#f3f4f6] dark:bg-[#232326] px-3 py-2 rounded-lg">
              <Phone className="w-4 h-4 text-[#FF96B2]" />
              <a href={`tel:${appointment.salonPhone}`} className="underline text-sm text-[#313131]/80 dark:text-white/80">{appointment.salonPhone}</a>
            </div>
          )}
        </div>
      )
    }
    // Autônomo
    return (
      <div className="flex flex-col md:flex-row md:items-center gap-2 mt-3">
        {appointment.professionalLocation && (
          <div className="flex items-center gap-2 bg-[#FF96B2]/10 dark:bg-[#FF96B2]/10 px-3 py-2 rounded-lg">
            <MapPin className="w-4 h-4 text-[#FF96B2]" />
            <span className="text-sm text-[#313131]/80 dark:text-white/80">{appointment.professionalLocation}</span>
          </div>
        )}
        {appointment.professionalPhone && (
          <div className="flex items-center gap-2 bg-[#f3f4f6] dark:bg-[#232326] px-3 py-2 rounded-lg">
            <Phone className="w-4 h-4 text-[#FF96B2]" />
            <a href={`tel:${appointment.professionalPhone}`} className="underline text-sm text-[#313131]/80 dark:text-white/80">{appointment.professionalPhone}</a>
            <Button
              size="icon"
              variant="ghost"
              className="ml-1"
              onClick={() =>
                window.open(
                  `https://wa.me/55${appointment.professionalPhone.replace(/\D/g, "")}`,
                  "_blank"
                )
              }
            >
              <MessageSquare className="w-4 h-4 text-green-500" />
            </Button>
          </div>
        )}
      </div>
    )
  }

  // Modal de reagendamento
  function openRescheduleModal(appointment: any) {
    setRescheduleModal({ open: true, appointment })
    setNewDate(appointment.date)
    setNewTime(appointment.time)
  }

  async function handleReschedule() {
    if (!newDate || !newTime) {
      alert("Preencha a nova data e horário!")
      return
    }
    setRescheduling(true)
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedules/appointment/${rescheduleModal.appointment.id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "rescheduled", newDate, newTime }),
      })
      if (!res.ok) throw new Error("Erro ao remarcar agendamento")
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === rescheduleModal.appointment.id
            ? { ...a, date: newDate, time: newTime, status: "rescheduled" }
            : a
        )
      )
      setRescheduleModal({ open: false, appointment: null })
    } catch (e) {
      alert("Erro ao remarcar agendamento")
    } finally {
      setRescheduling(false)
    }
  }

  // Modal de avaliação
  function openRateModal(appointment: any) {
    setRateModal({ open: true, appointment })
    setRateValue(5)
    setRateComment("")
  }

  async function handleRate() {
    if (!rateValue) {
      alert("Escolha uma nota!")
      return
    }
    setRatingLoading(true)
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedules/appointment/${rateModal.appointment.id}/rate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating: rateValue, review: rateComment }),
      })
      if (!res.ok) throw new Error("Erro ao enviar avaliação")
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === rateModal.appointment.id
            ? { ...a, rating: rateValue, review: rateComment }
            : a
        )
      )
      setRateModal({ open: false, appointment: null })
    } catch (e) {
      alert("Erro ao enviar avaliação")
    } finally {
      setRatingLoading(false)
    }
  }

  function renderStatusBadge(status: string) {
    return (
      <span
        className={
          "px-3 py-1 rounded-full text-xs font-semibold " +
          getStatusColor(status)
        }
      >
        {getStatusLabel(status)}
      </span>
    )
  }

  function renderAppointmentCard(appointment: any, isHistory = false) {
    return (
      <Card key={appointment.id} className="border-0 shadow-lg bg-white dark:bg-[#232326] hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#FF96B2]/20 flex items-center justify-center">
              {appointment.salonId ? (
                <Building2 className="w-7 h-7 text-[#FF96B2]" />
              ) : (
                <User className="w-7 h-7 text-[#FF96B2]" />
              )}
            </div>
            <div>
              <CardTitle className="text-lg text-[#313131] dark:text-white">
                {appointment.serviceName}
              </CardTitle>
              <CardDescription className="text-[#313131]/70 dark:text-white/70">
                {appointment.salonId
                  ? `com ${appointment.professionalName} no salão ${appointment.salonName}`
                  : `com ${appointment.professionalName}`}
              </CardDescription>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            {renderStatusBadge(appointment.status)}
            <span className="text-xs text-[#313131]/70 dark:text-white/70">
              {formatDate(appointment.date)} às {appointment.time}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Scissors className="w-4 h-4 text-[#FF96B2]" />
                <span className="text-sm text-[#313131] dark:text-white">
                  <strong>Serviço:</strong> {appointment.serviceName}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-[#FF96B2]" />
                <span className="text-sm text-[#313131] dark:text-white">
                  <strong>Profissional:</strong> {appointment.professionalName}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-[#FF96B2]" />
                <span className="text-sm text-[#313131] dark:text-white">
                  <strong>Data:</strong> {formatDate(appointment.date)}
                </span>
                <span className="ml-2 text-sm text-[#313131] dark:text-white">
                  <strong>Horário:</strong> {appointment.time}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-[#313131] dark:text-white">
                  <strong>Preço:</strong> R$ {appointment.servicePrice}
                </span>
              </div>
              {appointment.note && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-[#313131] dark:text-white">
                    <strong>Observações:</strong> {appointment.note}
                  </span>
                </div>
              )}
              {renderContactInfo(appointment)}
            </div>
            <div className="flex flex-col gap-2 items-end justify-between">
              <div className="flex flex-col gap-2 w-full md:w-auto">
                {appointment.salonId ? (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#FF96B2] text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white"
                    onClick={() => router.push(`/view/${appointment.salonId}`)}
                  >
                    Ver salão
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#FF96B2] text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white"
                    onClick={() => router.push(`/professional/${appointment.professionalId}`)}
                  >
                    Ver perfil
                  </Button>
                )}
                {appointment.status === "completed" && !appointment.rating && (
                  <Button
                    size="sm"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                    onClick={() => openRateModal(appointment)}
                  >
                    Avaliar
                  </Button>
                )}
                <Button
                  size="sm"
                  className="bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white"
                  onClick={() => openRescheduleModal(appointment)}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {isHistory ? "Agendar Novamente" : "Reagendar"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return <div className="p-8 text-center text-[#313131] dark:text-white">Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-[#EFEFEF] dark:bg-[#18181b] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#313131] dark:text-white mb-2">Meus Agendamentos</h1>
          <p className="text-[#313131]/70 dark:text-white/70">Veja seus agendamentos futuros e históricos</p>
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Próximos</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>

          {/* Próximos agendamentos */}
          <TabsContent value="upcoming">
            <div className="space-y-6">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment: any) => renderAppointmentCard(appointment, false))
              ) : (
                <Card className="border-0 shadow-lg bg-white dark:bg-[#232326]">
                  <CardContent className="text-center py-12">
                    <Calendar className="w-16 h-16 mx-auto mb-4 text-[#FF96B2]/30 dark:text-[#FF96B2]/30" />
                    <h3 className="text-xl font-semibold text-[#313131] dark:text-white mb-2">Nenhum agendamento próximo</h3>
                    <p className="text-[#313131]/70 dark:text-white/60 mb-4">Que tal agendar um novo serviço?</p>
                    <Button className="bg-[#FF96B2] dark:bg-[#f472b6] hover:bg-[#FF96B2]/90 dark:hover:bg-[#c0264b] text-white" onClick={() => router.push("/services")}>Agendar Serviço</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Histórico */}
          <TabsContent value="history">
            <div className="space-y-6">
              {historyAppointments.length > 0 ? (
                historyAppointments.map((appointment: any) => renderAppointmentCard(appointment, true))
              ) : (
                <Card className="border-0 shadow-lg bg-white dark:bg-[#232326]">
                  <CardContent className="text-center py-12">
                    <Calendar className="w-16 h-16 mx-auto mb-4 text-[#FF96B2]/30 dark:text-[#FF96B2]/30" />
                    <h3 className="text-xl font-semibold text-[#313131] dark:text-white mb-2">Nenhum histórico de agendamento</h3>
                    <p className="text-[#313131]/70 dark:text-white/60 mb-4">Você ainda não realizou nenhum serviço.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Modal de reagendamento */}
        <Dialog open={rescheduleModal.open} onOpenChange={(open) => !open && setRescheduleModal({ open: false, appointment: null })}>
          <DialogContent className="bg-white dark:bg-[#232326] text-[#313131] dark:text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[#313131] dark:text-white">Reagendar Agendamento</DialogTitle>
              <DialogDescription className="dark:text-white/60">
                Escolha a nova data e horário para o agendamento.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label htmlFor="newDate" className="block mb-1 text-sm dark:text-white">Nova Data</label>
                <Input
                  id="newDate"
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="border-[#FF96B2] dark:border-[#FF96B2] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="newTime" className="block mb-1 text-sm dark:text-white">Novo Horário</label>
                <Input
                  id="newTime"
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="border-[#FF96B2] dark:border-[#FF96B2] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  className="border-[#FF96B2] text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white"
                  onClick={() => setRescheduleModal({ open: false, appointment: null })}
                  disabled={rescheduling}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
                <Button
                  className="bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white"
                  onClick={handleReschedule}
                  disabled={rescheduling}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Salvar Reagendamento
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal de avaliação */}
        <Dialog open={rateModal.open} onOpenChange={(open) => !open && setRateModal({ open: false, appointment: null })}>
          <DialogContent className="bg-white dark:bg-[#232326] text-[#313131] dark:text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[#313131] dark:text-white">Avaliar Atendimento</DialogTitle>
              <DialogDescription className="dark:text-white/60">
                Dê uma nota e deixe um comentário sobre o serviço recebido.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm dark:text-white">Nota</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`p-1 ${rateValue >= star ? "text-yellow-400" : "text-gray-400"}`}
                      onClick={() => setRateValue(star)}
                    >
                      <Star className="w-6 h-6" fill={rateValue >= star ? "#facc15" : "none"} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block mb-1 text-sm dark:text-white">Comentário</label>
                <Textarea
                  value={rateComment}
                  onChange={(e) => setRateComment(e.target.value)}
                  placeholder="Deixe seu comentário (opcional)"
                  className="border-[#FF96B2] dark:border-[#FF96B2] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white"
                  rows={3}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  className="border-[#FF96B2] text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white"
                  onClick={() => setRateModal({ open: false, appointment: null })}
                  disabled={ratingLoading}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
                <Button
                  className="bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white"
                  onClick={handleRate}
                  disabled={ratingLoading}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Enviar Avaliação
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}