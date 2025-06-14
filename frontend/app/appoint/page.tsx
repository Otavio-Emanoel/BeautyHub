"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Star, MessageSquare, Phone, RotateCcw, X, CheckCircle } from "lucide-react"

export default function AppointmentsPage() {
  const [selectedRating, setSelectedRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [filterPeriod, setFilterPeriod] = useState("all")
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState<any[]>([])
  const router = useRouter()

  // Busca agendamentos reais do backend
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/auth/login")
      return
    }
    async function fetchAppointments() {
      setLoading(true)
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedules/client`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (!res.ok) throw new Error("Erro ao buscar agendamentos")
        const data = await res.json()
        setAppointments(data.appointments || data) // depende do backend
      } catch (e) {
        setAppointments([])
      } finally {
        setLoading(false)
      }
    }
    fetchAppointments()
  }, [router])

  // Separar próximos e históricos
  const now = new Date()
  const upcomingAppointments = appointments.filter(a =>
    a.status !== "cancelled" &&
    new Date(`${a.date}T${a.time}`) >= now
  )
  const pastAppointments = appointments.filter(a =>
    a.status === "cancelled" ||
    new Date(`${a.date}T${a.time}`) < now
  )

  // Filtro de período para histórico
  const filteredPastAppointments = pastAppointments.filter((appointment) => {
    if (filterPeriod === "all") return true
    const appointmentDate = new Date(appointment.date)
    const diffTime = now.getTime() - appointmentDate.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    switch (filterPeriod) {
      case "week":
        return diffDays <= 7
      case "month":
        return diffDays <= 30
      case "3months":
        return diffDays <= 90
      default:
        return true
    }
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
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

  const getLocalDate = (date: string) => {
    // Adiciona 'T12:00' para evitar problemas de fuso
    return new Date(date + "T12:00:00")
  }

  // Envio de avaliação (exemplo)
  const handleSubmitReview = async (appointmentId: string) => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/auth/login")
      return
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedules/appointment/${appointmentId}/rate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating: selectedRating, review: reviewText }),
      })
      if (!res.ok) throw new Error("Erro ao enviar avaliação")
      alert("Avaliação enviada!")
      setSelectedRating(0)
      setReviewText("")
    } catch (e) {
      alert("Erro ao enviar avaliação")
    }
  }

  const handleCancel = async (id: string) => {
  const token = localStorage.getItem("token")
  if (!token) return router.push("/auth/login")
  if (!window.confirm("Tem certeza que deseja cancelar este agendamento?")) return
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedules/appointment/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
    if (!res.ok) throw new Error("Erro ao cancelar")
    setAppointments((prev) => prev.map(a => a.id === id ? { ...a, status: "cancelled" } : a))
    alert("Agendamento cancelado!")
  } catch (e) {
    alert("Erro ao cancelar agendamento")
  }
}

  const StarRating = ({
    rating,
    onRatingChange,
    readonly = false,
  }: { rating: number; onRatingChange?: (rating: number) => void; readonly?: boolean }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 cursor-pointer transition-colors
              ${star <= rating
                ? "fill-yellow-400 text-yellow-400 dark:fill-yellow-300 dark:text-yellow-300"
                : "text-gray-300 dark:text-gray-600"}
              ${readonly ? "cursor-default" : "hover:text-yellow-400 dark:hover:text-yellow-300"}`}
            onClick={() => !readonly && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    )
  }

  if (loading) {
    return <div className="p-6">Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-[#EFEFEF] dark:bg-[#18181b] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#313131] dark:text-white mb-2">Meus Agendamentos</h1>
          <p className="text-[#313131]/70 dark:text-gray-400">Gerencie seus agendamentos e avalie os serviços</p>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Próximos ({upcomingAppointments.length})</TabsTrigger>
            <TabsTrigger value="history">Histórico ({pastAppointments.length})</TabsTrigger>
          </TabsList>

          {/* Próximos Agendamentos */}
          <TabsContent value="upcoming">
            <div className="space-y-6">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id} className="border-0 shadow-lg dark:bg-[#232326]">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={appointment.professionalAvatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-[#FF96B2] dark:bg-[#c0264b] text-white">
                              {appointment.professionalName
                                ?.split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-[#313131] dark:text-white">{appointment.serviceName}</CardTitle>
                            <CardDescription className="text-base dark:text-gray-400">
                              {appointment.salonName} • {appointment.professionalName}
                            </CardDescription>
                          </div>
                        </div>
                        {getStatusBadge(appointment.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center text-[#313131]/70 dark:text-gray-400">
                            <Calendar className="w-4 h-4 mr-2" />
                            {getLocalDate(appointment.date).toLocaleDateString("pt-BR", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                          <div className="flex items-center text-[#313131]/70 dark:text-gray-400">
                            <Clock className="w-4 h-4 mr-2" />
                            {appointment.time} • {appointment.duration || ""}
                          </div>
                          <div className="flex items-center text-[#313131]/70 dark:text-gray-400">
                            <MapPin className="w-4 h-4 mr-2" />
                            {appointment.salonAddress}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center text-[#313131]/70 dark:text-gray-400">
                            <Phone className="w-4 h-4 mr-2" />
                            {appointment.salonPhone}
                          </div>
                          <div className="text-2xl font-bold text-[#FF96B2] dark:text-[#f472b6]">R$ {appointment.servicePrice}</div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-400 text-red-600 hover:bg-red-100"
                        onClick={() => handleCancel(appointment.id)}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancelar
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="border-0 shadow-lg dark:bg-[#232326]">
                  <CardContent className="text-center py-12">
                    <Calendar className="w-16 h-16 mx-auto mb-4 text-[#313131]/30 dark:text-gray-600" />
                    <h3 className="text-xl font-semibold text-[#313131] dark:text-white mb-2">Nenhum agendamento próximo</h3>
                    <p className="text-[#313131]/70 dark:text-gray-400 mb-4">Que tal agendar um novo serviço?</p>
                    <Button className="bg-[#FF96B2] dark:bg-[#f472b6] hover:bg-[#FF96B2]/90 dark:hover:bg-[#c0264b] text-white" onClick={() => router.push("/salons")}>Agendar Serviço</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Histórico */}
          <TabsContent value="history">
            <div className="space-y-6">
              {/* Filtro */}
              <Card className="border-0 shadow-lg dark:bg-[#232326]">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                    <Label htmlFor="period" className="dark:text-white">Filtrar por período:</Label>
                    <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                      <SelectTrigger className="w-48 border-[#EFEFEF] dark:border-[#232326] focus:border-[#FF96B2] dark:focus:border-[#f472b6]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-[#232326]">
                        <SelectItem value="all">Todos os períodos</SelectItem>
                        <SelectItem value="week">Última semana</SelectItem>
                        <SelectItem value="month">Último mês</SelectItem>
                        <SelectItem value="3months">Últimos 3 meses</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Lista de históricos */}
              {filteredPastAppointments.length > 0 ? (
                filteredPastAppointments.map((appointment) => (
                  <Card key={appointment.id} className="border-0 shadow-lg dark:bg-[#232326]">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={appointment.professionalAvatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-[#FF96B2] dark:bg-[#c0264b] text-white">
                              {appointment.professionalName
                                ?.split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-[#313131] dark:text-white">{appointment.serviceName}</CardTitle>
                            <CardDescription className="text-base dark:text-gray-400">
                              {appointment.salonName} • {appointment.professionalName}
                            </CardDescription>
                          </div>
                        </div>
                        {getStatusBadge(appointment.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center text-[#313131]/70 dark:text-gray-400">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(appointment.date).toLocaleDateString("pt-BR")}
                          </div>
                          <div className="flex items-center text-[#313131]/70 dark:text-gray-400">
                            <Clock className="w-4 h-4 mr-2" />
                            {appointment.time} • {appointment.duration || ""}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#FF96B2] dark:text-[#f472b6]">R$ {appointment.servicePrice}</div>
                        </div>
                      </div>

                      {/* Avaliação */}
                      {appointment.status === "completed" && (
                        <div className="pt-4 border-t border-[#EFEFEF] dark:border-[#232326]">
                          {appointment.rating ? (
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-[#313131] dark:text-white">Sua avaliação:</span>
                                <StarRating rating={appointment.rating} readonly />
                              </div>
                              {appointment.review && (
                                <p className="text-sm text-[#313131]/70 dark:text-gray-400 bg-[#EFEFEF] dark:bg-[#18181b] p-3 rounded-lg">
                                  "{appointment.review}"
                                </p>
                              )}
                            </div>
                          ) : (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-[#FF96B2] dark:border-[#f472b6] text-[#FF96B2] dark:text-[#f472b6] hover:bg-[#FF96B2] hover:text-white dark:hover:bg-[#f472b6] dark:hover:text-white"
                                >
                                  <Star className="w-4 h-4 mr-2" />
                                  Avaliar Atendimento
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md dark:bg-[#232326]">
                                <DialogHeader>
                                  <DialogTitle className="text-[#313131] dark:text-white">Avaliar Atendimento</DialogTitle>
                                  <DialogDescription className="dark:text-gray-400">
                                    Como foi sua experiência com {appointment.professionalName}?
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label className="text-sm font-medium text-[#313131] dark:text-white">Nota geral</Label>
                                    <div className="mt-2">
                                      <StarRating rating={selectedRating} onRatingChange={setSelectedRating} />
                                    </div>
                                  </div>
                                  <div>
                                    <Label htmlFor="review" className="text-sm font-medium text-[#313131] dark:text-white">
                                      Comentário (opcional)
                                    </Label>
                                    <Textarea
                                      id="review"
                                      placeholder="Conte como foi sua experiência..."
                                      className="mt-2 border-[#EFEFEF] dark:border-[#232326] focus:border-[#FF96B2] dark:focus:border-[#f472b6] dark:bg-[#18181b] dark:text-white"
                                      value={reviewText}
                                      onChange={(e) => setReviewText(e.target.value)}
                                    />
                                  </div>
                                  <div className="flex space-x-2">
                                    <Button
                                      className="flex-1 bg-[#FF96B2] dark:bg-[#f472b6] hover:bg-[#FF96B2]/90 dark:hover:bg-[#c0264b] text-white"
                                      onClick={() => handleSubmitReview(appointment.id)}
                                      disabled={selectedRating === 0}
                                    >
                                      Enviar Avaliação
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      )}

                      {/* Repetir serviço */}
                      {appointment.status === "completed" && (
                        <div className="flex justify-end">
                          <Button size="sm" className="bg-[#FF96B2] dark:bg-[#f472b6] hover:bg-[#FF96B2]/90 dark:hover:bg-[#c0264b] text-white">
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Agendar Novamente
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="border-0 shadow-lg dark:bg-[#232326]">
                  <CardContent className="text-center py-12">
                    <CheckCircle className="w-16 h-16 mx-auto mb-4 text-[#313131]/30 dark:text-gray-600" />
                    <h3 className="text-xl font-semibold text-[#313131] dark:text-white mb-2">Nenhum histórico encontrado</h3>
                    <p className="text-[#313131]/70 dark:text-gray-400">Tente ajustar o filtro de período</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}