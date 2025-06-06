"use client"

import { useState } from "react"
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
  MapPin,
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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [notes, setNotes] = useState("")

  const appointments = [
    {
      id: 1,
      client: {
        name: "Maria Silva",
        phone: "(11) 99999-9999",
        avatar: "/placeholder.svg?height=40&width=40",
        isNewClient: false,
      },
      service: "Corte + Escova",
      date: "2024-01-20",
      time: "14:00",
      duration: "90 min",
      price: 140,
      status: "confirmed",
      location: "Salão Elegance - Centro",
      notes: "Cliente prefere corte mais curto",
      isToday: true,
    },
    {
      id: 2,
      client: {
        name: "Ana Costa",
        phone: "(11) 88888-8888",
        avatar: "/placeholder.svg?height=40&width=40",
        isNewClient: true,
      },
      service: "Coloração + Luzes",
      date: "2024-01-20",
      time: "16:00",
      duration: "180 min",
      price: 280,
      status: "pending",
      location: "Salão Elegance - Centro",
      notes: "",
      isToday: true,
    },
    {
      id: 3,
      client: {
        name: "Fernanda Oliveira",
        phone: "(11) 77777-7777",
        avatar: "/placeholder.svg?height=40&width=40",
        isNewClient: false,
      },
      service: "Corte Feminino",
      date: "2024-01-21",
      time: "10:00",
      duration: "60 min",
      price: 80,
      status: "confirmed",
      location: "Beauty Studio - Jardins",
      notes: "",
      isToday: false,
    },
    {
      id: 4,
      client: {
        name: "Carla Santos",
        phone: "(11) 66666-6666",
        avatar: "/placeholder.svg?height=40&width=40",
        isNewClient: false,
      },
      service: "Escova",
      date: "2024-01-19",
      time: "15:30",
      duration: "60 min",
      price: 60,
      status: "completed",
      location: "Salão Elegance - Centro",
      notes: "Cliente muito satisfeita",
      isToday: false,
    },
    {
      id: 5,
      client: {
        name: "Julia Mendes",
        phone: "(11) 55555-5555",
        avatar: "/placeholder.svg?height=40&width=40",
        isNewClient: false,
      },
      service: "Corte + Escova",
      date: "2024-01-18",
      time: "11:00",
      duration: "90 min",
      price: 140,
      status: "cancelled",
      location: "Beauty Studio - Jardins",
      notes: "Cancelado pela cliente",
      isToday: false,
    },
  ]

  const stats = {
    thisWeek: 12,
    thisMonth: 45,
    attendanceRate: 92,
    todayAppointments: 3,
    newAppointments: 2,
  }

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
      default:
        return <Badge className="bg-gray-100 text-gray-800">Pendente</Badge>
    }
  }

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch = appointment.client.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter
    const matchesService = serviceFilter === "all" || appointment.service.includes(serviceFilter)

    let matchesDate = true
    if (dateFilter === "today") {
      matchesDate = appointment.isToday
    } else if (dateFilter === "week") {
      const appointmentDate = new Date(appointment.date)
      const today = new Date()
      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
      matchesDate = appointmentDate >= today && appointmentDate <= weekFromNow
    }

    return matchesSearch && matchesStatus && matchesService && matchesDate
  })

  const todayAppointments = appointments.filter((app) => app.isToday)
  const newAppointments = appointments.filter((app) => app.client.isNewClient && app.status === "pending")

  const handleConfirm = (appointmentId: number) => {
    console.log("Confirming appointment:", appointmentId)
  }

  const handleCancel = (appointmentId: number) => {
    console.log("Cancelling appointment:", appointmentId)
  }

  const handleReschedule = (appointmentId: number) => {
    console.log("Rescheduling appointment:", appointmentId)
  }

  const handleAddNotes = (appointmentId: number, notes: string) => {
    console.log("Adding notes to appointment:", appointmentId, notes)
  }

  const handleWhatsApp = (phone: string, clientName: string) => {
    const message = `Olá ${clientName}! Aqui é da BeautyBook. Como posso ajudá-la?`
    const whatsappUrl = `https://wa.me/55${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-[#EFEFEF] dark:bg-[#18181b] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#313131] dark:text-white mb-2">Meus Agendamentos</h1>
          <p className="text-[#313131]/70 dark:text-white/60">Gerencie seus agendamentos e atendimentos</p>
        </div>

        {/* Stats Cards */}
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

        {/* Notifications */}
        {(todayAppointments.length > 0 || newAppointments.length > 0) && (
          <div className="mb-6 space-y-3">
            {todayAppointments.length > 0 && (
              <Card className="border-l-4 border-l-[#FF96B2] dark:border-l-[#FFB6D5] bg-[#FF96B2]/5 dark:bg-[#FFB6D5]/10">
                <CardContent className="pt-4">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="w-5 h-5 text-[#FF96B2] dark:text-[#FFB6D5]" />
                    <span className="font-medium text-[#313131] dark:text-white">
                      Você tem {todayAppointments.length} agendamento{todayAppointments.length > 1 ? "s" : ""} hoje
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            {newAppointments.length > 0 && (
              <Card className="border-l-4 border-l-yellow-500 dark:border-l-yellow-400 bg-yellow-50 dark:bg-yellow-900/20">
                <CardContent className="pt-4">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    <span className="font-medium text-[#313131] dark:text-white">
                      {newAppointments.length} novo{newAppointments.length > 1 ? "s" : ""} agendamento
                      {newAppointments.length > 1 ? "s" : ""} pendente{newAppointments.length > 1 ? "s" : ""}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Filters */}
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
                  <SelectItem value="Corte">Corte</SelectItem>
                  <SelectItem value="Escova">Escova</SelectItem>
                  <SelectItem value="Coloração">Coloração</SelectItem>
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

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <Card key={appointment.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-[#232326]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={appointment.client.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-[#FF96B2] dark:bg-[#FFB6D5] text-white">
                          {appointment.client.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-[#313131] dark:text-white">{appointment.client.name}</h3>
                          {appointment.client.isNewClient && (
                            <Badge className="bg-[#FF96B2] dark:bg-[#FFB6D5] text-white text-xs">Novo</Badge>
                          )}
                        </div>
                        <p className="text-sm text-[#313131]/70 dark:text-white/60">{appointment.service}</p>
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
                          {appointment.status === "pending" && (
                            <DropdownMenuItem onClick={() => handleConfirm(appointment.id)}>
                              <Check className="w-4 h-4 mr-2" />
                              Confirmar
                            </DropdownMenuItem>
                          )}
                          {(appointment.status === "pending" || appointment.status === "confirmed") && (
                            <>
                              <DropdownMenuItem onClick={() => handleReschedule(appointment.id)}>
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Reagendar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleCancel(appointment.id)}>
                                <X className="w-4 h-4 mr-2" />
                                Cancelar
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center text-[#313131]/70 dark:text-white/60">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {new Date(appointment.date).toLocaleDateString("pt-BR")}
                    </div>
                    <div className="flex items-center text-[#313131]/70 dark:text-white/60">
                      <Clock className="w-4 h-4 mr-2" />
                      {appointment.time} • {appointment.duration}
                    </div>
                    <div className="flex items-center text-[#313131]/70 dark:text-white/60">
                      <MapPin className="w-4 h-4 mr-2" />
                      {appointment.location}
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-[#FF96B2] dark:text-[#FFB6D5]">R$ {appointment.price}</span>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="mb-4 p-3 bg-[#EFEFEF] dark:bg-[#232326] rounded-lg">
                      <p className="text-sm text-[#313131]/70 dark:text-white/60">
                        <FileText className="w-4 h-4 inline mr-1" />
                        {appointment.notes}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900"
                      onClick={() => handleWhatsApp(appointment.client.phone, appointment.client.name)}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#FF96B2] dark:border-[#FFB6D5] text-[#FF96B2] dark:text-[#FFB6D5] hover:bg-[#FF96B2] dark:hover:bg-[#FFB6D5] hover:text-white dark:hover:text-[#232326]"
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
                            Adicione observações sobre o atendimento de {appointment.client.name}
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

                    {appointment.status === "pending" && (
                      <Button
                        size="sm"
                        className="bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800 text-white"
                        onClick={() => handleConfirm(appointment.id)}
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Confirmar
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
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
      </div>
    </div>
  )
}
