"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Calendar } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm border-b border-[#EFEFEF] sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Calendar className="w-8 h-8 text-[#FF96B2]" />
            <span className="text-xl font-bold text-[#313131]">BeautyBook</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/salons" className="text-[#313131] hover:text-[#FF96B2] transition-colors">
              Salões
            </Link>
            <Link href="/services" className="text-[#313131] hover:text-[#FF96B2] transition-colors">
              Serviços
            </Link>
            <Link href="/about" className="text-[#313131] hover:text-[#FF96B2] transition-colors">
              Sobre
            </Link>
            <Link href="/contact" className="text-[#313131] hover:text-[#FF96B2] transition-colors">
              Contato
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-[#313131] hover:text-[#FF96B2]">
                Entrar
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white">Cadastrar</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6 text-[#313131]" /> : <Menu className="w-6 h-6 text-[#313131]" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-[#EFEFEF]">
            <div className="flex flex-col space-y-4">
              <Link href="/salons" className="text-[#313131] hover:text-[#FF96B2] transition-colors">
                Salões
              </Link>
              <Link href="/services" className="text-[#313131] hover:text-[#FF96B2] transition-colors">
                Serviços
              </Link>
              <Link href="/about" className="text-[#313131] hover:text-[#FF96B2] transition-colors">
                Sobre
              </Link>
              <Link href="/contact" className="text-[#313131] hover:text-[#FF96B2] transition-colors">
                Contato
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-[#EFEFEF]">
                <Link href="/auth/login">
                  <Button variant="ghost" className="w-full justify-start text-[#313131] hover:text-[#FF96B2]">
                    Entrar
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="w-full bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white">Cadastrar</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
