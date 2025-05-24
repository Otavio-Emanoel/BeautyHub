"use client"

import { useState } from "react"
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

  const upcomingAppointments = [
    {
      id: 1,
      salon: "Salão Elegance",
      professional: "Ana Costa",
      service: "Corte + Escova",
      date: "2024-01-20",
      time: "14:00",
      duration: "90 min",
      price: 140,
      status: "confirmed",
      address: "Rua das Flores, 123 - Centro",
      phone: "(11) 3333-4444",
      avatar: "/placeholder.svg?height=60&width=60",
      canCancel: true,
      canReschedule: true,
    },
    {
      id: 2,
      salon: "Beauty Studio",
      professional: "Lucia Mendes",
      service: "Manicure + Pedicure",
      date: "2024-01-22",
      time: "16:00",
      duration: "120 min",
      price: 80,
      status: "confirmed",
      address: "Av. Principal, 456 - Jardins",
      phone: "(11) 2222-3333",
      avatar: "/placeholder.svg?height=60&width=60",
      canCancel: true,
      canReschedule: true,
    },
  ]

  const pastAppointments = [
    {
      id: 3,
      salon: "Cabelo & Cia",
      professional: "Roberto Santos",
      service: "Coloração + Luzes",
      date: "2024-01-10",
      time: "09:00",
      duration: "180 min",
      price: 280,
      status: "completed",
      address: "Rua do Comércio, 789 - Vila Nova",
      phone: "(11) 1111-2222",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: null,
      canReview: true,
    },
    {
      id: 4,
      salon: "Salão Elegance",
      professional: "Ana Costa",
      service: "Corte Feminino",
      date: "2024-01-05",
      time: "15:30",
      duration: "60 min",
      price: 80,
      status: "completed",
      address: "Rua das Flores, 123 - Centro",
      phone: "(11) 3333-4444",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      review: "Excelente atendimento! Ana é muito profissional e o resultado ficou perfeito.",
      canReview: false,
    },
    {
      id: 5,
      salon: "Beauty Studio",
      professional: "Carlos Lima",
      service: "Corte Masculino + Barba",
      date: "2023-12-28",
      time: "11:00",
      duration: "60 min",
      price: 65,
      status: "completed",
      address: "Av. Principal, 456 - Jardins",
      phone: "(11) 2222-3333",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4,
      review: "Muito bom! Recomendo.",
      canReview: false,
    },
    {
      id: 6,
      salon: "Spa Relax",
      professional: "Fernanda Oliveira",
      service: "Limpeza de Pele",
      date: "2023-12-20",
      time: "14:00",
      duration: "90 min",
      price: 150,
      status: "cancelled",
      address: "Rua da Paz, 321 - Moema",
      phone: "(11) 4444-5555",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: null,
      canReview: false,
    },
  ]

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

  const handleSubmitReview = (appointmentId: number) => {
    // Implementar lógica de envio da avaliação
    console.log("Review submitted:", { appointmentId, rating: selectedRating, review: reviewText })
    setSelectedRating(0)
    setReviewText("")
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
            className={`w-5 h-5 cursor-pointer transition-colors ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            } ${readonly ? "cursor-default" : "hover:text-yellow-400"}`}
            onClick={() => !readonly && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    )
  }

  const filteredPastAppointments = pastAppointments.filter((appointment) => {
    if (filterPeriod === "all") return true

    const appointmentDate = new Date(appointment.date)
    const now = new Date()
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

  return (
    <div className="min-h-screen bg-[#EFEFEF] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#313131] mb-2">Meus Agendamentos</h1>
          <p className="text-[#313131]/70">Gerencie seus agendamentos e avalie os serviços</p>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Próximos ({upcomingAppointments.length})</TabsTrigger>
            <TabsTrigger value="history">Histórico ({pastAppointments.length})</TabsTrigger>
          </TabsList>

          {/* Upcoming Appointments */}
          <TabsContent value="upcoming">
            <div className="space-y-6">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id} className="border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={appointment.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-[#FF96B2] text-white">
                              {appointment.professional
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-[#313131]">{appointment.service}</CardTitle>
                            <CardDescription className="text-base">
                              {appointment.salon} • {appointment.professional}
                            </CardDescription>
                          </div>
                        </div>
                        {getStatusBadge(appointment.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center text-[#313131]/70">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(appointment.date).toLocaleDateString("pt-BR", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                          <div className="flex items-center text-[#313131]/70">
                            <Clock className="w-4 h-4 mr-2" />
                            {appointment.time} • {appointment.duration}
                          </div>
                          <div className="flex items-center text-[#313131]/70">
                            <MapPin className="w-4 h-4 mr-2" />
                            {appointment.address}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center text-[#313131]/70">
                            <Phone className="w-4 h-4 mr-2" />
                            {appointment.phone}
                          </div>
                          <div className="text-2xl font-bold text-[#FF96B2]">R$ {appointment.price}</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-4 border-t border-[#EFEFEF]">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#FF96B2] text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white"
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Contatar
                        </Button>
                        {appointment.canReschedule && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#FF96B2] text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white"
                          >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Reagendar
                          </Button>
                        )}
                        {appointment.canCancel && (
                          <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
                            <X className="w-4 h-4 mr-2" />
                            Cancelar
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="border-0 shadow-lg">
                  <CardContent className="text-center py-12">
                    <Calendar className="w-16 h-16 mx-auto mb-4 text-[#313131]/30" />
                    <h3 className="text-xl font-semibold text-[#313131] mb-2">Nenhum agendamento próximo</h3>
                    <p className="text-[#313131]/70 mb-4">Que tal agendar um novo serviço?</p>
                    <Button className="bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white">Agendar Serviço</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* History */}
          <TabsContent value="history">
            <div className="space-y-6">
              {/* Filter */}
              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                    <Label htmlFor="period">Filtrar por período:</Label>
                    <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                      <SelectTrigger className="w-48 border-[#EFEFEF] focus:border-[#FF96B2]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os períodos</SelectItem>
                        <SelectItem value="week">Última semana</SelectItem>
                        <SelectItem value="month">Último mês</SelectItem>
                        <SelectItem value="3months">Últimos 3 meses</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* History List */}
              {filteredPastAppointments.length > 0 ? (
                filteredPastAppointments.map((appointment) => (
                  <Card key={appointment.id} className="border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={appointment.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-[#FF96B2] text-white">
                              {appointment.professional
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-[#313131]">{appointment.service}</CardTitle>
                            <CardDescription className="text-base">
                              {appointment.salon} • {appointment.professional}
                            </CardDescription>
                          </div>
                        </div>
                        {getStatusBadge(appointment.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center text-[#313131]/70">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(appointment.date).toLocaleDateString("pt-BR")}
                          </div>
                          <div className="flex items-center text-[#313131]/70">
                            <Clock className="w-4 h-4 mr-2" />
                            {appointment.time} • {appointment.duration}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#FF96B2]">R$ {appointment.price}</div>
                        </div>
                      </div>

                      {/* Rating Section */}
                      {appointment.status === "completed" && (
                        <div className="pt-4 border-t border-[#EFEFEF]">
                          {appointment.rating ? (
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-[#313131]">Sua avaliação:</span>
                                <StarRating rating={appointment.rating} readonly />
                              </div>
                              {appointment.review && (
                                <p className="text-sm text-[#313131]/70 bg-[#EFEFEF] p-3 rounded-lg">
                                  "{appointment.review}"
                                </p>
                              )}
                            </div>
                          ) : (
                            appointment.canReview && (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-[#FF96B2] text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white"
                                  >
                                    <Star className="w-4 h-4 mr-2" />
                                    Avaliar Atendimento
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                  <DialogHeader>
                                    <DialogTitle className="text-[#313131]">Avaliar Atendimento</DialogTitle>
                                    <DialogDescription>
                                      Como foi sua experiência com {appointment.professional}?
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label className="text-sm font-medium text-[#313131]">Nota geral</Label>
                                      <div className="mt-2">
                                        <StarRating rating={selectedRating} onRatingChange={setSelectedRating} />
                                      </div>
                                    </div>
                                    <div>
                                      <Label htmlFor="review" className="text-sm font-medium text-[#313131]">
                                        Comentário (opcional)
                                      </Label>
                                      <Textarea
                                        id="review"
                                        placeholder="Conte como foi sua experiência..."
                                        className="mt-2 border-[#EFEFEF] focus:border-[#FF96B2]"
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                      />
                                    </div>
                                    <div className="flex space-x-2">
                                      <Button
                                        className="flex-1 bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white"
                                        onClick={() => handleSubmitReview(appointment.id)}
                                        disabled={selectedRating === 0}
                                      >
                                        Enviar Avaliação
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            )
                          )}
                        </div>
                      )}

                      {/* Repeat Service */}
                      {appointment.status === "completed" && (
                        <div className="flex justify-end">
                          <Button size="sm" className="bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white">
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Agendar Novamente
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="border-0 shadow-lg">
                  <CardContent className="text-center py-12">
                    <CheckCircle className="w-16 h-16 mx-auto mb-4 text-[#313131]/30" />
                    <h3 className="text-xl font-semibold text-[#313131] mb-2">Nenhum histórico encontrado</h3>
                    <p className="text-[#313131]/70">Tente ajustar o filtro de período</p>
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
