"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Star, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ServicePublicPage() {
  const { id } = useParams()
  const router = useRouter()
  const [service, setService] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchService() {
      setLoading(true)
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/${id}`)
        const data = await res.json()
        setService(data.service)
        setReviews(data.reviews || [])
      } catch {
        setService(null)
        setReviews([])
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchService()
  }, [id])

  if (loading) return <div className="p-8 text-center">Carregando...</div>
  if (!service) return <div className="p-8 text-center">Serviço não encontrado</div>

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>{service.name}</CardTitle>
          <CardDescription>{service.category}</CardDescription>
        </CardHeader>
        <CardContent>
          <img
            src={service.image || "/placeholder.svg"}
            alt={service.name}
            className="w-full h-48 object-cover rounded mb-4"
          />
          <div className="mb-2 text-[#313131] dark:text-white">
            <strong>Descrição:</strong> {service.description}
          </div>
          <div className="mb-2 text-[#313131] dark:text-white">
            <strong>Duração:</strong> {service.duration} min
          </div>
          <div className="mb-2 text-[#313131] dark:text-white">
            <strong>Preço:</strong> R$ {service.price}
          </div>
          {service.professionalId && (
            <div className="mb-2">
              <Button
                size="sm"
                variant="outline"
                className="border-[#FF96B2] text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white"
                onClick={() => router.push(`/professional/${service.professionalId}`)}
              >
                Ver perfil do profissional
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Avaliações</h2>
        {reviews.length === 0 ? (
          <div className="text-[#313131]/70 dark:text-white/70">Nenhuma avaliação para este serviço ainda.</div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="py-4">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{review.clientName || "Cliente"}</span>
                    <span className="ml-2 flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${review.rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                          fill={review.rating >= star ? "#facc15" : "none"}
                        />
                      ))}
                    </span>
                  </div>
                  <div className="text-sm text-[#313131]/80 dark:text-white/80">{review.review}</div>
                  <div className="text-xs text-[#313131]/60 dark:text-white/60 mt-1">
                    {review.ratedAt ? new Date(review.ratedAt).toLocaleDateString("pt-BR") : ""}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}