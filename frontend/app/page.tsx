import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Star, Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#18181b]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#FF96B2] to-[#FF96B2]/80 text-white py-20 dark:from-[#FF96B2] dark:to-[#FF96B2]/80 dark:text-[#18181b]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 text-white">Transforme seu salão com nossa plataforma</h1>
        <p className="text-xl mb-8 opacity-90 text-white">
          Gerencie agendamentos, clientes e serviços de forma inteligente e moderna
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/register">
            <Button
          size="lg"
          className="bg-white text-[#FF96B2] hover:bg-[#EFEFEF] font-semibold dark:bg-[#18181b] dark:text-[#FF96B2] dark:hover:bg-[#232326]"
            >
          Começar Gratuitamente
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button
          size="lg"
          variant="outline"
          className="bg-white text-[#FF96B2] hover:bg-[#EFEFEF] font-semibold dark:bg-[#18181b] dark:text-[#FF96B2] dark:border-[#FF96B2] dark:hover:bg-[#232326]"
            >
          Fazer Login
            </Button>
          </Link>
        </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#EFEFEF] dark:bg-[#232326]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#313131] mb-4 dark:text-white">Tudo que você precisa em um só lugar</h2>
            <p className="text-lg text-[#313131]/70 max-w-2xl mx-auto dark:text-[#d1d5db]/70">
              Nossa plataforma oferece todas as ferramentas necessárias para modernizar seu salão
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-[#18181b] dark:text-white">
              <CardHeader>
                <Calendar className="w-12 h-12 text-[#FF96B2] mb-4" />
                <CardTitle className="text-[#313131] dark:text-white">Agendamento Inteligente</CardTitle>
                <CardDescription className="dark:text-[#d1d5db]/80">
                  Sistema completo de agendamentos com confirmações automáticas
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-[#18181b] dark:text-white">
              <CardHeader>
                <Users className="w-12 h-12 text-[#FF96B2] mb-4" />
                <CardTitle className="text-[#313131] dark:text-white">Gestão de Clientes</CardTitle>
                <CardDescription className="dark:text-[#d1d5db]/80">
                  Mantenha o histórico completo e preferências de cada cliente
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-[#18181b] dark:text-white">
              <CardHeader>
                <Star className="w-12 h-12 text-[#FF96B2] mb-4" />
                <CardTitle className="text-[#313131] dark:text-white">Avaliações</CardTitle>
                <CardDescription className="dark:text-[#d1d5db]/80">
                  Sistema de avaliações para melhorar continuamente seus serviços
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-[#18181b]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#FF96B2] mb-2">500+</div>
              <div className="text-[#313131]/70 dark:text-[#d1d5db]/70">Salões Cadastrados</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FF96B2] mb-2">10k+</div>
              <div className="text-[#313131]/70 dark:text-[#d1d5db]/70">Agendamentos Mensais</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FF96B2] mb-2">98%</div>
              <div className="text-[#313131]/70 dark:text-[#d1d5db]/70">Satisfação dos Clientes</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#313131] text-white dark:bg-[#18181b] dark:text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para revolucionar seu salão?</h2>
          <p className="text-xl mb-8 opacity-90">Junte-se a centenas de salões que já transformaram seu negócio</p>
          <Link href="/auth/register">
            <Button
              size="lg"
              className="bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white font-semibold dark:bg-[#FF96B2] dark:hover:bg-[#e76a8a]"
            >
              Começar Agora
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
