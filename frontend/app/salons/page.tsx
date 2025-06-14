"use client"

import { useState, useEffect } from "react"
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

  // Novo: state para salões reais
  const [salons, setSalons] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSalons() {
      setLoading(true)
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/salons`)
        const data = await res.json()
        setSalons(data.salons || [])
      } catch (e) {
        setSalons([])
      } finally {
        setLoading(false)
      }
    }
    fetchSalons()
  }, [])

  // Filtro simples pelo nome
  const filteredSalons = salons.filter((salon) =>
    salon.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // ...cores e estilos como antes...

  const bgColor = isDark ? "bg-[#18181b]" : "bg-[#EFEFEF]"
  const textColor = isDark ? "text-[#f4f4f5]" : "text-[#313131]"
  const textMuted = isDark ? "text-[#f4f4f5]/70" : "text-[#313131]/70"
  const cardShadow = isDark ? "shadow-md" : "shadow-lg"
  const cardHoverShadow = isDark ? "hover:shadow-lg" : "hover:shadow-xl"
  const borderColor = isDark ? "border-[#27272a]" : "border-[#EFEFEF]"
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
        {loading ? (
          <div className="text-center text-lg py-12">Carregando salões...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSalons.map((salon) => (
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
                  <Badge className={`absolute top-3 right-3 ${accentBg} ${accentText}`}>{salon.price || "R$"}</Badge>
                </div>

                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className={textColor}>{salon.name}</CardTitle>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{salon.rating || "4.5"}</span>
                      <span className={`text-sm ${textMuted}`}>({salon.reviews || 0})</span>
                    </div>
                  </div>
                  <div className={`flex items-center ${textMuted} text-sm`}>
                    <MapPin className="w-4 h-4 mr-1" />
                    {salon.address} {salon.distance ? `• ${salon.distance}` : ""}
                  </div>
                  <div className={`flex items-center ${textMuted} text-sm`}>
                    <Clock className="w-4 h-4 mr-1" />
                    {salon.openTime || "08:00"} - {salon.closeTime || "18:00"}
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="mb-4">
                    <p className={`text-sm ${textMuted} mb-2`}>Serviços:</p>
                    <div className="flex flex-wrap gap-1">
                      {(salon.services || []).map((service: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className={`flex-1 bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white`}
                      onClick={() => window.location.href = `/booking?salonId=${salon.id}`}
                    >
                      Agendar
                    </Button>
                    <Button
                      variant="outline"
                      className={outlineBtn}
                      onClick={() => window.location.href = `/view/${salon.id}`}
                    >
                      Ver mais
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

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