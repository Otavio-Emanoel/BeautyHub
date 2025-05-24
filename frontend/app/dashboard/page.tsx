"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, DollarSign, Users, TrendingUp, Star } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#EFEFEF] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#313131] mb-2">Dashboard</h1>
          <p className="text-[#313131]/70">Bem-vindo de volta! Aqui está um resumo do seu negócio.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#313131]/70">Agendamentos Hoje</CardTitle>
              <Calendar className="h-4 w-4 text-[#FF96B2]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#313131]">24</div>
              <p className="text-xs text-[#313131]/70">
                <span className="text-green-600">+12%</span> em relação a ontem
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#313131]/70">Receita do Mês</CardTitle>
              <DollarSign className="h-4 w-4 text-[#FF96B2]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#313131]">R$ 12.450</div>
              <p className="text-xs text-[#313131]/70">
                <span className="text-green-600">+8%</span> em relação ao mês passado
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#313131]/70">Novos Clientes</CardTitle>
              <Users className="h-4 w-4 text-[#FF96B2]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#313131]">18</div>
              <p className="text-xs text-[#313131]/70">
                <span className="text-green-600">+23%</span> este mês
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#313131]/70">Avaliação Média</CardTitle>
              <Star className="h-4 w-4 text-[#FF96B2]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#313131]">4.8</div>
              <p className="text-xs text-[#313131]/70">Baseado em 156 avaliações</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Próximos Agendamentos */}
          <Card className="lg:col-span-2 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#313131]">Próximos Agendamentos</CardTitle>
              <CardDescription>Agendamentos para hoje</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: "09:00", client: "Maria Silva", service: "Corte + Escova", professional: "Ana Costa" },
                  { time: "10:30", client: "João Santos", service: "Barba", professional: "Carlos Lima" },
                  { time: "11:00", client: "Fernanda Oliveira", service: "Manicure", professional: "Lucia Mendes" },
                  { time: "14:00", client: "Pedro Alves", service: "Corte Masculino", professional: "Carlos Lima" },
                ].map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-[#EFEFEF] rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-[#FF96B2] text-white rounded-lg font-semibold">
                        {appointment.time}
                      </div>
                      <div>
                        <p className="font-medium text-[#313131]">{appointment.client}</p>
                        <p className="text-sm text-[#313131]/70">{appointment.service}</p>
                        <p className="text-xs text-[#313131]/50">{appointment.professional}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#FF96B2] text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white"
                    >
                      Ver detalhes
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ações Rápidas */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#313131]">Ações Rápidas</CardTitle>
              <CardDescription>Acesso rápido às principais funcionalidades</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white">
                <Calendar className="w-4 h-4 mr-2" />
                Novo Agendamento
              </Button>
              <Button
                variant="outline"
                className="w-full border-[#FF96B2] text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white"
              >
                <Users className="w-4 h-4 mr-2" />
                Cadastrar Cliente
              </Button>
              <Button
                variant="outline"
                className="w-full border-[#FF96B2] text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Ver Relatórios
              </Button>
              <Button
                variant="outline"
                className="w-full border-[#FF96B2] text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white"
              >
                <Clock className="w-4 h-4 mr-2" />
                Gerenciar Horários
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
