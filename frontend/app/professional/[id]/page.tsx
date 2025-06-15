"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Star, MapPin, Instagram, Phone, MessageSquare } from "lucide-react"

export default function PublicProfessionalProfile() {
  const { id } = useParams()
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        // Busca perfil público
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professional/public-profile/${id}`)
        const data = await res.json()
        setProfile(data.profile || null)
        // Busca serviços públicos desse profissional
        const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professional/services-public?professionalId=${id}`)
        const data2 = await res2.json()
        setServices(data2.services || [])
      } catch {
        setProfile(null)
        setServices([])
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchData()
  }, [id])

  if (loading) return <div className="p-8 text-center">Carregando...</div>
  if (!profile) return <div className="p-8 text-center text-red-500">Profissional não encontrado</div>

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Card className="mb-8">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src={profile.avatar || "/placeholder.svg"} />
            <AvatarFallback>
              {profile.name?.split(" ").map((n: string) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">{profile.name}</CardTitle>
          <div className="flex items-center gap-2 mt-2 text-[#313131]/70">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{profile.rating || "4.8"}</span>
            <span>•</span>
            <MapPin className="w-4 h-4" />
            <span>{profile.location}</span>
          </div>
          <div className="flex gap-3 mt-3">
            {profile.instagram && (
              <a href={`https://instagram.com/${profile.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer">
                <Instagram className="w-5 h-5 text-[#FF96B2]" />
              </a>
            )}
            {profile.phone && (
              <a href={`https://wa.me/55${profile.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
                <MessageSquare className="w-5 h-5 text-green-500" />
              </a>
            )}
            {profile.phone && (
              <a href={`tel:${profile.phone}`}>
                <Phone className="w-5 h-5 text-blue-500" />
              </a>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-[#313131]/80 mb-4">{profile.bio}</p>
        </CardContent>
      </Card>

      <h2 className="text-xl font-bold mb-4">Serviços oferecidos</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {services.length === 0 && <div className="text-[#313131]/70">Nenhum serviço cadastrado</div>}
        {services.map(service => (
          <Card key={service.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">{service.name}</CardTitle>
              <div className="text-sm text-[#313131]/70">{service.category}</div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <div>
                <p className="mb-2">{service.description}</p>
                <div className="flex items-center gap-2 text-sm text-[#313131]/70">
                  <span>Duração: {service.duration} min</span>
                  <span>•</span>
                  <span>R$ {service.price}</span>
                </div>
              </div>
              <Button
                className="mt-4 bg-[#FF96B2] text-white"
                onClick={() => {
                  const token = localStorage.getItem("token")
                  if (!token) {
                    router.push("/auth/login")
                  } else {
                    router.push(`/booking?serviceId=${service.id}&professionalId=${profile.uid || id}`)
                  }
                }}
              >
                Agendar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}