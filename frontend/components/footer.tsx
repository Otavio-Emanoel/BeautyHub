import Link from "next/link"
import { Calendar, Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#313131] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Calendar className="w-8 h-8 text-[#FF96B2]" />
              <span className="text-xl font-bold">BeautyBook</span>
            </Link>
            <p className="text-white/70 mb-4 max-w-md">
              A plataforma completa para modernizar seu salão de beleza com agendamentos inteligentes e gestão
              eficiente.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-white/70 hover:text-[#FF96B2] cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-white/70 hover:text-[#FF96B2] cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-white/70 hover:text-[#FF96B2] cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <div className="space-y-2">
              <Link href="/salons" className="block text-white/70 hover:text-[#FF96B2] transition-colors">
                Encontrar Salões
              </Link>
              <Link href="/services" className="block text-white/70 hover:text-[#FF96B2] transition-colors">
                Serviços
              </Link>
              <Link href="/about" className="block text-white/70 hover:text-[#FF96B2] transition-colors">
                Sobre Nós
              </Link>
              <Link href="/contact" className="block text-white/70 hover:text-[#FF96B2] transition-colors">
                Contato
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Suporte</h3>
            <div className="space-y-2">
              <Link href="/help" className="block text-white/70 hover:text-[#FF96B2] transition-colors">
                Central de Ajuda
              </Link>
              <Link href="/privacy" className="block text-white/70 hover:text-[#FF96B2] transition-colors">
                Privacidade
              </Link>
              <Link href="/terms" className="block text-white/70 hover:text-[#FF96B2] transition-colors">
                Termos de Uso
              </Link>
              <Link href="/faq" className="block text-white/70 hover:text-[#FF96B2] transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/70">
          <p>&copy; 2024 BeautyBook. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
