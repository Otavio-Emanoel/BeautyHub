"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Clock, Search, Filter } from "lucide-react"
import Image from "next/image"
import { useTheme } from "next-themes"

export default function SalonsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { theme } = useTheme()

  const isDark = theme === "dark"

  const salons = [
    {
      id: 1,
      name: "Salão Elegance",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
      reviews: 124,
      address: "Rua das Flores, 123 - Centro",
      distance: "0.5 km",
      services: ["Corte", "Escova", "Coloração", "Manicure"],
      openTime: "08:00",
      closeTime: "18:00",
      price: "$$",
    },
    {
      id: 2,
      name: "Beauty Studio",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.6,
      reviews: 89,
      address: "Av. Principal, 456 - Jardins",
      distance: "1.2 km",
      services: ["Corte", "Tratamentos", "Maquiagem", "Sobrancelha"],
      openTime: "09:00",
      closeTime: "19:00",
      price: "$$$",
    },
    {
      id: 3,
      name: "Cabelo & Cia",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.9,
      reviews: 203,
      address: "Rua do Comércio, 789 - Vila Nova",
      distance: "2.1 km",
      services: ["Corte", "Escova", "Progressiva", "Hidratação"],
      openTime: "08:30",
      closeTime: "17:30",
      price: "$$",
    },
  ]

  // Cores dinâmicas
  const bgColor = isDark ? "bg-[#18181b]" : "bg-[#EFEFEF]"
  const textColor = isDark ? "text-[#f4f4f5]" : "text-[#313131]"
  const textMuted = isDark ? "text-[#f4f4f5]/70" : "text-[#313131]/70"
  const cardShadow = isDark ? "shadow-md" : "shadow-lg"
  const cardHoverShadow = isDark ? "hover:shadow-lg" : "hover:shadow-xl"
  const borderColor = isDark ? "border-[#27272a]" : "border-[#EFEFEF]"
  const accent = isDark ? "#FF96B2" : "#FF96B2"
  const accentBg = isDark ? "bg-[#FF96B2]" : "bg-[#FF96B2]"
  const accentText = isDark ? "text-white" : "text-white"
  const outlineBtn =
    isDark
      ? "border-[#FF96B2] text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white"
      : "border-[#FF96B2] text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white"

  return (
    <div className={`min-h-screen ${bgColor} p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${textColor} mb-2`}>Encontre seu Salão</h1>
          <p className={textMuted}>Descubra os melhores salões de beleza da sua região</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className={`absolute left-3 top-3 w-4 h-4 ${textMuted}`} />
            <Input
              placeholder="Buscar salões, serviços ou localização..."
              className={`pl-10 ${borderColor} focus:border-[#FF96B2] ${bgColor} ${textColor}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className={outlineBtn}>
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </div>

        {/* Salons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salons.map((salon) => (
            <Card
              key={salon.id}
              className={`border-0 ${cardShadow} ${cardHoverShadow} transition-shadow overflow-hidden ${bgColor}`}
            >
              <div className="relative">
                <Image
                  src={salon.image || "/placeholder.svg"}
                  alt={salon.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <Badge className={`absolute top-3 right-3 ${accentBg} ${accentText}`}>{salon.price}</Badge>
              </div>

              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className={textColor}>{salon.name}</CardTitle>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{salon.rating}</span>
                    <span className={`text-sm ${textMuted}`}>({salon.reviews})</span>
                  </div>
                </div>
                <div className={`flex items-center ${textMuted} text-sm`}>
                  <MapPin className="w-4 h-4 mr-1" />
                  {salon.address} • {salon.distance}
                </div>
                <div className={`flex items-center ${textMuted} text-sm`}>
                  <Clock className="w-4 h-4 mr-1" />
                  {salon.openTime} - {salon.closeTime}
                </div>
              </CardHeader>

              <CardContent>
                <div className="mb-4">
                  <p className={`text-sm ${textMuted} mb-2`}>Serviços:</p>
                  <div className="flex flex-wrap gap-1">
                    {salon.services.map((service, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className={`flex-1 bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white`}>Agendar</Button>
                  <Button
                    variant="outline"
                    className={outlineBtn}
                  >
                    Ver mais
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" className={outlineBtn}>
            Carregar mais salões
          </Button>
        </div>
      </div>
    </div>
  )
}
