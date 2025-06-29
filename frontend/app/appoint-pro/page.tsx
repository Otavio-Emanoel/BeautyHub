"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  CalendarIcon,
  Clock,
  Search,
  Filter,
  Phone,
  MessageSquare,
  Check,
  X,
  RotateCcw,
  FileText,
  MoreVertical,
  Bell,
  TrendingUp,
  Users,
  DollarSign,
} from "lucide-react"

export default function ProfessionalAppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [serviceFilter, setServiceFilter] = useState("all")
  const [notes, setNotes] = useState("")
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [rescheduleData, setRescheduleData] = useState<{ id: string, date: string, time: string } | null>(null)

  // Modais de confirmação
  const [confirmModal, setConfirmModal] = useState<{ open: boolean, appointment: any | null }>({ open: false, appointment: null })
  const [cancelModal, setCancelModal] = useState<{ open: boolean, appointment: any | null }>({ open: false, appointment: null })
  const [finishModal, setFinishModal] = useState<{ open: boolean, appointment: any | null }>({ open: false, appointment: null })

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem("token")
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professional/schedules`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        setAppointments(data.appointments || [])
      } catch (e) {
        setAppointments([])
      } finally {
        setLoading(false)
      }
    }
    fetchAppointments()
  }, [])

  // Helpers
  const getClientName = (appointment: any) =>
    appointment.clientName ||
    appointment.client?.name ||
    appointment.client?.displayName ||
    "Cliente"

  const getClientAvatar = (appointment: any) =>
    appointment.clientAvatar ||
    appointment.client?.avatar ||
    appointment.client?.photoURL ||
    "https://ui-avatars.com/api/?name=" + encodeURIComponent(getClientName(appointment))

  const getClientPhone = (appointment: any) => appointment.clientPhone || appointment.client?.phone || ""
  const getServiceName = (appointment: any) => appointment.serviceName || appointment.service || ""
  const getServiceDuration = (appointment: any) => appointment.serviceDuration || appointment.duration || ""
  const getPrice = (appointment: any) => appointment.servicePrice || appointment.price || ""
  const getNotes = (appointment: any) => appointment.note || appointment.notes || ""
  const getIsNewClient = (appointment: any) => appointment.clientIsNew || appointment.client?.isNewClient || false

  const getAppointmentDateObj = (appointment: any) => {
    if (appointment.date && appointment.time) {
      return new Date(`${appointment.date}T${appointment.time}`)
    }
    if (appointment.date) {
      return new Date(appointment.date)
    }
    return new Date()
  }

  // Filtros
  const filteredAppointments = appointments.filter((appointment) => {
    const d = getAppointmentDateObj(appointment)
    const matchesSearch = getClientName(appointment).toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter
    const matchesService = serviceFilter === "all" || getServiceName(appointment).includes(serviceFilter)
    let matchesDate = true
    if (dateFilter === "today") {
      const now = new Date()
      matchesDate = d.toDateString() === now.toDateString()
    } else if (dateFilter === "week") {
      const now = new Date()
      const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
      matchesDate = d >= now && d <= weekFromNow
    } else if (dateFilter === "month") {
      const now = new Date()
      matchesDate = d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    }
    return matchesSearch && matchesStatus && matchesService && matchesDate
  })

  // Histórico (cancelados e concluídos)
  const historyAppointments = appointments.filter((appointment) =>
    appointment.status === "completed" || appointment.status === "cancelled"
  )

  // Stats
  const stats = {
    thisWeek: appointments.filter(a => {
      const d = getAppointmentDateObj(a)
      const now = new Date()
      const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
      return d >= now && d <= weekFromNow
    }).length,
    thisMonth: appointments.filter(a => {
      const d = getAppointmentDateObj(a)
      const now = new Date()
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    }).length,
    attendanceRate: 92,
    todayAppointments: appointments.filter(a => {
      const d = getAppointmentDateObj(a)
      const now = new Date()
      return d.toDateString() === now.toDateString()
    }).length,
    newAppointments: appointments.filter(a => getIsNewClient(a) && a.status === "pending").length,
  }

  // Ações
  const handleConfirm = async (appointmentId: string) => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedules/appointment/${appointmentId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "confirmed" }),
      })
      if (!res.ok) throw new Error("Erro ao confirmar agendamento")
      setAppointments((prev) =>
        prev.map((a) => a.id === appointmentId ? { ...a, status: "confirmed" } : a)
      )
    } catch (e) {
      alert("Erro ao confirmar agendamento")
    }
  }

  const handleCancel = async (appointmentId: string) => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedules/appointment/${appointmentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) throw new Error("Erro ao cancelar agendamento")
      setAppointments((prev) =>
        prev.map((a) => a.id === appointmentId ? { ...a, status: "cancelled" } : a)
      )
    } catch (e) {
      alert("Erro ao cancelar agendamento")
    }
  }

  const handleReschedule = async (appointmentId: string, newDate: string, newTime: string) => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedules/appointment/${appointmentId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "rescheduled", newDate, newTime }),
      })
      if (!res.ok) throw new Error("Erro ao remarcar agendamento")
      setAppointments((prev) =>
        prev.map((a) => a.id === appointmentId ? { ...a, date: newDate, time: newTime, status: "rescheduled" } : a)
      )
    } catch (e) {
      alert("Erro ao remarcar agendamento")
    }
  }

  const handleFinish = async (appointmentId: string) => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedules/appointment/${appointmentId}/finish`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) throw new Error("Erro ao concluir agendamento")
      setAppointments((prev) =>
        prev.map((a) => a.id === appointmentId ? { ...a, status: "completed" } : a)
      )
    } catch (e) {
      alert("Erro ao concluir agendamento")
    }
  }

  const handleAddNotes = async (appointmentId: string, notes: string) => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedules/appointment/${appointmentId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ note: notes }),
      })
      if (!res.ok) throw new Error("Erro ao salvar observações")
      setAppointments((prev) =>
        prev.map((a) => a.id === appointmentId ? { ...a, note: notes } : a)
      )
    } catch (e) {
      alert("Erro ao salvar observações")
    }
  }

  const handleWhatsApp = (phone: string, clientName: string) => {
    const message = `Olá ${clientName}! Aqui é da BeautyBook. Como posso ajudá-la?`
    const whatsappUrl = `https://wa.me/55${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  // Badge de status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmado</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Concluído</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelado</Badge>
      case "rescheduled":
        return <Badge className="bg-purple-100 text-purple-800">Reagendado</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Pendente</Badge>
    }
  }

  // Card de agendamento
  function renderAppointmentCard(appointment: any) {
    const appointmentDate = getAppointmentDateObj(appointment)
    const now = new Date()
    const isPast = appointmentDate < now
    const isPending = appointment.status === "pending"
    const isRescheduled = appointment.status === "rescheduled"
    const isCompleted = appointment.status === "completed"
    const isCancelled = appointment.status === "cancelled"

    // Aviso para pendente e já passou do horário
    let expiredWarning = null
    if (isPending && isPast && !isCompleted && !isCancelled) {
      expiredWarning = (
        <div className="mb-2 p-2 bg-yellow-100 text-yellow-800 rounded text-xs">
          O horário deste agendamento já passou e ainda não foi confirmado. Confirme ou reagende.
        </div>
      )
    }

    // Aviso para reagendado (apenas notificação para o profissional)
    let rescheduleWarning = null
    if (isRescheduled && !isCompleted && !isCancelled) {
      rescheduleWarning = (
        <div className="mb-2 p-2 bg-blue-100 text-blue-800 rounded text-xs">
          Você alterou a data/horário deste agendamento. Aguarde o comparecimento do cliente.
        </div>
      )
    }

    return (
      <Card key={appointment.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-[#232326]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={getClientAvatar(appointment)} />
                <AvatarFallback className="bg-[#FF96B2] dark:bg-[#FFB6D5] text-white">
                  {getClientName(appointment)
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-[#313131] dark:text-white">{getClientName(appointment)}</h3>
                  {getIsNewClient(appointment) && (
                    <Badge className="bg-[#FF96B2] dark:bg-[#FFB6D5] text-white text-xs">Novo</Badge>
                  )}
                </div>
                <p className="text-sm text-[#313131]/70 dark:text-white/60">{getServiceName(appointment)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusBadge(appointment.status)}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white dark:bg-[#232326] text-[#313131] dark:text-white">
                  {(appointment.status === "pending" || appointment.status === "rescheduled") && (
                    <DropdownMenuItem onClick={() => setConfirmModal({ open: true, appointment })}>
                      <Check className="w-4 h-4 mr-2" />
                      Confirmar
                    </DropdownMenuItem>
                  )}
                  {(appointment.status === "pending" || appointment.status === "confirmed") && (
                    <>
                      <DropdownMenuItem onClick={() => setRescheduleData({ id: appointment.id, date: appointment.date, time: appointment.time })}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reagendar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setCancelModal({ open: true, appointment })}>
                        <X className="w-4 h-4 mr-2" />
                        Cancelar
                      </DropdownMenuItem>
                    </>
                  )}
                  {appointment.status === "confirmed" && (
                    <DropdownMenuItem onClick={() => setFinishModal({ open: true, appointment })}>
                      <Check className="w-4 h-4 mr-2" />
                      Concluir
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {expiredWarning}
          {rescheduleWarning}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center text-[#313131]/70 dark:text-white/60">
              <CalendarIcon className="w-4 h-4 mr-2" />
              {appointmentDate.toLocaleDateString("pt-BR")}
            </div>
            <div className="flex items-center text-[#313131]/70 dark:text-white/60">
              <Clock className="w-4 h-4 mr-2" />
              {appointment.time} • {getServiceDuration(appointment)} min
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-[#FF96B2] dark:text-[#FFB6D5]">R$ {getPrice(appointment)}</span>
            </div>
          </div>

          {getNotes(appointment) && (
            <div className="mb-4 p-3 bg-[#EFEFEF] dark:bg-[#232326] rounded-lg">
              <p className="text-sm text-[#313131]/70 dark:text-white/60">
                <FileText className="w-4 h-4 inline mr-1" />
                {getNotes(appointment)}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900"
              onClick={() => handleWhatsApp(getClientPhone(appointment), getClientName(appointment))}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-[#FF96B2] dark:border-[#FFB6D5] text-[#FF96B2] dark:text-[#FFB6D5] hover:bg-[#FF96B2] dark:hover:bg-[#FFB6D5] hover:text-white dark:hover:text-[#232326]"
              onClick={() => window.open(`tel:${getClientPhone(appointment)}`)}
            >
              <Phone className="w-4 h-4 mr-2" />
              Ligar
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#FF96B2] dark:border-[#FFB6D5] text-[#FF96B2] dark:text-[#FFB6D5] hover:bg-[#FF96B2] dark:hover:bg-[#FFB6D5] hover:text-white dark:hover:text-[#232326]"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Observações
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white dark:bg-[#232326] text-[#313131] dark:text-white">
                <DialogHeader>
                  <DialogTitle className="text-[#313131] dark:text-white">Adicionar Observações</DialogTitle>
                  <DialogDescription className="dark:text-white/60">
                    Adicione observações sobre o atendimento de {getClientName(appointment)}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="notes" className="dark:text-white">Observações</Label>
                    <Textarea
                      id="notes"
                      placeholder="Digite suas observações..."
                      className="border-[#EFEFEF] dark:border-[#232326] focus:border-[#FF96B2] dark:focus:border-[#FFB6D5] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                  <Button
                    className="w-full bg-[#FF96B2] dark:bg-[#FFB6D5] hover:bg-[#FF96B2]/90 dark:hover:bg-[#FFB6D5]/90 text-white dark:text-[#232326]"
                    onClick={() => {
                      handleAddNotes(appointment.id, notes)
                      setNotes("")
                    }}
                  >
                    Salvar Observações
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            {(appointment.status === "pending" || appointment.status === "rescheduled") && (
              <Button
                size="sm"
                className="bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800 text-white"
                onClick={() => setConfirmModal({ open: true, appointment })}
              >
                <Check className="w-4 h-4 mr-2" />
                Confirmar
              </Button>
            )}
            {(appointment.status === "pending" || appointment.status === "confirmed") && (
              <Button
                size="sm"
                className="bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white"
                onClick={() => setRescheduleData({ id: appointment.id, date: appointment.date, time: appointment.time })}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reagendar
              </Button>
            )}
            {(appointment.status === "pending" || appointment.status === "confirmed") && (
              <Button
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => setCancelModal({ open: true, appointment })}
              >
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
            )}
            {appointment.status === "confirmed" && (
              <Button
                size="sm"
                className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white"
                onClick={() => setFinishModal({ open: true, appointment })}
              >
                <Check className="w-4 h-4 mr-2" />
                Concluir
              </Button>
            )}
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
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#313131] dark:text-white mb-2">Agendamentos Recebidos</h1>
          <p className="text-[#313131]/70 dark:text-white/60">Gerencie seus agendamentos e atendimentos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card className="border-0 shadow-lg bg-white dark:bg-[#232326]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#313131]/70 dark:text-white/60">Hoje</CardTitle>
              <CalendarIcon className="h-4 w-4 text-[#FF96B2] dark:text-[#FFB6D5]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#313131] dark:text-white">{stats.todayAppointments}</div>
              <p className="text-xs text-[#313131]/70 dark:text-white/60">agendamentos</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white dark:bg-[#232326]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#313131]/70 dark:text-white/60">Esta Semana</CardTitle>
              <TrendingUp className="h-4 w-4 text-[#FF96B2] dark:text-[#FFB6D5]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#313131] dark:text-white">{stats.thisWeek}</div>
              <p className="text-xs text-[#313131]/70 dark:text-white/60">agendamentos</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white dark:bg-[#232326]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#313131]/70 dark:text-white/60">Este Mês</CardTitle>
              <Users className="h-4 w-4 text-[#FF96B2] dark:text-[#FFB6D5]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#313131] dark:text-white">{stats.thisMonth}</div>
              <p className="text-xs text-[#313131]/70 dark:text-white/60">agendamentos</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white dark:bg-[#232326]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#313131]/70 dark:text-white/60">Taxa Comparecimento</CardTitle>
              <DollarSign className="h-4 w-4 text-[#FF96B2] dark:text-[#FFB6D5]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#313131] dark:text-white">{stats.attendanceRate}%</div>
              <p className="text-xs text-[#313131]/70 dark:text-white/60">este mês</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white dark:bg-[#232326]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#313131]/70 dark:text-white/60">Novos</CardTitle>
              <Bell className="h-4 w-4 text-[#FF96B2] dark:text-[#FFB6D5]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#313131] dark:text-white">{stats.newAppointments}</div>
              <p className="text-xs text-[#313131]/70 dark:text-white/60">pendentes</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-lg mb-6 bg-white dark:bg-[#232326]">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50 dark:text-white/40" />
                <Input
                  placeholder="Buscar cliente..."
                  className="pl-10 border-[#EFEFEF] dark:border-[#232326] focus:border-[#FF96B2] dark:focus:border-[#FFB6D5] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-[#EFEFEF] dark:border-[#232326] focus:border-[#FF96B2] dark:focus:border-[#FFB6D5] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#232326] text-[#313131] dark:text-white">
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="confirmed">Confirmado</SelectItem>
                  <SelectItem value="completed">Concluído</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                  <SelectItem value="rescheduled">Reagendado</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="border-[#EFEFEF] dark:border-[#232326] focus:border-[#FF96B2] dark:focus:border-[#FFB6D5] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white">
                  <SelectValue placeholder="Data" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#232326] text-[#313131] dark:text-white">
                  <SelectItem value="all">Todas as datas</SelectItem>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="week">Esta semana</SelectItem>
                  <SelectItem value="month">Este mês</SelectItem>
                </SelectContent>
              </Select>
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger className="border-[#EFEFEF] dark:border-[#232326] focus:border-[#FF96B2] dark:focus:border-[#FFB6D5] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white">
                  <SelectValue placeholder="Serviço" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#232326] text-[#313131] dark:text-white">
                  <SelectItem value="all">Todos os serviços</SelectItem>
                  {[...new Set(appointments.map(getServiceName))]
                    .filter(Boolean)
                    .map((service, idx) => (
                      <SelectItem key={idx} value={service}>{service}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="border-[#FF96B2] dark:border-[#FFB6D5] text-[#FF96B2] dark:text-[#FFB6D5] hover:bg-[#FF96B2] dark:hover:bg-[#FFB6D5] hover:text-white dark:hover:text-[#232326]"
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                  setDateFilter("all")
                  setServiceFilter("all")
                }}
              >
                <Filter className="w-4 h-4 mr-2" />
                Limpar
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => renderAppointmentCard(appointment))
          ) : (
            <Card className="border-0 shadow-lg bg-white dark:bg-[#232326]">
              <CardContent className="text-center py-12">
                <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-[#313131]/30 dark:text-white/20" />
                <h3 className="text-xl font-semibold text-[#313131] dark:text-white mb-2">Nenhum agendamento encontrado</h3>
                <p className="text-[#313131]/70 dark:text-white/60 mb-4">Tente ajustar os filtros ou aguarde novos agendamentos</p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setStatusFilter("all")
                    setDateFilter("all")
                    setServiceFilter("all")
                  }}
                  className="bg-[#FF96B2] dark:bg-[#FFB6D5] hover:bg-[#FF96B2]/90 dark:hover:bg-[#FFB6D5]/90 text-white dark:text-[#232326]"
                >
                  Limpar Filtros
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Histórico de agendamentos cancelados e concluídos */}
        <Card className="border-0 shadow-lg mt-10 bg-white dark:bg-[#232326]">
          <CardHeader>
            <CardTitle>Histórico (Cancelados e Concluídos)</CardTitle>
          </CardHeader>
          <CardContent>
            {historyAppointments.length > 0 ? (
              historyAppointments.map((appointment) => renderAppointmentCard(appointment))
            ) : (
              <div className="text-center text-[#313131]/70 dark:text-white/60 py-8">
                Nenhum agendamento cancelado ou concluído.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modal de confirmação de agendamento */}
        <Dialog open={confirmModal.open} onOpenChange={(open) => !open && setConfirmModal({ open: false, appointment: null })}>
          <DialogContent className="bg-white dark:bg-[#232326] text-[#313131] dark:text-white">
            <DialogHeader>
              <DialogTitle>Confirmar Agendamento</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja confirmar o agendamento de <b>{getClientName(confirmModal.appointment || {})}</b>?
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setConfirmModal({ open: false, appointment: null })}
              >
                Cancelar
              </Button>
              <Button
                className="bg-green-600 text-white"
                onClick={async () => {
                  await handleConfirm(confirmModal.appointment.id)
                  setConfirmModal({ open: false, appointment: null })
                }}
              >
                Confirmar
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal de confirmação de cancelamento */}
        <Dialog open={cancelModal.open} onOpenChange={(open) => !open && setCancelModal({ open: false, appointment: null })}>
          <DialogContent className="bg-white dark:bg-[#232326] text-[#313131] dark:text-white">
            <DialogHeader>
              <DialogTitle>Cancelar Agendamento</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja cancelar o agendamento de <b>{getClientName(cancelModal.appointment || {})}</b>?
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setCancelModal({ open: false, appointment: null })}
              >
                Voltar
              </Button>
              <Button
                className="bg-red-600 text-white"
                onClick={async () => {
                  await handleCancel(cancelModal.appointment.id)
                  setCancelModal({ open: false, appointment: null })
                }}
              >
                Cancelar Agendamento
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal de confirmação de conclusão */}
        <Dialog open={finishModal.open} onOpenChange={(open) => !open && setFinishModal({ open: false, appointment: null })}>
          <DialogContent className="bg-white dark:bg-[#232326] text-[#313131] dark:text-white">
            <DialogHeader>
              <DialogTitle>Concluir Agendamento</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja marcar como concluído o agendamento de <b>{getClientName(finishModal.appointment || {})}</b>?
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setFinishModal({ open: false, appointment: null })}
              >
                Voltar
              </Button>
              <Button
                className="bg-blue-600 text-white"
                onClick={async () => {
                  await handleFinish(finishModal.appointment.id)
                  setFinishModal({ open: false, appointment: null })
                }}
              >
                Concluir
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal de reagendamento */}
        <Dialog open={!!rescheduleData} onOpenChange={(open) => !open && setRescheduleData(null)}>
          <DialogContent className="bg-white dark:bg-[#232326] text-[#313131] dark:text-white">
            <DialogHeader>
              <DialogTitle className="text-[#313131] dark:text-white">Reagendar Agendamento</DialogTitle>
              <DialogDescription className="dark:text-white/60">
                Escolha a nova data e horário para o agendamento.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="newDate" className="dark:text-white">Nova Data</Label>
                <Input
                  id="newDate"
                  type="date"
                  value={rescheduleData?.date || ""}
                  onChange={(e) => setRescheduleData((prev) => prev ? { ...prev, date: e.target.value } : null)}
                />
              </div>
              <div>
                <Label htmlFor="newTime" className="dark:text-white">Novo Horário</Label>
                <Input
                  id="newTime"
                  type="time"
                  value={rescheduleData?.time || ""}
                  onChange={(e) => setRescheduleData((prev) => prev ? { ...prev, time: e.target.value } : null)}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setRescheduleData(null)}
                >
                  Cancelar
                </Button>
                <Button
                  className="bg-[#FF96B2] dark:bg-[#FFB6D5] hover:bg-[#FF96B2]/90 dark:hover:bg-[#FFB6D5]/90 text-white dark:text-[#232326]"
                  onClick={async () => {
                    if (rescheduleData) {
                      await handleReschedule(rescheduleData.id, rescheduleData.date, rescheduleData.time)
                      setRescheduleData(null)
                    }
                  }}
                >
                  Salvar Reagendamento
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}