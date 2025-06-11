"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { FaInstagram, FaPhoneAlt, FaStar } from "react-icons/fa"

export default function SalonDetailsPage() {
  const { id } = useParams()
  const [salon, setSalon] = useState<any>(null)

  useEffect(() => {
    async function fetchSalon() {
      const res = await fetch(`/api/saloes/${id}`)
      const data = await res.json()
      setSalon(data)
    }

    fetchSalon()
  }, [id])

  if (!salon) return <p className="p-6">Carregando...</p>

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Título e imagem principal */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold">{salon.name}</h1>
        <Image
          src={salon.image}
          alt={salon.name}
          width={1200}
          height={600}
          className="rounded-2xl w-full object-cover max-h-[500px]"
        />
      </div>

      {/* Informações principais */}
      <div className="grid md:grid-cols-2 gap-6 text-lg">
        <div>
          <p><strong>Endereço:</strong> {salon.address}</p>
          <p><strong>Horário de Funcionamento:</strong> {salon.openTime} - {salon.closeTime}</p>
          <p className="flex items-center gap-2">
            <FaPhoneAlt className="text-pink-500" />
            {salon.phone}
          </p>
          <a href={salon.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-pink-600 hover:underline">
            <FaInstagram />
            @{salon.instagramHandle}
          </a>
        </div>
        <div>
          <p className="flex items-center gap-2 text-yellow-500 text-xl">
            <FaStar />
            {salon.rating.toFixed(1)} / 5.0
          </p>
          <p className="text-gray-600">{salon.reviewsCount} avaliações</p>
          <p className="mt-2 italic">"{salon.latestReview}"</p>
        </div>
      </div>

      {/* Galeria de imagens */}
      {salon.gallery?.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">Galeria</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {salon.gallery.map((img: string, i: number) => (
              <Image
                key={i}
                src={img}
                alt={`Foto ${i + 1}`}
                width={400}
                height={300}
                className="rounded-xl object-cover w-full h-48"
              />
            ))}
          </div>
        </div>
      )}

      {/* Serviços */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Serviços oferecidos</h2>
        <ul className="list-disc list-inside space-y-1 text-lg">
          {salon.services.map((s: string, i: number) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      {/* Profissionais */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Equipe de profissionais</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {salon.professionals.map((pro: any) => (
            <div key={pro.id} className="bg-white p-4 rounded-xl shadow-md text-center">
              <Image
                src={pro.photo}
                alt={pro.name}
                width={120}
                height={120}
                className="mx-auto rounded-full mb-2 object-cover w-24 h-24"
              />
              <h3 className="text-lg font-bold">{pro.name}</h3>
              <p className="text-sm text-gray-600">{pro.specialty}</p>
              <p className="text-sm mt-1">{pro.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
