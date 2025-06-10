"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Calendar, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { useAuth } from "@/hooks/useAuth"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

// Tipagem do usuário local com role
interface LocalUser {
  uid: string
  email: string
  role: "client" | "professional" | "admin"
}

// Helper function para exibir links de navegação com base na role
function renderLinks(user?: LocalUser | null, theme?: string) {
  const commonLinkClass = `${theme === "dark" ? "text-white" : "text-[#313131]"} hover:text-[#FF96B2]"`
  if (!user) {
    return (
      <>
        <Link href="/" className={commonLinkClass}>Início</Link>
        <Link href="/salons" className={commonLinkClass}>Explorar</Link>
        <Link href="/services" className={commonLinkClass}>Serviços</Link>
      </>
    )
  }

  switch (user.role) {
    case "client":
      return (
        <>
          <Link href="/" className={commonLinkClass}>Início</Link>
          <Link href="/salons" className={commonLinkClass}>Explorar</Link>
          <Link href="/services" className={commonLinkClass}>Serviços</Link>
          <Link href="/appoint" className={commonLinkClass}>Meus Agendamentos</Link>
          <Link href="/user" className={commonLinkClass}>Área do Usuário</Link>
        </>
      )
    case "professional":
      return (
        <>
          <Link href="/dashboard" className={commonLinkClass}>Área do Profissional</Link>
          <Link href="/appoint-pro" className={commonLinkClass}>Agendamentos</Link>
          <Link href="/about-me" className={commonLinkClass}>Sobre mim</Link>
          <Link href="/report" className={commonLinkClass}>Relatórios</Link>
        </>
      )
    case "admin":
      return (
        <>
          <Link href="/admin" className={commonLinkClass}>Dashboard</Link>
          <Link href="/my-salon" className={commonLinkClass}>Meu Salão</Link>
          <Link href="/appoint" className={commonLinkClass}>Agendamentos</Link>
          <Link href="/services" className={commonLinkClass}>Serviços</Link>
          <Link href="/report" className={commonLinkClass}>Relatórios</Link>
        </>
      )
    default:
      return null
  }
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user: firebaseUser } = useAuth()
  const [localUser, setLocalUser] = useState<LocalUser | null>(null)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme, theme } = useTheme()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setLocalUser(parsedUser)
      } catch (error) {
        console.error("Erro ao analisar user do localStorage", error)
      }
    }
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <nav className="shadow-sm border-b sticky top-0 z-50 bg-white border-[#EFEFEF] text-[#313131]">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <span className="text-[#313131]">Carregando...</span>
        </div>
      </nav>
    )
  }

  const themeToggleButton = (
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
  )

  return (
    <nav
      className={`shadow-sm border-b sticky top-0 z-50 transition-colors duration-300
        ${theme === "dark" ? "bg-black border-[#222] text-white" : "bg-white border-[#EFEFEF] text-[#313131]"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Calendar className="w-8 h-8 text-[#FF96B2]" />
            <span className="text-xl font-bold">BeautyHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {renderLinks(localUser, theme)}
          </div>

          {/* Theme Toggle */}
          {themeToggleButton}

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {!firebaseUser ? (
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
              <Button
                variant="ghost"
                onClick={() => signOut(auth)}
                className={`${theme === "dark" ? "text-white hover:text-[#FF96B2]" : "text-[#313131] hover:text-[#FF96B2]"}`}
              >
                Sair
              </Button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
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
              {renderLinks(localUser, theme)}
            </div>
            <div className={`pt-4 border-t ${theme === "dark" ? "border-[#222]" : "border-[#EFEFEF]"}`}>
              {!firebaseUser ? (
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
                <Button
                  variant="ghost"
                  onClick={() => signOut(auth)}
                  className={`w-full justify-start ${theme === "dark" ? "text-white hover:text-[#FF96B2]" : "text-[#313131] hover:text-[#FF96B2]"}`}
                >
                  Sair
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
