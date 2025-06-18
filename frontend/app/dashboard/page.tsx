"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, DollarSign, Users, TrendingUp, Star, BarChart2, UserCog, Scissors } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

type Appointment = {
  id: string
  time: string
  clientName: string
  clientAvatar?: string
  serviceName: string
  serviceImage?: string
  professionalName: string
}

export default function ProfessionalDashboardPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    todayAppointments: 0,
    todayAppointmentsChange: 0,
    monthRevenue: 0,
    monthRevenueChange: 0,
    newClients: 0,
    newClientsChange: 0,
    avgRating: 0,
    totalReviews: 0,
  })
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [openProfileModal, setOpenProfileModal] = useState(false)
  const [openServicesModal, setOpenServicesModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true)
      try {
        const token = localStorage.getItem("token")
        // Dashboard stats
        const statsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professional/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const statsData = await statsRes.json()
        setStats({
          todayAppointments: statsData.todayAppointments ?? 0,
          todayAppointmentsChange: statsData.todayAppointmentsChange ?? 0,
          monthRevenue: statsData.monthRevenue ?? 0,
          monthRevenueChange: statsData.monthRevenueChange ?? 0,
          newClients: statsData.newClients ?? 0,
          newClientsChange: statsData.newClientsChange ?? 0,
          avgRating: statsData.avgRating ?? 0,
          totalReviews: statsData.totalReviews ?? 0,
        })

        // Próximos agendamentos do dia
        const appointmentsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professional/schedules`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const appointmentsData = await appointmentsRes.json()
        const now = new Date()
        const today = now.toISOString().split("T")[0]
        const upcoming = (appointmentsData.appointments || [])
          .filter((a: any) =>
            a.date === today &&
            a.status !== "cancelled" &&
            a.status !== "completed"
          )
          .sort((a: any, b: any) => a.time.localeCompare(b.time))
          .map((a: any) => ({
            id: a.id,
            time: a.time,
            clientName: a.clientName || a.client?.name || "Cliente",
            clientAvatar: a.clientAvatar || a.client?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(a.clientName || a.client?.name || "Cliente")}`,
            serviceName: a.serviceName || a.service || "",
            serviceImage: a.serviceImage || a.service?.image || "",
            professionalName: a.professionalName || "",
          }))
        setAppointments(upcoming)
      } catch {
        setStats({
          todayAppointments: 0,
          todayAppointmentsChange: 0,
          monthRevenue: 0,
          monthRevenueChange: 0,
          newClients: 0,
          newClientsChange: 0,
          avgRating: 0,
          totalReviews: 0,
        })
        setAppointments([])
      } finally {
        setLoading(false)
      }
    }
    fetchDashboardData()
  }, [])

  function formatCurrency(value: number) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
  }

  function formatPercent(value: number) {
    const abs = Math.abs(value)
    return (value > 0 ? "+" : value < 0 ? "-" : "") + abs.toFixed(0) + "%"
  }

  return (
    <div className="min-h-screen bg-[#EFEFEF] dark:bg-[#18181b] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#313131] dark:text-white mb-2">Painel do Profissional</h1>
          <p className="text-[#313131]/70 dark:text-white/70">Veja um resumo do seu desempenho e próximos atendimentos.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white dark:bg-[#232326]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#313131]/70 dark:text-white/70">Agendamentos Hoje</CardTitle>
              <Calendar className="h-4 w-4 text-[#FF96B2] dark:text-[#ffb6ce]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#313131] dark:text-white">{loading ? "--" : stats.todayAppointments}</div>
              <p className="text-xs text-[#313131]/70 dark:text-white/70">
                <span className={stats.todayAppointmentsChange > 0 ? "text-green-600 dark:text-green-400" : stats.todayAppointmentsChange < 0 ? "text-red-600 dark:text-red-400" : ""}>
                  {loading ? "--" : formatPercent(stats.todayAppointmentsChange)}
                </span>{" "}
                em relação a ontem
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white dark:bg-[#232326]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#313131]/70 dark:text-white/70">Receita do Mês</CardTitle>
              <DollarSign className="h-4 w-4 text-[#FF96B2] dark:text-[#ffb6ce]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#313131] dark:text-white">{loading ? "--" : formatCurrency(stats.monthRevenue)}</div>
              <p className="text-xs text-[#313131]/70 dark:text-white/70">
                <span className={stats.monthRevenueChange > 0 ? "text-green-600 dark:text-green-400" : stats.monthRevenueChange < 0 ? "text-red-600 dark:text-red-400" : ""}>
                  {loading ? "--" : formatPercent(stats.monthRevenueChange)}
                </span>{" "}
                em relação ao mês anterior
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white dark:bg-[#232326]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#313131]/70 dark:text-white/70">Novos Clientes</CardTitle>
              <Users className="h-4 w-4 text-[#FF96B2] dark:text-[#ffb6ce]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#313131] dark:text-white">{loading ? "--" : stats.newClients}</div>
              <p className="text-xs text-[#313131]/70 dark:text-white/70">
                <span className={stats.newClientsChange > 0 ? "text-green-600 dark:text-green-400" : stats.newClientsChange < 0 ? "text-red-600 dark:text-red-400" : ""}>
                  {loading ? "--" : formatPercent(stats.newClientsChange)}
                </span>{" "}
                em relação ao mês anterior
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white dark:bg-[#232326]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#313131]/70 dark:text-white/70">Avaliação Média</CardTitle>
              <Star className="h-4 w-4 text-[#FF96B2] dark:text-[#ffb6ce]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#313131] dark:text-white">{loading ? "--" : stats.avgRating.toFixed(1)}</div>
              <p className="text-xs text-[#313131]/70 dark:text-white/70">
                Baseado em {loading ? "--" : stats.totalReviews} avaliações
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Próximos Agendamentos */}
          <Card className="lg:col-span-2 border-0 shadow-lg bg-white dark:bg-[#232326]">
            <CardHeader>
              <CardTitle className="text-[#313131] dark:text-white">Próximos Agendamentos</CardTitle>
              <CardDescription className="dark:text-white/70">Agendamentos para hoje</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  <div className="py-8 text-center text-[#313131]/70 dark:text-white/70">Carregando...</div>
                ) : appointments.length === 0 ? (
                  <div className="py-8 text-center text-[#313131]/70 dark:text-white/70">
                    Nenhum agendamento para hoje.
                  </div>
                ) : (
                  appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-[#EFEFEF] dark:bg-[#18181b] rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-[#FF96B2] dark:bg-[#ffb6ce] text-white dark:text-[#18181b] rounded-lg font-semibold">
                          {appointment.time}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <img
                              src={appointment.clientAvatar}
                              alt={appointment.clientName}
                              className="w-8 h-8 rounded-full border border-[#FF96B2] dark:border-[#ffb6ce] object-cover"
                            />
                            <span className="font-medium text-[#313131] dark:text-white">{appointment.clientName}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            {appointment.serviceImage && (
                              <img
                                src={appointment.serviceImage}
                                alt={appointment.serviceName}
                                className="w-8 h-8 rounded border border-[#FF96B2] dark:border-[#ffb6ce] object-cover"
                              />
                            )}
                            <span className="text-sm text-[#313131]/70 dark:text-white/70">{appointment.serviceName}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#FF96B2] dark:border-[#ffb6ce] text-[#FF96B2] dark:text-[#ffb6ce] hover:bg-[#FF96B2] hover:text-white dark:hover:bg-[#ffb6ce] dark:hover:text-[#18181b]"
                        onClick={() => router.push(`/appoint-pro`)}
                      >
                        Ver detalhes
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Ações Rápidas */}
          <Card className="border-0 shadow-lg bg-white dark:bg-[#232326]">
            <CardHeader>
              <CardTitle className="text-[#313131] dark:text-white">Ações Rápidas</CardTitle>
              <CardDescription className="dark:text-white/70">Acesso rápido às principais funcionalidades</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white dark:bg-[#ffb6ce] dark:hover:bg-[#ffb6ce]/90 dark:text-[#18181b]"
                onClick={() => router.push("/report")}
              >
                <BarChart2 className="w-4 h-4 mr-2" />
                Ver Relatórios
              </Button>
              <Button
                variant="outline"
                className="w-full border-[#FF96B2] dark:border-[#ffb6ce] text-[#FF96B2] dark:text-[#ffb6ce] hover:bg-[#FF96B2] hover:text-white dark:hover:bg-[#ffb6ce] dark:hover:text-[#18181b]"
                onClick={() => setOpenProfileModal(true)}
              >
                <UserCog className="w-4 h-4 mr-2" />
                Editar Perfil
              </Button>
              <Button
                variant="outline"
                className="w-full border-[#FF96B2] dark:border-[#ffb6ce] text-[#FF96B2] dark:text-[#ffb6ce] hover:bg-[#FF96B2] hover:text-white dark:hover:bg-[#ffb6ce] dark:hover:text-[#18181b]"
                onClick={() => setOpenServicesModal(true)}
              >
                <Scissors className="w-4 h-4 mr-2" />
                Gerenciar Serviços
              </Button>
              <Button
                variant="outline"
                className="w-full border-[#FF96B2] dark:border-[#ffb6ce] text-[#FF96B2] dark:text-[#ffb6ce] hover:bg-[#FF96B2] hover:text-white dark:hover:bg-[#ffb6ce] dark:hover:text-[#18181b]"
                onClick={() => router.push("/about-me")}
              >
                <Star className="w-4 h-4 mr-2" />
                Ver Portfólio
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal Editar Perfil */}
      <Dialog open={openProfileModal} onOpenChange={setOpenProfileModal}>
        <DialogContent className="bg-white dark:bg-[#232326] text-[#313131] dark:text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Perfil Profissional</DialogTitle>
            <DialogDescription>
              Para editar seu perfil completo, acesse a página <b>Meu Perfil Profissional</b>.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Button
              className="w-full bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white dark:bg-[#ffb6ce] dark:hover:bg-[#ffb6ce]/90 dark:text-[#18181b]"
              onClick={() => {
                setOpenProfileModal(false)
                router.push("/about-me")
              }}
            >
              Ir para Meu Perfil Profissional
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Gerenciar Serviços */}
      <Dialog open={openServicesModal} onOpenChange={setOpenServicesModal}>
        <DialogContent className="bg-white dark:bg-[#232326] text-[#313131] dark:text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Gerenciar Serviços</DialogTitle>
            <DialogDescription>
              Para adicionar, editar ou remover serviços, acesse a página <b>Meu Perfil Profissional</b>.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Button
              className="w-full bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white dark:bg-[#ffb6ce] dark:hover:bg-[#ffb6ce]/90 dark:text-[#18181b]"
              onClick={() => {
                setOpenServicesModal(false)
                router.push("/about-me")
              }}
            >
              Ir para Meu Perfil Profissional
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}