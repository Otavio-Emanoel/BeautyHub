"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts"
import {
  Star,
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  Download,
  ThumbsUp,
} from "lucide-react"

type RatingDistribution = {
  stars: number
  count: number
  percentage: number
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const starSize = size === "lg" ? "w-5 h-5" : "w-4 h-4"
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${starSize} ${star <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  )
}

// COMPONENTE OVERVIEW
function OverviewTab() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<{
    averageRating: number
    ratingTrend: number
    totalReviews: number
    reviewsTrend: number
    responseRate: number
    recommendationRate: number
    ratingDistribution: RatingDistribution[]
  }>({
    averageRating: 0,
    ratingTrend: 0,
    totalReviews: 0,
    reviewsTrend: 0,
    responseRate: 0,
    recommendationRate: 0,
    ratingDistribution: [
      { stars: 5, count: 0, percentage: 0 },
      { stars: 4, count: 0, percentage: 0 },
      { stars: 3, count: 0, percentage: 0 },
      { stars: 2, count: 0, percentage: 0 },
      { stars: 1, count: 0, percentage: 0 },
    ],
  })

  useEffect(() => {
    async function fetchOverview() {
      setLoading(true)
      try {
        const token = localStorage.getItem("token")
        // Dashboard principal
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professional/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()

        // Distribuição de avaliações
        const distRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professional/reports/ratings-distribution`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const distData = await distRes.json()

        // Cálculo de recomendação e taxa de resposta
        let recommendationRate = 0
        let responseRate = 0
        if (distData.ratingDistribution) {
          const total = distData.ratingDistribution.reduce((acc: number, item: any) => acc + item.count, 0)
          const recommended = distData.ratingDistribution
            .filter((item: any) => item.stars >= 4)
            .reduce((acc: number, item: any) => acc + item.count, 0)
          recommendationRate = total > 0 ? Math.round((recommended / total) * 100) : 0
        }
        // Taxa de avaliações: % de atendimentos concluídos que receberam avaliação
        if (data.completedAppointments !== undefined && data.completedAppointments > 0) {
          responseRate = Math.round((data.reviewsThisMonth / data.completedAppointments) * 100)
        } else {
          responseRate = 0
        }

        setStats({
          averageRating: data.avgRating ?? 0,
          ratingTrend: data.ratingTrend ?? 0,
          totalReviews: data.totalReviews ?? 0,
          reviewsTrend: data.reviewsTrend ?? 0,
          responseRate,
          recommendationRate,
          ratingDistribution: distData.ratingDistribution ?? [
            { stars: 5, count: 0, percentage: 0 },
            { stars: 4, count: 0, percentage: 0 },
            { stars: 3, count: 0, percentage: 0 },
            { stars: 2, count: 0, percentage: 0 },
            { stars: 1, count: 0, percentage: 0 },
          ],
        })
      } catch {
        setStats({
          averageRating: 0,
          ratingTrend: 0,
          totalReviews: 0,
          reviewsTrend: 0,
          responseRate: 0,
          recommendationRate: 0,
          ratingDistribution: [
            { stars: 5, count: 0, percentage: 0 },
            { stars: 4, count: 0, percentage: 0 },
            { stars: 3, count: 0, percentage: 0 },
            { stars: 2, count: 0, percentage: 0 },
            { stars: 1, count: 0, percentage: 0 },
          ],
        })
      } finally {
        setLoading(false)
      }
    }
    fetchOverview()
  }, [])

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-white dark:bg-[#23232A]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#313131]/70 dark:text-white/70">Avaliação Média</CardTitle>
            <Star className="h-4 w-4 text-[#FF96B2]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#313131] dark:text-white">
              {loading ? "--" : stats.averageRating.toFixed(1)}
            </div>
            <div className="flex items-center space-x-2">
              <StarRating rating={stats.averageRating} />
              <span className={`text-xs flex items-center ${stats.ratingTrend > 0 ? "text-green-600 dark:text-green-400" : stats.ratingTrend < 0 ? "text-red-600 dark:text-red-400" : ""}`}>
                <TrendingUp className="w-3 h-3 mr-1" />
                {loading ? "--" : (stats.ratingTrend > 0 ? "+" : "") + stats.ratingTrend.toFixed(1)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white dark:bg-[#23232A]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#313131]/70 dark:text-white/70">Total de Avaliações</CardTitle>
            <MessageSquare className="h-4 w-4 text-[#FF96B2]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#313131] dark:text-white">
              {loading ? "--" : stats.totalReviews}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              {loading
                ? "--"
                : stats.reviewsTrend > 0
                ? `+${stats.reviewsTrend} este mês`
                : stats.reviewsTrend < 0
                ? `${stats.reviewsTrend} este mês`
                : "0 este mês"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white dark:bg-[#23232A]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#313131]/70 dark:text-white/70">Taxa de Avaliação</CardTitle>
            <Users className="h-4 w-4 text-[#FF96B2]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#313131] dark:text-white">
              {loading ? "--" : stats.responseRate + "%"}
            </div>
            <p className="text-xs text-[#313131]/70 dark:text-white/70">dos atendimentos avaliados</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white dark:bg-[#23232A]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#313131]/70 dark:text-white/70">Recomendação</CardTitle>
            <ThumbsUp className="h-4 w-4 text-[#FF96B2]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#313131] dark:text-white">
              {loading ? "--" : stats.recommendationRate + "%"}
            </div>
            <p className="text-xs text-[#313131]/70 dark:text-white/70">dos clientes recomendam</p>
          </CardContent>
        </Card>
      </div>

      {/* Rating Distribution */}
      <Card className="border-0 shadow-lg bg-white dark:bg-[#23232A]">
        <CardHeader>
          <CardTitle className="text-[#313131] dark:text-white">Distribuição de Avaliações</CardTitle>
          <CardDescription className="dark:text-white/70">Como seus clientes avaliam seus serviços</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 w-20">
                  <span className="text-sm font-medium text-[#313131] dark:text-white">{item.stars}</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <Progress value={item.percentage} className="h-2" />
                </div>
                <div className="flex items-center space-x-2 w-20">
                  <span className="text-sm text-[#313131]/70 dark:text-white/70">{item.count}</span>
                  <span className="text-xs text-[#313131]/50 dark:text-white/50">({item.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// COMPONENTE AVALIAÇÕES
function ReviewsTab() {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true)
      try {
        const token = localStorage.getItem("token")
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professional/reports/reviews`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        setReviews(data.reviews || [])
      } catch {
        setReviews([])
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [])

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-white dark:bg-[#23232A]">
        <CardHeader>
          <CardTitle className="text-[#313131] dark:text-white">Avaliações Recentes</CardTitle>
          <CardDescription className="dark:text-white/70">Veja o que seus clientes estão dizendo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading && <div>Carregando...</div>}
            {!loading && reviews.length === 0 && <div>Nenhuma avaliação encontrada.</div>}
            {reviews.map((review, idx) => (
              <div key={review.id || idx} className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={review.client?.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {review.client?.name
                      ? review.client.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                      : "CL"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#313131] dark:text-white">{review.client?.name || "Cliente"}</span>
                    {review.client?.isVerified && (
                      <Badge className="bg-blue-100 text-blue-800 text-xs">Verificado</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating rating={review.rating} />
                    <span className="text-xs text-[#313131]/70 dark:text-white/70">
                      {review.date ? new Date(review.date).toLocaleDateString("pt-BR") : ""}
                    </span>
                  </div>
                  <p className="mt-2 text-[#313131]/80 dark:text-white/80">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// COMPONENTE POR SERVIÇO
function ServicesTab() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchServicesRatings() {
      setLoading(true)
      try {
        const token = localStorage.getItem("token")
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professional/reports/services-ratings`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        setServices(data.services || [])
      } catch {
        setServices([])
      } finally {
        setLoading(false)
      }
    }
    fetchServicesRatings()
  }, [])

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-white dark:bg-[#23232A]">
        <CardHeader>
          <CardTitle className="text-[#313131] dark:text-white">Avaliações por Serviço</CardTitle>
          <CardDescription className="dark:text-white/70">Veja o desempenho de cada serviço</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading && <div>Carregando...</div>}
            {!loading && services.length === 0 && <div>Nenhum serviço encontrado.</div>}
            {services.map((service, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-[#EFEFEF] dark:bg-[#23232A]/70 rounded-lg">
                <div>
                  <h3 className="font-semibold text-[#313131] dark:text-white mb-1">{service.name}</h3>
                  <div className="flex items-center gap-2">
                    <StarRating rating={parseFloat(service.rating)} />
                    <span className="text-sm font-medium text-[#313131] dark:text-white">{service.rating}</span>
                    <span className="text-sm text-[#313131]/70 dark:text-white/70">({service.reviews} avaliações)</span>
                  </div>
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  service.trend && service.trend.startsWith("+")
                    ? "text-green-600 dark:text-green-400"
                    : service.trend && service.trend.startsWith("-")
                      ? "text-red-600 dark:text-red-400"
                      : "text-[#313131]/70 dark:text-white/70"
                }`}>
                  {service.trend && service.trend.startsWith("+") && <TrendingUp className="w-4 h-4" />}
                  {service.trend && service.trend.startsWith("-") && <TrendingDown className="w-4 h-4" />}
                  <span>{service.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// COMPONENTE TENDÊNCIAS
function TrendsTab() {
  const [trends, setTrends] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTrends() {
      setLoading(true)
      try {
        const token = localStorage.getItem("token")
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professional/reports/trends`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        setTrends(data.trends || [])
      } catch {
        setTrends([])
      } finally {
        setLoading(false)
      }
    }
    fetchTrends()
  }, [])

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Evolução da Avaliação */}
      <Card className="border-0 shadow-lg bg-white dark:bg-[#23232A]">
        <CardHeader>
          <CardTitle className="text-[#313131] dark:text-white">Evolução da Avaliação</CardTitle>
          <CardDescription className="dark:text-white/70">Tendência da sua avaliação média</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72 flex flex-col items-center justify-center bg-[#EFEFEF] dark:bg-[#23232A]/70 rounded-lg">
            {loading && <div>Carregando...</div>}
            {!loading && trends.length === 0 && <div>Nenhum dado encontrado.</div>}
            {!loading && trends.length > 0 && (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={trends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" tick={{ fill: "#313131" }} />
                  <YAxis domain={[0, 5]} tick={{ fill: "#313131" }} />
                  <Tooltip
                    contentStyle={{ background: "#fff", borderRadius: 8, border: "1px solid #FF96B2" }}
                    labelStyle={{ color: "#FF96B2" }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="avgRating"
                    name="Média"
                    stroke="#FF96B2"
                    strokeWidth={3}
                    dot={{ r: 6, fill: "#FF96B2" }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Volume de Avaliações */}
      <Card className="border-0 shadow-lg bg-white dark:bg-[#23232A]">
        <CardHeader>
          <CardTitle className="text-[#313131] dark:text-white">Volume de Avaliações</CardTitle>
          <CardDescription className="dark:text-white/70">Quantidade de avaliações recebidas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72 flex flex-col items-center justify-center bg-[#EFEFEF] dark:bg-[#23232A]/70 rounded-lg">
            {loading && <div>Carregando...</div>}
            {!loading && trends.length === 0 && <div>Nenhum dado encontrado.</div>}
            {!loading && trends.length > 0 && (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={trends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" tick={{ fill: "#313131" }} />
                  <YAxis allowDecimals={false} tick={{ fill: "#313131" }} />
                  <Tooltip
                    contentStyle={{ background: "#fff", borderRadius: 8, border: "1px solid #FF96B2" }}
                    labelStyle={{ color: "#FF96B2" }}
                  />
                  <Legend />
                  <Bar dataKey="reviews" name="Avaliações" fill="#FF96B2" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ProfessionalReportsPage() {
  const [tab, setTab] = useState("overview")

  return (
    <div className="min-h-screen bg-[#EFEFEF] dark:bg-[#18181B] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-[#313131] dark:text-white mb-2">Relatório de Feedbacks</h1>
              <p className="text-[#313131]/70 dark:text-white/70">Acompanhe as avaliações e comentários dos seus clientes</p>
            </div>
            <Button variant="outline" className="border-[#FF96B2] dark:border-[#FF96B2] text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white dark:hover:bg-[#FF96B2] dark:hover:text-white">
              <Download className="w-4 h-4 mr-2" />
              Exportar Relatório
            </Button>
          </div>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
            <TabsTrigger value="services">Por Serviço</TabsTrigger>
            <TabsTrigger value="trends">Tendências</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>
          <TabsContent value="reviews">
            <ReviewsTab />
          </TabsContent>
          <TabsContent value="services">
            <ServicesTab />
          </TabsContent>
          <TabsContent value="trends">
            <TrendsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}