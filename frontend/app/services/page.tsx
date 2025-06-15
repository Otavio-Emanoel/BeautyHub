"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Star, Clock, Search, Scissors, Palette, Sparkles, Heart } from "lucide-react"

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const categories = [
    { id: "all", name: "Todos os Serviços", icon: Sparkles },
    { id: "hair", name: "Cabelo", icon: Scissors },
    { id: "nails", name: "Unhas", icon: Palette },
    { id: "aesthetics", name: "Estética", icon: Heart },
    { id: "makeup", name: "Maquiagem", icon: Sparkles },
  ]

  useEffect(() => {
    setLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professional/services-public`)
      .then(res => res.json())
      .then(data => setServices(data.services || []))
      .catch(() => setServices([]))
      .finally(() => setLoading(false))
  }, [])

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      (service.name || service.serviceName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (service.professional?.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" ||
      service.category === selectedCategory
    const matchesLocation =
      selectedLocation === "all" ||
      (service.professional?.location || "").includes(selectedLocation)
    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "low" && service.price <= 100) ||
      (priceRange === "medium" && service.price > 100 && service.price <= 200) ||
      (priceRange === "high" && service.price > 200)

    return matchesSearch && matchesCategory && matchesLocation && matchesPrice
  })

  const handleAgendar = (serviceId: string, professionalId: string) => {
    const token = localStorage.getItem("token")
    if (!token) {
      window.location.href = "/auth/login"
      return
    }
    window.location.href = `/booking?serviceId=${serviceId}&professionalId=${professionalId}`
  }

  return (
    <div className="min-h-screen bg-[#EFEFEF] dark:bg-[#18181b] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#313131] dark:text-white mb-2">Serviços Independentes</h1>
          <p className="text-[#313131]/70 dark:text-white/70">Encontre profissionais autônomos especializados na sua região</p>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon
              const isSelected = selectedCategory === category.id
              return (
                <Button
                  key={category.id}
                  variant={isSelected ? "default" : "outline"}
                  className={
                    isSelected
                      ? "bg-[#FF96B2] dark:bg-pink-600 hover:bg-[#FF96B2]/90 dark:hover:bg-pink-700 text-white"
                      : "border-[#FF96B2] dark:border-pink-600 text-[#FF96B2] dark:text-pink-400 hover:bg-[#FF96B2] dark:hover:bg-pink-600 hover:text-white"
                  }
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {category.name}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 grid md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50 dark:text-white/50" />
            <Input
              placeholder="Buscar serviços ou profissionais..."
              className="pl-10 border-[#EFEFEF] dark:border-[#27272a] focus:border-[#FF96B2] dark:focus:border-pink-600 bg-white dark:bg-[#232326] text-[#313131] dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="border-[#EFEFEF] dark:border-[#27272a] focus:border-[#FF96B2] dark:focus:border-pink-600 bg-white dark:bg-[#232326] text-[#313131] dark:text-white">
              <SelectValue placeholder="Localização" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-[#232326] text-[#313131] dark:text-white">
              <SelectItem value="all">Todas as regiões</SelectItem>
              {[...new Set(services.map(s => s.professional?.location).filter(Boolean))].map((loc, idx) => (
                <SelectItem key={idx} value={loc}>{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="border-[#EFEFEF] dark:border-[#27272a] focus:border-[#FF96B2] dark:focus:border-pink-600 bg-white dark:bg-[#232326] text-[#313131] dark:text-white">
              <SelectValue placeholder="Faixa de preço" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-[#232326] text-[#313131] dark:text-white">
              <SelectItem value="all">Todos os preços</SelectItem>
              <SelectItem value="low">Até R$ 100</SelectItem>
              <SelectItem value="medium">R$ 100 - R$ 200</SelectItem>
              <SelectItem value="high">Acima de R$ 200</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-[#313131]/70 dark:text-white/70">
            {filteredServices.length} {filteredServices.length === 1 ? "serviço encontrado" : "serviços encontrados"}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12">Carregando...</div>
          ) : filteredServices.map((item) => (
            <Card
              key={item.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-white dark:bg-[#232326]"
            >
              {/* Service Image */}
              <div className="relative h-48 bg-gradient-to-br from-[#FF96B2]/20 to-[#FF96B2]/10 dark:from-pink-600/20 dark:to-pink-600/10">
                <img
                  src={item.image || "/placeholder.svg"} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-[#FF96B2] dark:bg-pink-600 text-white">{item.availability || "Disponível"}</Badge>
                </div>
                {item.professional?.isVerified && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-green-500 dark:bg-green-600 text-white">✓ Verificado</Badge>
                  </div>
                )}
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-[#313131] dark:text-white text-lg">{item.name}</CardTitle>
                <p className="text-sm text-[#313131]/70 dark:text-white/70 line-clamp-2">{item.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Professional Info */}
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={item.professional?.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-[#FF96B2] dark:bg-pink-600 text-white">
                      {item.professional?.name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-[#313131] dark:text-white">{item.professional?.name}</p>
                    <div className="flex items-center space-x-2 text-sm text-[#313131]/70 dark:text-white/70">
                      <div className="flex items-center">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{item.professional?.rating || "4.8"}</span>
                        <span className="ml-1">({item.professional?.reviews || "0"})</span>
                      </div>
                      <span>•</span>
                      <span>{item.professional?.experience}</span>
                    </div>
                  </div>
                </div>

                {/* Service Details */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-[#313131]/70 dark:text-white/70">
                    <Clock className="w-4 h-4 mr-1" />
                    {item.duration} min
                  </div>
                  <div className="flex items-center text-[#313131]/70 dark:text-white/70">
                    <MapPin className="w-4 h-4 mr-1" />
                    {(item.professional?.location || "").split(",")[0]}
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-2 border-t border-[#EFEFEF] dark:border-[#27272a]">
                  <div>
                    <span className="text-2xl font-bold text-[#FF96B2] dark:text-pink-400">R$ {item.price}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.href = `/professional/${item.professional?.id || item.professionalId}`}
                    >
                      Ver perfil
                    </Button>
                    <Button
                      size="sm"
                      className="bg-[#FF96B2] dark:bg-pink-600 hover:bg-[#FF96B2]/90 dark:hover:bg-pink-700 text-white"
                      onClick={() => handleAgendar(item.id, item.professional?.id)}
                    >
                      Agendar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {filteredServices.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" className="border-[#FF96B2] dark:border-pink-600 text-[#FF96B2] dark:text-pink-400 hover:bg-[#FF96B2] dark:hover:bg-pink-600 hover:text-white">
              Carregar mais serviços
            </Button>
          </div>
        )}

        {/* No Results */}
        {!loading && filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-[#EFEFEF] dark:bg-[#232326] rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-[#313131]/30 dark:text-white/30" />
            </div>
            <h3 className="text-xl font-semibold text-[#313131] dark:text-white mb-2">Nenhum serviço encontrado</h3>
            <p className="text-[#313131]/70 dark:text-white/70 mb-4">Tente ajustar os filtros ou buscar por outros termos</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedLocation("all")
                setPriceRange("all")
              }}
              className="bg-[#FF96B2] dark:bg-pink-600 hover:bg-[#FF96B2]/90 dark:hover:bg-pink-700 text-white"
            >
              Limpar filtros
            </Button>
          </div>
        )}

        {/* Professional CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#FF96B2] to-[#FF96B2]/80 dark:from-pink-600 dark:to-pink-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Você é um profissional da beleza?</h2>
          <p className="text-lg mb-6 opacity-90">Cadastre-se e ofereça seus serviços para milhares de clientes</p>
          <Button size="lg" className="bg-white dark:bg-[#232326] text-[#FF96B2] dark:text-pink-400 hover:bg-[#EFEFEF] dark:hover:bg-[#18181b] font-semibold"
            onClick={() => window.location.href = "/auth/register"}
          >
            Cadastrar como Profissional
          </Button>
        </div>
      </div>
    </div>
  )
}