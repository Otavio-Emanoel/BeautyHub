"use client"

import { useEffect, useState, } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Calendar, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

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



// Helper function to render navigation links based on user role
function renderLinks(user?: { role?: string } | null, theme?: string) {
  const role = user?.role;
  if (!user) {
    // Visitante
    return (
      <>
        <Link href="/" className={`${theme === "dark" ? "text-white" : "text-[#313131]"} hover:text-[#FF96B2]`}>Início</Link>
        <Link href="/salons" className={`${theme === "dark" ? "text-white" : "text-[#313131]"} hover:text-[#FF96B2]`}>Explorar</Link>
        <Link href="/services" className={`${theme === "dark" ? "text-white" : "text-[#313131]"} hover:text-[#FF96B2]`}>Serviços</Link>
      </>
    )
  }

  if (role === "usuario") {
    return (
      <>
        <Link href="/" className={`${theme === "dark" ? "text-white" : "text-[#313131]"} hover:text-[#FF96B2]`}>Início</Link>
        <Link href="/salons" className={`${theme === "dark" ? "text-white" : "text-[#313131]"} hover:text-[#FF96B2]`}>Explorar</Link>
        <Link href="/services" className={`${theme === "dark" ? "text-white" : "text-[#313131]"} hover:text-[#FF96B2]`}>Serviços</Link>
        <Link href="/appoint" className={`${theme === "dark" ? "text-white" : "text-[#313131]"} hover:text-[#FF96B2]`}>Meus Agendamentos</Link>
        <Link href="/user" className={`${theme === "dark" ? "text-white" : "text-[#313131]"} hover:text-[#FF96B2]`}>Área do Usuário</Link>
      </>
    )
  }

  if (role === "profissional") {
    return (
      <>
        <Link href="/dashboard" className={`${theme === "dark" ? "text-white" : "text-[#313131]"} hover:text-[#FF96B2]`}>Área do Profissional</Link>
        <Link href="/appoint-pro" className={`${theme === "dark" ? "text-white" : "text-[#313131]"} hover:text-[#FF96B2]`}>Agendamentos</Link>
        <Link href="/about-me" className={`${theme === "dark" ? "text-white" : "text-[#313131]"} hover:text-[#FF96B2]`}>Sobre mim</Link>
        <Link href="/report" className={`${theme === "dark" ? "text-white" : "text-[#313131]"} hover:text-[#FF96B2]`}>Relatórios</Link>
      </>
    )
  }

  if (role === "salao") {
    return (
      <>
        <Link href="/admin" className={`${theme === "dark" ? "text-white" : "text-[#313131]"} hover:text-[#FF96B2]`}>Dashboard</Link>
        <Link href="/my-salon" className={`${theme === "dark" ? "text-white" : "text-[#313131]"} hover:text-[#FF96B2]`}>Meu Salão</Link>
        <Link href="/appoint" className={`${theme === "dark" ? "text-white" : "text-[#313131]"} hover:text-[#FF96B2]`}>Agendamentos</Link>
        <Link href="/services" className={`${theme === "dark" ? "text-white" : "text-[#313131]"} hover:text-[#FF96B2]`}>Serviços</Link>
        <Link href="/report" className={`${theme === "dark" ? "text-white" : "text-[#313131]"} hover:text-[#FF96B2]`}>Relatórios</Link>
      </>
    )
  }

  return null;
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()
  const { resolvedTheme, setTheme, theme} = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Só renderiza depois de montado para evitar flash de tema errado
  if (!mounted) {
    return (
      <nav className="shadow-sm border-b sticky top-0 z-50 bg-white border-[#EFEFEF] text-[#313131]">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <span className="text-[#313131]">Carregando...</span>
        </div>
      </nav>
    )
  }

  return (
    <nav
      className={`shadow-sm border-b sticky top-0 z-50 transition-colors duration-300
        ${theme === "dark" ? "bg-black border-[#222] text-white" : "bg-white border-[#EFEFEF] text-[#313131]"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Calendar className={`w-8 h-8 ${theme === "dark" ? "text-[#FF96B2]" : "text-[#FF96B2]"}`} />
            <span className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-[#313131]"}`}>BeautyHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {renderLinks(user, theme)}
          </div>

          {/* Só renderiza o botão de tema se estiver montado */}
          {mounted && (
            <button
              aria-label="Alternar tema"
              className={`ml-4 p-2 rounded-lg transition-all duration-200 ease-in-out cursor-pointer
                ${theme === "dark" ? "bg-[#FF96B2]" : "bg-black"}`}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-white-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-300" />
              )}
            </button>
          )}

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Link href="/auth/login">
                  <Button
                    variant="ghost"
                    className={`${theme === "dark" ? "text-white hover:text-[#FF96B2]" : "text-[#313131] hover:text-[#FF96B2]"}`}
                  >
                    Entrar
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white">Cadastrar</Button>
                </Link>
              </>
            ) : (
              <Link href="/logout">
                <Button
                  variant="ghost"
                  className={`${theme === "dark" ? "text-white hover:text-[#FF96B2]" : "text-[#313131] hover:text-[#FF96B2]"}`}
                >
                  Sair
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className={`w-6 h-6 ${theme === "dark" ? "text-white" : "text-[#313131]"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${theme === "dark" ? "text-white" : "text-[#313131]"}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className={`md:hidden py-4 border-t ${theme === "dark" ? "border-[#222]" : "border-[#EFEFEF]"}`}>
            <div className="flex flex-col items-center space-y-4">
              {renderLinks(user, theme)}
            </div>
            <div className={`pt-4 border-t ${theme === "dark" ? "border-[#222]" : "border-[#EFEFEF]"}`}>
              {!user ? (
                <>
                  <Link href="/auth/login">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${theme === "dark" ? "text-white hover:text-[#FF96B2]" : "text-[#313131] hover:text-[#FF96B2]"}`}
                    >
                      Entrar
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button className="w-full bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white">Cadastrar</Button>
                  </Link>
                </>
              ) : (
                <Link href="/logout">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${theme === "dark" ? "text-white hover:text-[#FF96B2]" : "text-[#313131] hover:text-[#FF96B2]"}`}
                  >
                    Sair
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
 