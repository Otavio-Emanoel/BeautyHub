"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Phone, MapPin, Camera, Calendar, Clock } from "lucide-react"

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: "Maria Silva",
    email: "maria.silva@email.com",
    phone: "(11) 99999-9999",
    address: "Rua das Flores, 123 - São Paulo, SP",
    bio: "Apaixonada por beleza e bem-estar. Sempre em busca dos melhores tratamentos para cuidar de mim.",
  })

  const appointments = [
    {
      id: 1,
      salon: "Salão Elegance",
      service: "Corte + Escova",
      professional: "Ana Costa",
      date: "2024-01-15",
      time: "14:00",
      status: "Confirmado",
      price: "R$ 140",
    },
    {
      id: 2,
      salon: "Beauty Studio",
      service: "Manicure",
      professional: "Lucia Mendes",
      date: "2024-01-10",
      time: "16:00",
      status: "Concluído",
      price: "R$ 35",
    },
  ]

  const handleSave = () => {
    // Implementar lógica de salvamento
    console.log("Profile saved:", profileData)
  }

  return (
    <div className="min-h-screen bg-[#EFEFEF] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#313131] mb-2">Meu Perfil</h1>
          <p className="text-[#313131]/70">Gerencie suas informações pessoais e histórico</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
            <TabsTrigger value="preferences">Preferências</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Profile Picture */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-[#313131]">Foto do Perfil</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="relative inline-block">
                    <Avatar className="w-32 h-32 mx-auto mb-4">
                      <AvatarImage src="/placeholder.svg?height=128&width=128" />
                      <AvatarFallback className="text-2xl bg-[#FF96B2] text-white">
                        {profileData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute bottom-4 right-0 rounded-full w-10 h-10 p-0 bg-[#FF96B2] hover:bg-[#FF96B2]/90"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    className="border-[#FF96B2] text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white"
                  >
                    Alterar Foto
                  </Button>
                </CardContent>
              </Card>

              {/* Profile Form */}
              <Card className="lg:col-span-2 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#313131]">Informações Pessoais</CardTitle>
                  <CardDescription>Atualize suas informações pessoais</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50" />
                        <Input
                          id="name"
                          className="pl-10 border-[#EFEFEF] focus:border-[#FF96B2]"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50" />
                        <Input
                          id="email"
                          type="email"
                          className="pl-10 border-[#EFEFEF] focus:border-[#FF96B2]"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50" />
                        <Input
                          id="phone"
                          className="pl-10 border-[#EFEFEF] focus:border-[#FF96B2]"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Endereço</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50" />
                        <Input
                          id="address"
                          className="pl-10 border-[#EFEFEF] focus:border-[#FF96B2]"
                          value={profileData.address}
                          onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Sobre você</Label>
                    <Textarea
                      id="bio"
                      placeholder="Conte um pouco sobre você..."
                      className="border-[#EFEFEF] focus:border-[#FF96B2]"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    />
                  </div>

                  <Button className="w-full bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white" onClick={handleSave}>
                    Salvar Alterações
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#313131]">Histórico de Agendamentos</CardTitle>
                <CardDescription>Visualize seus agendamentos passados e futuros</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="p-4 border border-[#EFEFEF] rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-[#313131]">{appointment.salon}</h3>
                          <p className="text-[#313131]/70">{appointment.service}</p>
                          <p className="text-sm text-[#313131]/50">com {appointment.professional}</p>
                        </div>
                        <Badge
                          className={
                            appointment.status === "Confirmado"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {appointment.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-[#313131]/70">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(appointment.date).toLocaleDateString("pt-BR")}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {appointment.time}
                          </div>
                        </div>
                        <span className="font-semibold text-[#FF96B2]">{appointment.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#313131]">Preferências</CardTitle>
                <CardDescription>Configure suas preferências de notificação e privacidade</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium text-[#313131] mb-3">Notificações</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[#313131]/70">Lembrete de agendamento</span>
                      <Button variant="outline" size="sm" className="border-[#FF96B2] text-[#FF96B2]">
                        Ativado
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#313131]/70">Promoções e ofertas</span>
                      <Button variant="outline" size="sm" className="border-[#FF96B2] text-[#FF96B2]">
                        Ativado
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#313131]/70">Novos salões na região</span>
                      <Button variant="outline" size="sm" className="border-gray-300 text-gray-500">
                        Desativado
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-[#313131] mb-3">Privacidade</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[#313131]/70">Perfil público</span>
                      <Button variant="outline" size="sm" className="border-gray-300 text-gray-500">
                        Desativado
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#313131]/70">Compartilhar avaliações</span>
                      <Button variant="outline" size="sm" className="border-[#FF96B2] text-[#FF96B2]">
                        Ativado
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
