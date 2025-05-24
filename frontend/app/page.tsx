import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Star, Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#FF96B2] to-[#FF96B2]/80 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Transforme seu salão com nossa plataforma</h1>
            <p className="text-xl mb-8 opacity-90">
              Gerencie agendamentos, clientes e serviços de forma inteligente e moderna
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="bg-white text-[#FF96B2] hover:bg-[#EFEFEF] font-semibold">
                  Começar Gratuitamente
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-[#FF96B2] hover:bg-[#EFEFEF] font-semibold"
                >
                  Fazer Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#EFEFEF]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#313131] mb-4">Tudo que você precisa em um só lugar</h2>
            <p className="text-lg text-[#313131]/70 max-w-2xl mx-auto">
              Nossa plataforma oferece todas as ferramentas necessárias para modernizar seu salão
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Calendar className="w-12 h-12 text-[#FF96B2] mb-4" />
                <CardTitle className="text-[#313131]">Agendamento Inteligente</CardTitle>
                <CardDescription>Sistema completo de agendamentos com confirmações automáticas</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Users className="w-12 h-12 text-[#FF96B2] mb-4" />
                <CardTitle className="text-[#313131]">Gestão de Clientes</CardTitle>
                <CardDescription>Mantenha o histórico completo e preferências de cada cliente</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Star className="w-12 h-12 text-[#FF96B2] mb-4" />
                <CardTitle className="text-[#313131]">Avaliações</CardTitle>
                <CardDescription>Sistema de avaliações para melhorar continuamente seus serviços</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#FF96B2] mb-2">500+</div>
              <div className="text-[#313131]/70">Salões Cadastrados</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FF96B2] mb-2">10k+</div>
              <div className="text-[#313131]/70">Agendamentos Mensais</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FF96B2] mb-2">98%</div>
              <div className="text-[#313131]/70">Satisfação dos Clientes</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#313131] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para revolucionar seu salão?</h2>
          <p className="text-xl mb-8 opacity-90">Junte-se a centenas de salões que já transformaram seu negócio</p>
          <Link href="/auth/register">
            <Button size="lg" className="bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white font-semibold">
              Começar Agora
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
