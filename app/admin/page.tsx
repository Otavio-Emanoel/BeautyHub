"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Users, DollarSign, TrendingUp, Search, Filter, Eye, Edit, Trash2 } from "lucide-react"

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const appointments = [
    {
      id: 1,
      client: "Maria Silva",
      service: "Corte + Escova",
      professional: "Ana Costa",
      date: "2024-01-15",
      time: "14:00",
      status: "Confirmado",
      price: "R$ 140",
    },
    {
      id: 2,
      client: "João Santos",
      service: "Corte Masculino",
      professional: "Carlos Lima",
      date: "2024-01-15",
      time: "15:30",
      status: "Confirmado",
      price: "R$ 50",
    },
    {
      id: 3,
      client: "Fernanda Oliveira",
      service: "Manicure",
      professional: "Lucia Mendes",
      date: "2024-01-15",
      time: "16:00",
      status: "Concluído",
      price: "R$ 35",
    },
  ]

  const clients = [
    {
      id: 1,
      name: "Maria Silva",
      email: "maria@email.com",
      phone: "(11) 99999-9999",
      lastVisit: "2024-01-10",
      totalSpent: "R$ 450",
    },
    {
      id: 2,
      name: "João Santos",
      email: "joao@email.com",
      phone: "(11) 88888-8888",
      lastVisit: "2024-01-08",
      totalSpent: "R$ 200",
    },
  ]

  const professionals = [
    {
      id: 1,
      name: "Ana Costa",
      specialty: "Cortes e Coloração",
      rating: 4.9,
      appointments: 45,
      revenue: "R$ 3.200",
    },
    {
      id: 2,
      name: "Carlos Lima",
      specialty: "Cortes Masculinos",
      rating: 4.8,
      appointments: 38,
      revenue: "R$ 2.100",
    },
  ]

  return (
    <div className="min-h-screen bg-[#EFEFEF] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#313131] mb-2">Painel Administrativo</h1>
          <p className="text-[#313131]/70">Gerencie seu salão de forma eficiente</p>
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
              <CardTitle className="text-sm font-medium text-[#313131]/70">Total de Clientes</CardTitle>
              <Users className="h-4 w-4 text-[#FF96B2]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#313131]">342</div>
              <p className="text-xs text-[#313131]/70">
                <span className="text-green-600">+18</span> novos este mês
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#313131]/70">Taxa de Ocupação</CardTitle>
              <TrendingUp className="h-4 w-4 text-[#FF96B2]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#313131]">87%</div>
              <p className="text-xs text-[#313131]/70">
                <span className="text-green-600">+5%</span> esta semana
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
            <TabsTrigger value="professionals">Profissionais</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-[#313131]">Agendamentos</CardTitle>
                    <CardDescription>Gerencie todos os agendamentos do salão</CardDescription>
                  </div>
                  <Button className="bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white">Novo Agendamento</Button>
                </div>
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50" />
                    <Input
                      placeholder="Buscar agendamentos..."
                      className="pl-10 border-[#EFEFEF] focus:border-[#FF96B2]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="border-[#FF96B2] text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Serviço</TableHead>
                      <TableHead>Profissional</TableHead>
                      <TableHead>Data/Hora</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.client}</TableCell>
                        <TableCell>{appointment.service}</TableCell>
                        <TableCell>{appointment.professional}</TableCell>
                        <TableCell>
                          {new Date(appointment.date).toLocaleDateString("pt-BR")} {appointment.time}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              appointment.status === "Confirmado"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-[#FF96B2]">{appointment.price}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-[#313131]">Clientes</CardTitle>
                    <CardDescription>Gerencie a base de clientes do salão</CardDescription>
                  </div>
                  <Button className="bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white">Novo Cliente</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>E-mail</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>Última Visita</TableHead>
                      <TableHead>Total Gasto</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">{client.name}</TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell>{client.phone}</TableCell>
                        <TableCell>{new Date(client.lastVisit).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell className="font-semibold text-[#FF96B2]">{client.totalSpent}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Professionals Tab */}
          <TabsContent value="professionals">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-[#313131]">Profissionais</CardTitle>
                    <CardDescription>Gerencie a equipe do salão</CardDescription>
                  </div>
                  <Button className="bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white">Novo Profissional</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Especialidade</TableHead>
                      <TableHead>Avaliação</TableHead>
                      <TableHead>Agendamentos</TableHead>
                      <TableHead>Receita</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {professionals.map((professional) => (
                      <TableRow key={professional.id}>
                        <TableCell className="font-medium">{professional.name}</TableCell>
                        <TableCell>{professional.specialty}</TableCell>
                        <TableCell>
                          <Badge className="bg-[#FF96B2] text-white">⭐ {professional.rating}</Badge>
                        </TableCell>
                        <TableCell>{professional.appointments}</TableCell>
                        <TableCell className="font-semibold text-[#FF96B2]">{professional.revenue}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#313131]">Receita Mensal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-[#EFEFEF] rounded-lg">
                    <p className="text-[#313131]/70">Gráfico de receita mensal</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#313131]">Serviços Mais Populares</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-[#EFEFEF] rounded-lg">
                    <p className="text-[#313131]/70">Gráfico de serviços populares</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
