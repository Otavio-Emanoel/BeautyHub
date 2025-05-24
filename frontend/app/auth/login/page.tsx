"use client"

import { useState } from "react"
import { Eye, EyeOff, Lock, Mail, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login")
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`${activeTab === "login" ? "Login" : "Register"}:`, formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#efefef] to-white flex items-center justify-center px-4">
      <div className="relative w-full max-w-4xl h-[500px] bg-white shadow-2xl rounded-xl overflow-hidden">
        {/* Painéis laterais */}
        <div className="absolute w-1/2 h-full top-0 left-0 flex flex-col items-center justify-center bg-pink-400 text-white transition-all duration-700 ease-in-out z-20"
             style={{ transform: activeTab === "register" ? "translateX(100%)" : "translateX(0%)" }}>
          <Calendar className="w-12 h-12 mb-2" />
          <h2 className="text-3xl font-bold mb-2">Olá, de novo!</h2>
          <p className="mb-4 text-center max-w-[200px]">Já tem uma conta? Clique abaixo e faça login.</p>
          <Button variant="ghost" onClick={() => setActiveTab("login")} className="border border-white text-white">
            Entrar
          </Button>
        </div>

        <div className="absolute w-1/2 h-full top-0 right-0 flex flex-col items-center justify-center bg-pink-400 text-white transition-all duration-700 ease-in-out z-20"
             style={{ transform: activeTab === "login" ? "translateX(-100%)" : "translateX(0%)" }}>
          <Calendar className="w-12 h-12 mb-2" />
          <h2 className="text-3xl font-bold mb-2">Seja bem-vindo!</h2>
          <p className="mb-4 text-center max-w-[200px]">Ainda não tem conta? Clique abaixo e cadastre-se.</p>
          <Button variant="ghost" onClick={() => setActiveTab("register")} className="border border-white text-white">
            Cadastrar
          </Button>
        </div>

        {/* Conteúdo (Formulários) */}
        <div
          className={`absolute top-0 left-0 w-full h-full flex transition-transform duration-700 ease-in-out`}
          style={{
            transform: activeTab === "register" ? "translateX(-50%)" : "translateX(0%)"
          }}
        >
          {/* Formulário de Login */}
          <div className="w-1/2 h-full px-10 py-12 bg-white flex flex-col justify-center z-10">
            <h2 className="text-2xl font-bold text-pink-500 mb-4">Entrar</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5">
                    {showPassword ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-gray-500" />}
                  </button>
                </div>
              </div>
              <div className="text-right">
                <Link href="/auth/forgot-password" className="text-sm text-pink-400 hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>
              <Button type="submit" className="w-full bg-pink-400 text-white hover:bg-pink-500">
                Entrar
              </Button>
            </form>
          </div>

          {/* Formulário de Registro */}
          <div className="w-1/2 h-full px-10 py-12 bg-white flex flex-col justify-center z-10">
            <h2 className="text-2xl font-bold text-pink-500 mb-4">Cadastrar</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email-register">E-mail</Label>
                <Input
                  id="email-register"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password-register">Senha</Label>
                <Input
                  id="password-register"
                  type="password"
                  placeholder="Crie uma senha"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-pink-400 text-white hover:bg-pink-500">
                Cadastrar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
