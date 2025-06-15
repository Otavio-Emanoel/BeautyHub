"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar as CalendarIcon, Clock, User, Scissors, MapPin, MessageSquare, CheckCircle } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"

export default function BookingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const salonId = searchParams.get("salonId")
  const serviceId = searchParams.get("serviceId")
  const professionalId = searchParams.get("professionalId")

  const [services, setServices] = useState<any[]>([])
  const [professionals, setProfessionals] = useState<any[]>([])
  const [selectedService, setSelectedService] = useState<any>(null)
  const [selectedProfessional, setSelectedProfessional] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState("")
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        if (salonId) {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/salons/${salonId}`)
          const data = await res.json()
          setServices(data.services || [])
          setProfessionals(data.professionals || [])
        } else {
          if (!serviceId || !professionalId) {
            alert("Serviço ou profissional não selecionado!")
            router.push("/services")
            return
          }
          const [serviceRes, profRes] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professional/services-public`),
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professional/public-profile/${professionalId}`)
          ])
          const serviceData = await serviceRes.json()
          const profData = await profRes.json()
          let selected = null
          if (serviceData.services && Array.isArray(serviceData.services)) {
            selected = (serviceData.services as { id: string }[]).find(s => s.id === serviceId) || null
          }
          setServices(selected ? [selected] : [])
          setSelectedService(selected)
          setProfessionals(profData.profile ? [{ ...profData.profile, id: profData.profile.uid || professionalId }] : [])
          setSelectedProfessional(profData.profile ? { ...profData.profile, id: profData.profile.uid || professionalId } : null)
        }
      } catch (e) {
        setServices([])
        setProfessionals([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [salonId, serviceId, professionalId, router])

  useEffect(() => {
    if (!selectedProfessional && professionals.length === 1) {
      setSelectedProfessional(professionals[0])
    }
  }, [professionals, selectedProfessional])

  // Gera horários disponíveis (exemplo fixo: 09:00 às 18:00, de 30 em 30 min)
  function getAvailableTimes() {
    const times: string[] = []
    for (let h = 9; h < 18; h++) {
      times.push(`${h.toString().padStart(2, "0")}:00`)
      times.push(`${h.toString().padStart(2, "0")}:30`)
    }
    times.push("18:00")
    return times
  }

  const handleBooking = async () => {
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
      const body: any = {
        serviceId: selectedService.id,
        professionalId: selectedProfessional.id || professionalId,
        date: selectedDate.toISOString().split("T")[0],
        time: selectedTime,
        note: notes,
      }
      if (salonId) body.salonId = salonId
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedules/appointment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error("Erro ao agendar")
      alert("Agendamento realizado com sucesso!")
      router.push("/appoint")
    } catch (e) {
      alert("Erro ao agendar")
    }
  }

  if (loading) return <div className="p-6 text-[#313131] dark:text-white">Carregando...</div>

  return (
    <div className="min-h-screen bg-[#EFEFEF] dark:bg-[#18181b] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#313131] dark:text-white mb-2">Agendar Serviço</h1>
          <p className="text-[#313131]/70 dark:text-white/70">Escolha o serviço, profissional e horário desejado</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Serviço */}
          <Card className="border-0 shadow-lg bg-white dark:bg-[#232326]">
            <CardHeader>
              <CardTitle className="flex items-center text-[#313131] dark:text-white">
                <Scissors className="w-5 h-5 mr-2 text-[#FF96B2]" />
                Serviço
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={selectedService?.id || ""}
                onValueChange={id => {
                  const s = services.find(s => s.id === id)
                  setSelectedService(s)
                }}
                disabled={!!serviceId}
              >
                <SelectTrigger className="mb-4 border-[#EFEFEF] dark:border-[#232326] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white">
                  <SelectValue placeholder="Selecione o serviço" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#232326] text-[#313131] dark:text-white">
                  {services.map(service => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name} - R$ {service.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedService && (
                <div className="mb-2 text-[#313131] dark:text-white/80">
                  <p className="mb-1"><strong>Descrição:</strong> {selectedService.description}</p>
                  <p className="mb-1"><strong>Duração:</strong> {selectedService.duration} min</p>
                  <p className="mb-1"><strong>Categoria:</strong> {selectedService.category}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Profissional */}
          <Card className="border-0 shadow-lg bg-white dark:bg-[#232326]">
            <CardHeader>
              <CardTitle className="flex items-center text-[#313131] dark:text-white">
                <User className="w-5 h-5 mr-2 text-[#FF96B2]" />
                Profissional
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={selectedProfessional?.id || ""}
                onValueChange={id => {
                  const p = professionals.find(p => p.id === id || p.uid === id)
                  setSelectedProfessional(p)
                }}
                disabled={!!professionalId || professionals.length === 1}
              >
                <SelectTrigger className="mb-4 border-[#EFEFEF] dark:border-[#232326] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white">
                  <SelectValue placeholder="Selecione o profissional" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#232326] text-[#313131] dark:text-white">
                  {professionals.map(prof => (
                    <SelectItem key={prof.id || prof.uid} value={prof.id || prof.uid}>
                      {prof.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedProfessional && (
                <div className="mb-2 text-[#313131] dark:text-white/80">
                  <p className="mb-1"><strong>Experiência:</strong> {selectedProfessional.experience}</p>
                  <p className="mb-1"><strong>Localização:</strong> {selectedProfessional.location}</p>
                  {selectedProfessional.phone && (
                    <p className="mb-1 flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1 text-green-500" />
                      <a
                        href={`https://wa.me/55${(selectedProfessional.phone || "").replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        WhatsApp
                      </a>
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Data e horários disponíveis */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Card className="border-0 shadow-lg bg-white dark:bg-[#232326]">
            <CardHeader>
              <CardTitle className="flex items-center text-[#313131] dark:text-white">
                <CalendarIcon className="w-5 h-5 mr-2 text-[#FF96B2]" />
                Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                fromDate={new Date()}
              />
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white dark:bg-[#232326]">
            <CardHeader>
              <CardTitle className="flex items-center text-[#313131] dark:text-white">
                <Clock className="w-5 h-5 mr-2 text-[#FF96B2]" />
                Horário Disponível
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {getAvailableTimes().map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className={
                      selectedTime === time
                        ? "bg-[#FF96B2] text-white"
                        : "border-[#FF96B2] text-[#FF96B2] dark:border-[#FF96B2] dark:text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white"
                    }
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Observações */}
        <Card className="border-0 shadow-lg bg-white dark:bg-[#232326] mt-6">
          <CardHeader>
            <CardTitle className="flex items-center text-[#313131] dark:text-white">
              <MapPin className="w-5 h-5 mr-2 text-[#FF96B2]" />
              Observações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Observações para o profissional (opcional)"
              className="mb-4 border-[#EFEFEF] dark:border-[#232326] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white"
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-end">
          <Button
            className="bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white dark:bg-[#FF96B2] dark:hover:bg-[#be185d] dark:text-white"
            size="lg"
            onClick={handleBooking}
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Confirmar Agendamento
          </Button>
        </div>
      </div>
    </div>
  )
}