"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Calendar } from "lucide-react"

// Substitua isso pelo seu hook real de autenticação
const useAuth = () => {
  // Para visitante:
   //return { user: null }

  // Para usuário comum:
  //return { user: { role: "usuario" } }

  // Para profissional:
   //return { user: { role: "profissional" } }

  // Para salão:
  return { user: { role: "salao" } }
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()

  const role = user?.role

  const renderLinks = () => {
    if (!user) {
      // Visitante
      return (
        <>
          <Link href="/" className="text-[#313131] hover:text-[#FF96B2]">Início</Link>
          <Link href="/salons" className="text-[#313131] hover:text-[#FF96B2]">Explorar</Link>
          <Link href="/services" className="text-[#313131] hover:text-[#FF96B2]">Serviços</Link>
        </>
      )
    }

    if (role === "usuario") {
      return (
        <>
          <Link href="/" className="text-[#313131] hover:text-[#FF96B2]">Início</Link>
          <Link href="/salons" className="text-[#313131] hover:text-[#FF96B2]">Explorar</Link>
          <Link href="/services" className="text-[#313131] hover:text-[#FF96B2]">Serviços</Link>
          <Link href="/appoint" className="text-[#313131] hover:text-[#FF96B2]">Meus Agendamentos</Link>
          <Link href="/user" className="text-[#313131] hover:text-[#FF96B2]">Área do Usuário</Link>
        </>
      )
    }

    if (role === "profissional") {
      return (
        <>
          <Link href="/dashboard" className="text-[#313131] hover:text-[#FF96B2]">Área do Profissional</Link>
          <Link href="/appoint-pro" className="text-[#313131] hover:text-[#FF96B2]">Agendamentos</Link>
          <Link href="/about-me" className="text-[#313131] hover:text-[#FF96B2]">Sobre mim</Link>
          <Link href="/report" className="text-[#313131] hover:text-[#FF96B2]">Relatórios</Link>
        </>
      )
    }

    if (role === "salao") {
      return (
        <>
          <Link href="/dashboard" className="text-[#313131] hover:text-[#FF96B2]">Dashboard</Link>
          <Link href="/my-salon" className="text-[#313131] hover:text-[#FF96B2]">Meu Salão</Link>
          <Link href="/appoint" className="text-[#313131] hover:text-[#FF96B2]">Agendamentos</Link>
          <Link href="/services" className="text-[#313131] hover:text-[#FF96B2]">Serviços</Link>
          <Link href="/report" className="text-[#313131] hover:text-[#FF96B2]">Relatórios</Link>
        </>
      )
    }
  }

  return (
    <nav className="bg-white shadow-sm border-b border-[#EFEFEF] sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Calendar className="w-8 h-8 text-[#FF96B2]" />
            <span className="text-xl font-bold text-[#313131]">NOME</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {renderLinks()}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" className="text-[#313131] hover:text-[#FF96B2]">Entrar</Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white">Cadastrar</Button>
                </Link>
              </>
            ) : (
              <Link href="/logout">
                <Button variant="ghost" className="text-[#313131] hover:text-[#FF96B2]">Sair</Button>
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6 text-[#313131]" /> : <Menu className="w-6 h-6 text-[#313131]" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-[#EFEFEF]">
            <div className="flex flex-col space-y-4">
              {renderLinks()}
              <div className="pt-4 border-t border-[#EFEFEF]">
                {!user ? (
                  <>
                    <Link href="/auth/login">
                      <Button variant="ghost" className="w-full justify-start text-[#313131] hover:text-[#FF96B2]">Entrar</Button>
                    </Link>
                    <Link href="/auth/register">
                      <Button className="w-full bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white">Cadastrar</Button>
                    </Link>
                  </>
                ) : (
                  <Link href="/logout">
                    <Button variant="ghost" className="w-full justify-start text-[#313131] hover:text-[#FF96B2]">Sair</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
