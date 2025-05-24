"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { User, Scissors, CalendarIcon } from "lucide-react"

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedService, setSelectedService] = useState("")
  const [selectedProfessional, setSelectedProfessional] = useState("")
  const [notes, setNotes] = useState("")

  const services = [
    { id: 1, name: "Corte Feminino", duration: "45 min", price: "R$ 80" },
    { id: 2, name: "Corte Masculino", duration: "30 min", price: "R$ 50" },
    { id: 3, name: "Escova", duration: "60 min", price: "R$ 60" },
    { id: 4, name: "Coloração", duration: "120 min", price: "R$ 150" },
    { id: 5, name: "Manicure", duration: "45 min", price: "R$ 35" },
    { id: 6, name: "Pedicure", duration: "60 min", price: "R$ 45" },
  ]

  const professionals = [
    { id: 1, name: "Ana Costa", specialty: "Cortes e Coloração", rating: 4.9 },
    { id: 2, name: "Carlos Lima", specialty: "Cortes Masculinos", rating: 4.8 },
    { id: 3, name: "Lucia Mendes", specialty: "Manicure e Pedicure", rating: 4.7 },
  ]

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
  ]

  const handleBooking = () => {
    // Implementar lógica de agendamento
    console.log({
      date: selectedDate,
      time: selectedTime,
      service: selectedService,
      professional: selectedProfessional,
      notes,
    })
  }

  return (
    <div className="min-h-screen bg-[#EFEFEF] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
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
                        selectedService === service.name
                          ? "border-[#FF96B2] bg-[#FF96B2]/10"
                          : "border-[#EFEFEF] hover:border-[#FF96B2]/50"
                      }`}
                      onClick={() => setSelectedService(service.name)}
                    >
                      <h3 className="font-medium text-[#313131]">{service.name}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {service.duration}
                        </Badge>
                        <span className="font-semibold text-[#FF96B2]">{service.price}</span>
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
                        selectedProfessional === professional.name
                          ? "border-[#FF96B2] bg-[#FF96B2]/10"
                          : "border-[#EFEFEF] hover:border-[#FF96B2]/50"
                      }`}
                      onClick={() => setSelectedProfessional(professional.name)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-[#313131]">{professional.name}</h3>
                          <p className="text-sm text-[#313131]/70">{professional.specialty}</p>
                        </div>
                        <Badge className="bg-[#FF96B2] text-white">⭐ {professional.rating}</Badge>
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
                    <span className="font-medium text-[#313131]">{selectedService}</span>
                  </div>
                )}

                {selectedProfessional && (
                  <div className="flex justify-between">
                    <span className="text-[#313131]/70">Profissional:</span>
                    <span className="font-medium text-[#313131]">{selectedProfessional}</span>
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
                      {selectedService ? services.find((s) => s.name === selectedService)?.price : "R$ 0"}
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
