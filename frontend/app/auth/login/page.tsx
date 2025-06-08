"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Eye, EyeOff, Mail, Lock } from "lucide-react"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const router = useRouter();

  async function handleLogin(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/client/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Perfil:", data);
      } else {
        alert("Erro ao buscar perfil");
      }

    } catch (error: any) {
      alert("Erro ao fazer login: " + error.message);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);      
      router.push("/"); // Redireciona para a home
    } catch (error: any) {
      alert("Erro ao fazer login: " + error.message);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFEFEF] to-white dark:from-[#18181b] dark:to-[#27272a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <Calendar className="w-10 h-10 text-[#FF96B2] dark:text-[#f472b6]" />
            <span className="text-2xl font-bold text-[#313131] dark:text-white">BeautyHub</span>
          </Link>
        </div>

        <Card className="border-0 shadow-xl bg-white dark:bg-[#232326] w-full min-h-[540px] md:min-h-[600px] md:h-[600px] md:max-w-xl mx-auto flex flex-col justify-center">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl text-[#313131] dark:text-white">Bem-vindo de volta</CardTitle>
            <CardDescription className="dark:text-[#d1d5db] text-base md:text-lg">Entre na sua conta para continuar</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="space-y-2">
                <Label htmlFor="email" className="dark:text-[#f3f4f6]">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-[#313131]/50 dark:text-[#f3f4f6]/50" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-12 py-3 text-lg border-[#EFEFEF] focus:border-[#FF96B2] dark:bg-[#18181b] dark:border-[#232326] dark:text-white dark:focus:border-[#f472b6]"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="dark:text-[#f3f4f6]">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-[#313131]/50 dark:text-[#f3f4f6]/50" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    className="pl-12 pr-12 py-3 text-lg border-[#EFEFEF] focus:border-[#FF96B2] dark:bg-[#18181b] dark:border-[#232326] dark:text-white dark:focus:border-[#f472b6]"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-[#313131]/50 dark:text-[#f3f4f6]/50" />
                    ) : (
                      <Eye className="w-5 h-5 text-[#313131]/50 dark:text-[#f3f4f6]/50" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link href="/reset" className="text-sm text-[#FF96B2] hover:underline dark:text-[#f472b6]">
                  Esqueceu a senha?
                </Link>
              </div>

              <Button type="submit" className="w-full py-3 text-lg bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white dark:bg-[#f472b6] dark:hover:bg-[#f472b6]/90">
                Entrar
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-base text-[#313131]/70 dark:text-[#f3f4f6]/60">
                Não tem uma conta?{" "}
                <Link href="/auth/register" className="text-[#FF96B2] hover:underline font-medium dark:text-[#f472b6]">
                  Cadastre-se
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}