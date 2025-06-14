"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { User, Scissors, CalendarIcon } from "lucide-react"

export default function BookingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const salonId = searchParams.get("salonId") // Exemplo: /booking?salonId=abc123

  const [services, setServices] = useState<any[]>([])
  const [professionals, setProfessionals] = useState<any[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedService, setSelectedService] = useState<any>(null)
  const [selectedProfessional, setSelectedProfessional] = useState<any>(null)
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(true)

  // Horários disponíveis (mock)
  const timeSlots = [
    "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"
  ]

  // Buscar serviços e profissionais do salão
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        // Se não tiver salonId, redireciona ou mostra erro
        if (!salonId) {
          alert("Salão não selecionado!")
          router.push("/salons")
          return
        }
        // Busca dados do salão
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/salons/${salonId}`)
        const data = await res.json()
        setServices(data.services || [])
        setProfessionals(data.professionals || [])
      } catch (e) {
        setServices([])
        setProfessionals([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [salonId, router])

  // Função para agendar
  const handleBooking = async () => {
  // Verifica se está logado
  const token = localStorage.getItem("token")
  if (!token) {
    alert("Você precisa estar logado para agendar!")
    router.push("/auth/login")
    return
  }

  if (!selectedService || !selectedProfessional || !selectedDate || !selectedTime) {
    alert("Preencha todos os campos!")
    return
  }
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedules/appointment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        salonId,
        serviceId: selectedService.id,
        professionalId: selectedProfessional.id,
        date: selectedDate.toISOString().split("T")[0],
        time: selectedTime,
        note: notes,
      }),
    })
    if (!res.ok) throw new Error("Erro ao agendar")
    alert("Agendamento realizado com sucesso!")
    router.push("/appoint")
  } catch (e) {
    alert("Erro ao agendar")
  }
}

  if (loading) return <div className="p-6">Carregando...</div>

  return (
    <div className="min-h-screen bg-[#EFEFEF] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#313131] mb-2">Agendar Serviço</h1>
          <p className="text-[#313131]/70">Escolha o serviço, profissional e horário desejado</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Selection */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-[#313131]">
                  <Scissors className="w-5 h-5 mr-2 text-[#FF96B2]" />
                  Escolha o Serviço
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedService?.id === service.id
                          ? "border-[#FF96B2] bg-[#FF96B2]/10"
                          : "border-[#EFEFEF] hover:border-[#FF96B2]/50"
                      }`}
                      onClick={() => setSelectedService(service)}
                    >
                      <h3 className="font-medium text-[#313131]">{service.name}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {service.duration} min
                        </Badge>
                        <span className="font-semibold text-[#FF96B2]">R$ {service.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Professional Selection */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-[#313131]">
                  <User className="w-5 h-5 mr-2 text-[#FF96B2]" />
                  Escolha o Profissional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {professionals.map((professional) => (
                    <div
                      key={professional.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedProfessional?.id === professional.id
                          ? "border-[#FF96B2] bg-[#FF96B2]/10"
                          : "border-[#EFEFEF] hover:border-[#FF96B2]/50"
                      }`}
                      onClick={() => setSelectedProfessional(professional)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-[#313131]">{professional.name}</h3>
                          <p className="text-sm text-[#313131]/70">{professional.specialty}</p>
                        </div>
                        <Badge className="bg-[#FF96B2] text-white">⭐ {professional.rating || "5.0"}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Date and Time Selection */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-[#313131]">
                  <CalendarIcon className="w-5 h-5 mr-2 text-[#FF96B2]" />
                  Data e Horário
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-[#313131] mb-3">Escolha a data</h3>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border border-[#EFEFEF]"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#313131] mb-3">Horários disponíveis</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          className={
                            selectedTime === time
                              ? "bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white"
                              : "border-[#EFEFEF] text-[#313131] hover:border-[#FF96B2] hover:text-[#FF96B2]"
                          }
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#313131]">Observações (Opcional)</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Alguma observação especial para o seu agendamento..."
                  className="border-[#EFEFEF] focus:border-[#FF96B2]"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="border-0 shadow-lg sticky top-6">
              <CardHeader>
                <CardTitle className="text-[#313131]">Resumo do Agendamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedService && (
                  <div className="flex justify-between">
                    <span className="text-[#313131]/70">Serviço:</span>
                    <span className="font-medium text-[#313131]">{selectedService.name}</span>
                  </div>
                )}

                {selectedProfessional && (
                  <div className="flex justify-between">
                    <span className="text-[#313131]/70">Profissional:</span>
                    <span className="font-medium text-[#313131]">{selectedProfessional.name}</span>
                  </div>
                )}

                {selectedDate && (
                  <div className="flex justify-between">
                    <span className="text-[#313131]/70">Data:</span>
                    <span className="font-medium text-[#313131]">{selectedDate.toLocaleDateString("pt-BR")}</span>
                  </div>
                )}

                {selectedTime && (
                  <div className="flex justify-between">
                    <span className="text-[#313131]/70">Horário:</span>
                    <span className="font-medium text-[#313131]">{selectedTime}</span>
                  </div>
                )}

                <div className="border-t border-[#EFEFEF] pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#313131]">Total:</span>
                    <span className="text-xl font-bold text-[#FF96B2]">
                      {selectedService ? `R$ ${selectedService.price}` : "R$ 0"}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white"
                  onClick={handleBooking}
                  disabled={!selectedService || !selectedProfessional || !selectedDate || !selectedTime}
                >
                  Confirmar Agendamento
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}