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
    <div className="min-h-screen bg-background dark:bg-zinc-900 p-6 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground dark:text-white mb-2">Painel Administrativo</h1>
          <p className="text-muted-foreground dark:text-zinc-400">Gerencie seu salão de forma eficiente</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-card dark:bg-zinc-800 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground dark:text-zinc-300">Agendamentos Hoje</CardTitle>
              <Calendar className="h-4 w-4 text-pink-400 dark:text-pink-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground dark:text-white">24</div>
              <p className="text-xs text-muted-foreground dark:text-zinc-400">
                <span className="text-green-600 dark:text-green-400">+12%</span> em relação a ontem
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-card dark:bg-zinc-800 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground dark:text-zinc-300">Receita do Mês</CardTitle>
              <DollarSign className="h-4 w-4 text-pink-400 dark:text-pink-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground dark:text-white">R$ 12.450</div>
              <p className="text-xs text-muted-foreground dark:text-zinc-400">
                <span className="text-green-600 dark:text-green-400">+8%</span> em relação ao mês passado
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-card dark:bg-zinc-800 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground dark:text-zinc-300">Total de Clientes</CardTitle>
              <Users className="h-4 w-4 text-pink-400 dark:text-pink-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground dark:text-white">342</div>
              <p className="text-xs text-muted-foreground dark:text-zinc-400">
                <span className="text-green-600 dark:text-green-400">+18</span> novos este mês
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-card dark:bg-zinc-800 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground dark:text-zinc-300">Taxa de Ocupação</CardTitle>
              <TrendingUp className="h-4 w-4 text-pink-400 dark:text-pink-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground dark:text-white">87%</div>
              <p className="text-xs text-muted-foreground dark:text-zinc-400">
                <span className="text-green-600 dark:text-green-400">+5%</span> esta semana
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted dark:bg-zinc-600 transition-colors">
            <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
            <TabsTrigger value="professionals">Profissionais</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <Card className="border-0 shadow-lg bg-card dark:bg-zinc-800 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-foreground dark:text-white">Agendamentos</CardTitle>
                    <CardDescription className="dark:text-zinc-400">Gerencie todos os agendamentos do salão</CardDescription>
                  </div>
                  <Button className="bg-pink-400 dark:bg-pink-500 hover:bg-pink-400/90 dark:hover:bg-pink-500/90 text-white">Novo Agendamento</Button>
                </div>
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground dark:text-zinc-400" />
                    <Input
                      placeholder="Buscar agendamentos..."
                      className="pl-10 border-border dark:border-zinc-700 focus:border-pink-400 dark:focus:border-pink-500 bg-background dark:bg-zinc-900 text-foreground dark:text-white transition-colors"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="border-pink-400 dark:border-pink-500 text-pink-400 dark:text-pink-500 hover:bg-pink-400 hover:text-white dark:hover:bg-pink-500 dark:hover:text-white"
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
                      <TableHead className="dark:text-zinc-300">Cliente</TableHead>
                      <TableHead className="dark:text-zinc-300">Serviço</TableHead>
                      <TableHead className="dark:text-zinc-300">Profissional</TableHead>
                      <TableHead className="dark:text-zinc-300">Data/Hora</TableHead>
                      <TableHead className="dark:text-zinc-300">Status</TableHead>
                      <TableHead className="dark:text-zinc-300">Valor</TableHead>
                      <TableHead className="dark:text-zinc-300">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id} className="hover:bg-muted dark:hover:bg-zinc-700 transition-colors">
                        <TableCell className="font-medium dark:text-white">{appointment.client}</TableCell>
                        <TableCell className="dark:text-zinc-200">{appointment.service}</TableCell>
                        <TableCell className="dark:text-zinc-200">{appointment.professional}</TableCell>
                        <TableCell className="dark:text-zinc-200">
                          {new Date(appointment.date).toLocaleDateString("pt-BR")} {appointment.time}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              appointment.status === "Confirmado"
                                ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300"
                            }
                          >
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-pink-400 dark:text-pink-300">{appointment.price}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-600 dark:text-red-400">
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
            <Card className="border-0 shadow-lg bg-card dark:bg-zinc-800 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-foreground dark:text-white">Clientes</CardTitle>
                    <CardDescription className="dark:text-zinc-400">Gerencie a base de clientes do salão</CardDescription>
                  </div>
                  <Button className="bg-pink-400 dark:bg-pink-500 hover:bg-pink-400/90 dark:hover:bg-pink-500/90 text-white">Novo Cliente</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="dark:text-zinc-300">Nome</TableHead>
                      <TableHead className="dark:text-zinc-300">E-mail</TableHead>
                      <TableHead className="dark:text-zinc-300">Telefone</TableHead>
                      <TableHead className="dark:text-zinc-300">Última Visita</TableHead>
                      <TableHead className="dark:text-zinc-300">Total Gasto</TableHead>
                      <TableHead className="dark:text-zinc-300">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow key={client.id} className="hover:bg-muted dark:hover:bg-zinc-700 transition-colors">
                        <TableCell className="font-medium dark:text-white">{client.name}</TableCell>
                        <TableCell className="dark:text-zinc-200">{client.email}</TableCell>
                        <TableCell className="dark:text-zinc-200">{client.phone}</TableCell>
                        <TableCell className="dark:text-zinc-200">{new Date(client.lastVisit).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell className="font-semibold text-pink-400 dark:text-pink-300">{client.totalSpent}</TableCell>
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
            <Card className="border-0 shadow-lg bg-card dark:bg-zinc-800 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-foreground dark:text-white">Profissionais</CardTitle>
                    <CardDescription className="dark:text-zinc-400">Gerencie a equipe do salão</CardDescription>
                  </div>
                  <Button className="bg-pink-400 dark:bg-pink-500 hover:bg-pink-400/90 dark:hover:bg-pink-500/90 text-white">Novo Profissional</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="dark:text-zinc-300">Nome</TableHead>
                      <TableHead className="dark:text-zinc-300">Especialidade</TableHead>
                      <TableHead className="dark:text-zinc-300">Avaliação</TableHead>
                      <TableHead className="dark:text-zinc-300">Agendamentos</TableHead>
                      <TableHead className="dark:text-zinc-300">Receita</TableHead>
                      <TableHead className="dark:text-zinc-300">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {professionals.map((professional) => (
                      <TableRow key={professional.id} className="hover:bg-muted dark:hover:bg-zinc-700 transition-colors">
                        <TableCell className="font-medium dark:text-white">{professional.name}</TableCell>
                        <TableCell className="dark:text-zinc-200">{professional.specialty}</TableCell>
                        <TableCell>
                          <Badge className="bg-pink-400 dark:bg-pink-500 text-white">⭐ {professional.rating}</Badge>
                        </TableCell>
                        <TableCell className="dark:text-zinc-200">{professional.appointments}</TableCell>
                        <TableCell className="font-semibold text-pink-400 dark:text-pink-300">{professional.revenue}</TableCell>
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
              <Card className="border-0 shadow-lg bg-card dark:bg-zinc-800 transition-colors">
                <CardHeader>
                  <CardTitle className="text-foreground dark:text-white">Receita Mensal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted dark:bg-zinc-700 rounded-lg transition-colors">
                    <p className="text-muted-foreground dark:text-zinc-400">Gráfico de receita mensal</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-card dark:bg-zinc-800 transition-colors">
                <CardHeader>
                  <CardTitle className="text-foreground dark:text-white">Serviços Mais Populares</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted dark:bg-zinc-700 rounded-lg transition-colors">
                    <p className="text-muted-foreground dark:text-zinc-400">Gráfico de serviços populares</p>
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
