"use client"

import { useState } from "react"
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

  const categories = [
    { id: "all", name: "Todos os Serviços", icon: Sparkles },
    { id: "hair", name: "Cabelo", icon: Scissors },
    { id: "nails", name: "Unhas", icon: Palette },
    { id: "aesthetics", name: "Estética", icon: Heart },
    { id: "makeup", name: "Maquiagem", icon: Sparkles },
  ]

  const services = [
    {
      id: 1,
      professional: {
        name: "Ana Costa",
        avatar: "/placeholder.svg?height=60&width=60",
        rating: 4.9,
        reviews: 127,
        experience: "5 anos",
        location: "Vila Madalena, SP",
      },
      service: {
        name: "Corte Feminino + Escova",
        category: "hair",
        description: "Corte personalizado com escova modeladora para realçar sua beleza natural",
        duration: "90 min",
        price: 120,
        images: ["/placeholder.svg?height=200&width=300"],
      },
      availability: "Disponível hoje",
      isVerified: true,
    },
    {
      id: 2,
      professional: {
        name: "Mariana Silva",
        avatar: "/placeholder.svg?height=60&width=60",
        rating: 4.8,
        reviews: 89,
        experience: "3 anos",
        location: "Jardins, SP",
      },
      service: {
        name: "Manicure + Pedicure",
        category: "nails",
        description: "Cuidado completo para suas unhas com esmaltação profissional",
        duration: "120 min",
        price: 80,
        images: ["/placeholder.svg?height=200&width=300"],
      },
      availability: "Disponível amanhã",
      isVerified: true,
    },
    {
      id: 3,
      professional: {
        name: "Carlos Lima",
        avatar: "/placeholder.svg?height=60&width=60",
        rating: 4.7,
        reviews: 156,
        experience: "7 anos",
        location: "Pinheiros, SP",
      },
      service: {
        name: "Corte Masculino + Barba",
        category: "hair",
        description: "Corte moderno com acabamento de barba para o homem contemporâneo",
        duration: "60 min",
        price: 65,
        images: ["/placeholder.svg?height=200&width=300"],
      },
      availability: "Disponível hoje",
      isVerified: true,
    },
    {
      id: 4,
      professional: {
        name: "Lucia Mendes",
        avatar: "/placeholder.svg?height=60&width=60",
        rating: 4.9,
        reviews: 203,
        experience: "8 anos",
        location: "Moema, SP",
      },
      service: {
        name: "Limpeza de Pele",
        category: "aesthetics",
        description: "Limpeza profunda com extração e hidratação para pele radiante",
        duration: "90 min",
        price: 150,
        images: ["/placeholder.svg?height=200&width=300"],
      },
      availability: "Disponível em 2 dias",
      isVerified: true,
    },
    {
      id: 5,
      professional: {
        name: "Fernanda Oliveira",
        avatar: "/placeholder.svg?height=60&width=60",
        rating: 4.8,
        reviews: 94,
        experience: "4 anos",
        location: "Itaim Bibi, SP",
      },
      service: {
        name: "Maquiagem Social",
        category: "makeup",
        description: "Maquiagem elegante para eventos sociais e ocasiões especiais",
        duration: "75 min",
        price: 180,
        images: ["/placeholder.svg?height=200&width=300"],
      },
      availability: "Disponível hoje",
      isVerified: true,
    },
    {
      id: 6,
      professional: {
        name: "Roberto Santos",
        avatar: "/placeholder.svg?height=60&width=60",
        rating: 4.6,
        reviews: 78,
        experience: "6 anos",
        location: "Brooklin, SP",
      },
      service: {
        name: "Coloração + Luzes",
        category: "hair",
        description: "Transformação completa com coloração e mechas para um visual único",
        duration: "180 min",
        price: 280,
        images: ["/placeholder.svg?height=200&width=300"],
      },
      availability: "Disponível amanhã",
      isVerified: true,
    },
  ]

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.professional.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || service.service.category === selectedCategory
    const matchesLocation = selectedLocation === "all" || service.professional.location.includes(selectedLocation)
    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "low" && service.service.price <= 100) ||
      (priceRange === "medium" && service.service.price > 100 && service.service.price <= 200) ||
      (priceRange === "high" && service.service.price > 200)

    return matchesSearch && matchesCategory && matchesLocation && matchesPrice
  })

  return (
    <div className="min-h-screen bg-[#EFEFEF] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#313131] mb-2">Serviços Independentes</h1>
          <p className="text-[#313131]/70">Encontre profissionais autônomos especializados na sua região</p>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={
                    selectedCategory === category.id
                      ? "bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white"
                      : "border-[#FF96B2] text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white"
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
            <Search className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50" />
            <Input
              placeholder="Buscar serviços ou profissionais..."
              className="pl-10 border-[#EFEFEF] focus:border-[#FF96B2]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="border-[#EFEFEF] focus:border-[#FF96B2]">
              <SelectValue placeholder="Localização" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as regiões</SelectItem>
              <SelectItem value="Vila Madalena">Vila Madalena</SelectItem>
              <SelectItem value="Jardins">Jardins</SelectItem>
              <SelectItem value="Pinheiros">Pinheiros</SelectItem>
              <SelectItem value="Moema">Moema</SelectItem>
              <SelectItem value="Itaim Bibi">Itaim Bibi</SelectItem>
              <SelectItem value="Brooklin">Brooklin</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="border-[#EFEFEF] focus:border-[#FF96B2]">
              <SelectValue placeholder="Faixa de preço" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os preços</SelectItem>
              <SelectItem value="low">Até R$ 100</SelectItem>
              <SelectItem value="medium">R$ 100 - R$ 200</SelectItem>
              <SelectItem value="high">Acima de R$ 200</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-[#313131]/70">
            {filteredServices.length} {filteredServices.length === 1 ? "serviço encontrado" : "serviços encontrados"}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((item) => (
            <Card
              key={item.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Service Image */}
              <div className="relative h-48 bg-gradient-to-br from-[#FF96B2]/20 to-[#FF96B2]/10">
                <img
                  src={item.service.images[0] || "/placeholder.svg"}
                  alt={item.service.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-[#FF96B2] text-white">{item.availability}</Badge>
                </div>
                {item.isVerified && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-green-500 text-white">✓ Verificado</Badge>
                  </div>
                )}
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-[#313131] text-lg">{item.service.name}</CardTitle>
                <p className="text-sm text-[#313131]/70 line-clamp-2">{item.service.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Professional Info */}
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={item.professional.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-[#FF96B2] text-white">
                      {item.professional.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-[#313131]">{item.professional.name}</p>
                    <div className="flex items-center space-x-2 text-sm text-[#313131]/70">
                      <div className="flex items-center">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{item.professional.rating}</span>
                        <span className="ml-1">({item.professional.reviews})</span>
                      </div>
                      <span>•</span>
                      <span>{item.professional.experience}</span>
                    </div>
                  </div>
                </div>

                {/* Service Details */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-[#313131]/70">
                    <Clock className="w-4 h-4 mr-1" />
                    {item.service.duration}
                  </div>
                  <div className="flex items-center text-[#313131]/70">
                    <MapPin className="w-4 h-4 mr-1" />
                    {item.professional.location.split(",")[0]}
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-2 border-t border-[#EFEFEF]">
                  <div>
                    <span className="text-2xl font-bold text-[#FF96B2]">R$ {item.service.price}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#FF96B2] text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white"
                    >
                      Ver perfil
                    </Button>
                    <Button size="sm" className="bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white">
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
            <Button variant="outline" className="border-[#FF96B2] text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white">
              Carregar mais serviços
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-[#EFEFEF] rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-[#313131]/30" />
            </div>
            <h3 className="text-xl font-semibold text-[#313131] mb-2">Nenhum serviço encontrado</h3>
            <p className="text-[#313131]/70 mb-4">Tente ajustar os filtros ou buscar por outros termos</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedLocation("all")
                setPriceRange("all")
              }}
              className="bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white"
            >
              Limpar filtros
            </Button>
          </div>
        )}

        {/* Professional CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#FF96B2] to-[#FF96B2]/80 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Você é um profissional da beleza?</h2>
          <p className="text-lg mb-6 opacity-90">Cadastre-se e ofereça seus serviços para milhares de clientes</p>
          <Button size="lg" className="bg-white text-[#FF96B2] hover:bg-[#EFEFEF] font-semibold">
            Cadastrar como Profissional
          </Button>
        </div>
      </div>
    </div>
  )
}
