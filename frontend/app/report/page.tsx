"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Star,
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  Search,
  Filter,
  Download,
  MoreVertical,
  ThumbsUp,
} from "lucide-react"

export default function ProfessionalReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [serviceFilter, setServiceFilter] = useState("all")
  const [periodFilter, setPeriodFilter] = useState("all")

  const overallStats = {
    averageRating: 4.8,
    totalReviews: 247,
    responseRate: 92,
    recommendationRate: 96,
    ratingTrend: "+0.3",
    reviewsTrend: "+15",
  }

  const ratingDistribution = [
    { stars: 5, count: 189, percentage: 76 },
    { stars: 4, count: 35, percentage: 14 },
    { stars: 3, count: 15, percentage: 6 },
    { stars: 2, count: 5, percentage: 2 },
    { stars: 1, count: 3, percentage: 1 },
  ]

  const serviceRatings = [
    { service: "Corte Feminino", rating: 4.9, reviews: 89, trend: "+0.2" },
    { service: "Coloração", rating: 4.8, reviews: 67, trend: "+0.1" },
    { service: "Escova", rating: 4.7, reviews: 45, trend: "-0.1" },
    { service: "Luzes", rating: 4.9, reviews: 32, trend: "+0.4" },
    { service: "Tratamentos", rating: 4.6, reviews: 14, trend: "0.0" },
  ]

  const recentReviews = [
    {
      id: 1,
      client: {
        name: "Maria Silva",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: true,
      },
      service: "Corte + Escova",
      rating: 5,
      date: "2024-01-18",
      comment: "Excelente profissional! Ana é muito atenciosa e o resultado ficou perfeito. Super recomendo!",
      helpful: 12,
      response: "Muito obrigada, Maria! Foi um prazer atendê-la. Volte sempre! 💕",
      tags: ["Atendimento", "Qualidade", "Pontualidade"],
      isRecent: true,
    },
    {
      id: 2,
      client: {
        name: "Fernanda Costa",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: true,
      },
      service: "Coloração",
      rating: 5,
      date: "2024-01-17",
      comment: "Amei o resultado da coloração! A Ana entendeu exatamente o que eu queria e o cabelo ficou lindo.",
      helpful: 8,
      response: "Fico muito feliz que tenha gostado! Seu cabelo ficou maravilhoso mesmo! ✨",
      tags: ["Resultado", "Comunicação"],
      isRecent: true,
    },
    {
      id: 3,
      client: {
        name: "Juliana Santos",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: false,
      },
      service: "Escova",
      rating: 4,
      date: "2024-01-15",
      comment: "Bom atendimento, mas achei que poderia ter durado um pouco mais. No geral, satisfeita.",
      helpful: 3,
      response: "",
      tags: ["Atendimento"],
      isRecent: false,
    },
    {
      id: 4,
      client: {
        name: "Carla Oliveira",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: true,
      },
      service: "Luzes",
      rating: 5,
      date: "2024-01-14",
      comment: "Trabalho impecável! As luzes ficaram naturais e o atendimento foi excepcional.",
      helpful: 15,
      response: "Carla, muito obrigada pelo carinho! Adorei trabalhar no seu cabelo! 🌟",
      tags: ["Qualidade", "Naturalidade", "Atendimento"],
      isRecent: false,
    },
    {
      id: 5,
      client: {
        name: "Ana Paula",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: true,
      },
      service: "Corte Feminino",
      rating: 3,
      date: "2024-01-12",
      comment: "O corte ficou ok, mas não foi exatamente o que eu esperava. Talvez faltou mais comunicação.",
      helpful: 2,
      response: "Ana Paula, obrigada pelo feedback. Gostaria de conversar para entender melhor suas expectativas.",
      tags: ["Comunicação"],
      isRecent: false,
    },
  ]

  const monthlyTrends = [
    { month: "Set", rating: 4.5, reviews: 18 },
    { month: "Out", rating: 4.6, reviews: 22 },
    { month: "Nov", rating: 4.7, reviews: 28 },
    { month: "Dez", rating: 4.8, reviews: 35 },
    { month: "Jan", rating: 4.8, reviews: 42 },
  ]

  const StarRating = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) => {
    const starSize = size === "lg" ? "w-5 h-5" : "w-4 h-4"
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  const filteredReviews = recentReviews.filter((review) => {
    const matchesSearch =
      review.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRating = ratingFilter === "all" || review.rating.toString() === ratingFilter
    const matchesService = serviceFilter === "all" || review.service.includes(serviceFilter)

    let matchesPeriod = true
    if (periodFilter === "week") {
      const reviewDate = new Date(review.date)
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      matchesPeriod = reviewDate >= weekAgo
    } else if (periodFilter === "month") {
      const reviewDate = new Date(review.date)
      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      matchesPeriod = reviewDate >= monthAgo
    }

    return matchesSearch && matchesRating && matchesService && matchesPeriod
  })

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

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
            <TabsTrigger value="services">Por Serviço</TabsTrigger>
            <TabsTrigger value="trends">Tendências</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-0 shadow-lg bg-white dark:bg-[#23232A]">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-[#313131]/70 dark:text-white/70">Avaliação Média</CardTitle>
                    <Star className="h-4 w-4 text-[#FF96B2]" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-[#313131] dark:text-white">{overallStats.averageRating}</div>
                    <div className="flex items-center space-x-2">
                      <StarRating rating={overallStats.averageRating} />
                      <span className="text-xs text-green-600 dark:text-green-400 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {overallStats.ratingTrend}
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
                    <div className="text-2xl font-bold text-[#313131] dark:text-white">{overallStats.totalReviews}</div>
                    <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />+{overallStats.reviewsTrend} este mês
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white dark:bg-[#23232A]">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-[#313131]/70 dark:text-white/70">Taxa de Resposta</CardTitle>
                    <Users className="h-4 w-4 text-[#FF96B2]" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-[#313131] dark:text-white">{overallStats.responseRate}%</div>
                    <p className="text-xs text-[#313131]/70 dark:text-white/70">das avaliações respondidas</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white dark:bg-[#23232A]">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-[#313131]/70 dark:text-white/70">Recomendação</CardTitle>
                    <ThumbsUp className="h-4 w-4 text-[#FF96B2]" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-[#313131] dark:text-white">{overallStats.recommendationRate}%</div>
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
                    {ratingDistribution.map((item) => (
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
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <div className="space-y-6">
              {/* Filters */}
              <Card className="border-0 shadow-lg bg-white dark:bg-[#23232A]">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50 dark:text-white/50" />
                      <Input
                        placeholder="Buscar avaliações..."
                        className="pl-10 border-[#EFEFEF] dark:border-[#23232A] focus:border-[#FF96B2]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    <Select value={ratingFilter} onValueChange={setRatingFilter}>
                      <SelectTrigger className="border-[#EFEFEF] dark:border-[#23232A] focus:border-[#FF96B2]">
                        <SelectValue placeholder="Avaliação" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as avaliações</SelectItem>
                        <SelectItem value="5">5 estrelas</SelectItem>
                        <SelectItem value="4">4 estrelas</SelectItem>
                        <SelectItem value="3">3 estrelas</SelectItem>
                        <SelectItem value="2">2 estrelas</SelectItem>
                        <SelectItem value="1">1 estrela</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={serviceFilter} onValueChange={setServiceFilter}>
                      <SelectTrigger className="border-[#EFEFEF] dark:border-[#23232A] focus:border-[#FF96B2]">
                        <SelectValue placeholder="Serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os serviços</SelectItem>
                        <SelectItem value="Corte">Corte</SelectItem>
                        <SelectItem value="Coloração">Coloração</SelectItem>
                        <SelectItem value="Escova">Escova</SelectItem>
                        <SelectItem value="Luzes">Luzes</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={periodFilter} onValueChange={setPeriodFilter}>
                      <SelectTrigger className="border-[#EFEFEF] dark:border-[#23232A] focus:border-[#FF96B2]">
                        <SelectValue placeholder="Período" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os períodos</SelectItem>
                        <SelectItem value="week">Última semana</SelectItem>
                        <SelectItem value="month">Último mês</SelectItem>
                        <SelectItem value="quarter">Último trimestre</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      variant="outline"
                      className="border-[#FF96B2] dark:border-[#FF96B2] text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white dark:hover:bg-[#FF96B2] dark:hover:text-white"
                      onClick={() => {
                        setSearchTerm("")
                        setRatingFilter("all")
                        setServiceFilter("all")
                        setPeriodFilter("all")
                      }}
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Limpar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews List */}
              <div className="space-y-4">
                {filteredReviews.map((review) => (
                  <Card key={review.id} className="border-0 shadow-lg bg-white dark:bg-[#23232A]">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={review.client.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-[#FF96B2] text-white">
                              {review.client.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-[#313131] dark:text-white">{review.client.name}</h3>
                              {review.client.isVerified && (
                                <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">Verificado</Badge>
                              )}
                              {review.isRecent && <Badge className="bg-[#FF96B2] text-white text-xs">Novo</Badge>}
                            </div>
                            <p className="text-sm text-[#313131]/70 dark:text-white/70">{review.service}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-right">
                            <StarRating rating={review.rating} />
                            <p className="text-xs text-[#313131]/50 dark:text-white/50 mt-1">
                              {new Date(review.date).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Responder</DropdownMenuItem>
                              <DropdownMenuItem>Marcar como importante</DropdownMenuItem>
                              <DropdownMenuItem>Reportar</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-[#313131] dark:text-white mb-3">{review.comment}</p>
                        <div className="flex flex-wrap gap-2">
                          {review.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {review.response && (
                        <div className="bg-[#FF96B2]/5 dark:bg-[#FF96B2]/10 border-l-4 border-[#FF96B2] p-4 mb-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="bg-[#FF96B2] text-white text-xs">AC</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium text-[#313131] dark:text-white">Sua resposta:</span>
                          </div>
                          <p className="text-sm text-[#313131]/80 dark:text-white/80">{review.response}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1 text-sm text-[#313131]/70 dark:text-white/70">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{review.helpful} pessoas acharam útil</span>
                          </div>
                        </div>
                        {!review.response && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-[#FF96B2] dark:border-[#FF96B2] text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white dark:hover:bg-[#FF96B2] dark:hover:text-white"
                          >
                            Responder
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
            <Card className="border-0 shadow-lg bg-white dark:bg-[#23232A]">
              <CardHeader>
                <CardTitle className="text-[#313131] dark:text-white">Avaliações por Serviço</CardTitle>
                <CardDescription className="dark:text-white/70">Performance de cada serviço oferecido</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serviceRatings.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-[#EFEFEF] dark:bg-[#23232A]/70 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#313131] dark:text-white mb-1">{service.service}</h3>
                        <div className="flex items-center space-x-4">
                          <StarRating rating={service.rating} />
                          <span className="text-sm font-medium text-[#313131] dark:text-white">{service.rating}</span>
                          <span className="text-sm text-[#313131]/70 dark:text-white/70">({service.reviews} avaliações)</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`flex items-center space-x-1 text-sm ${
                            service.trend.startsWith("+")
                              ? "text-green-600 dark:text-green-400"
                              : service.trend.startsWith("-")
                                ? "text-red-600 dark:text-red-400"
                                : "text-[#313131]/70 dark:text-white/70"
                          }`}
                        >
                          {service.trend.startsWith("+") && <TrendingUp className="w-4 h-4" />}
                          {service.trend.startsWith("-") && <TrendingDown className="w-4 h-4" />}
                          <span>{service.trend}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white dark:bg-[#23232A]">
                <CardHeader>
                  <CardTitle className="text-[#313131] dark:text-white">Evolução da Avaliação</CardTitle>
                  <CardDescription className="dark:text-white/70">Tendência da sua avaliação média</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-[#EFEFEF] dark:bg-[#23232A]/70 rounded-lg">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-[#FF96B2] mx-auto mb-4" />
                      <p className="text-[#313131]/70 dark:text-white/70">Gráfico de tendência da avaliação</p>
                      <p className="text-sm text-[#313131]/50 dark:text-white/50 mt-2">
                        Sua avaliação média cresceu 0.3 pontos nos últimos 3 meses
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white dark:bg-[#23232A]">
                <CardHeader>
                  <CardTitle className="text-[#313131] dark:text-white">Volume de Avaliações</CardTitle>
                  <CardDescription className="dark:text-white/70">Quantidade de avaliações recebidas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-[#EFEFEF] dark:bg-[#23232A]/70 rounded-lg">
                    <div className="text-center">
                      <MessageSquare className="w-12 h-12 text-[#FF96B2] mx-auto mb-4" />
                      <p className="text-[#313131]/70 dark:text-white/70">Gráfico de volume de avaliações</p>
                      <p className="text-sm text-[#313131]/50 dark:text-white/50 mt-2">Você recebeu 15 avaliações a mais este mês</p>
                    </div>
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
