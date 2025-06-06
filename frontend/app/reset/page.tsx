"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Calendar, Lock, Eye, EyeOff, CheckCircle, AlertCircle, Loader2, Shield } from "lucide-react"

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const email = searchParams.get("email")

  const [step, setStep] = useState<"loading" | "form" | "success" | "error">("loading")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)

  useEffect(() => {
    // Verificar se o token é válido
    const verifyToken = async () => {
      if (!token) {
        setStep("error")
        setError("Token de recuperação não encontrado")
        return
      }

      try {
        // Simular verificação do token
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Implementar verificação real do token aqui
        console.log("Verifying token:", token)

        setStep("form")
      } catch (error) {
        setStep("error")
        setError("Token inválido ou expirado")
      }
    }

    verifyToken()
  }, [token])

  useEffect(() => {
    // Calcular força da senha
    const calculateStrength = (pwd: string) => {
      let strength = 0
      if (pwd.length >= 8) strength += 25
      if (/[a-z]/.test(pwd)) strength += 25
      if (/[A-Z]/.test(pwd)) strength += 25
      if (/[0-9]/.test(pwd)) strength += 25
      return strength
    }

    setPasswordStrength(calculateStrength(password))
  }, [password])

  const getStrengthColor = (strength: number) => {
    if (strength < 25) return "bg-red-500"
    if (strength < 50) return "bg-orange-500"
    if (strength < 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStrengthText = (strength: number) => {
    if (strength < 25) return "Muito fraca"
    if (strength < 50) return "Fraca"
    if (strength < 75) return "Média"
    return "Forte"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validações
    if (!password) {
      setError("Por favor, digite uma nova senha")
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres")
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem")
      setIsLoading(false)
      return
    }

    if (passwordStrength < 50) {
      setError("Por favor, escolha uma senha mais forte")
      setIsLoading(false)
      return
    }

    try {
      // Simular redefinição de senha
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Implementar lógica real de redefinição aqui
      console.log("Password reset for:", email, "with token:", token)

      setStep("success")
    } catch (error) {
      setError("Erro ao redefinir senha. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFEFEF] to-white dark:from-[#18181b] dark:to-[#232329] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <Calendar className="w-10 h-10 text-[#FF96B2] dark:text-[#FF5C8A]" />
            <span className="text-2xl font-bold text-[#313131] dark:text-white">BeautyBook</span>
          </Link>
        </div>

        <Card className="border-0 shadow-xl bg-white dark:bg-[#232329]">
          {/* Loading State */}
          {step === "loading" && (
            <>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-[#FF96B2]/10 dark:bg-[#FF5C8A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="w-8 h-8 text-[#FF96B2] dark:text-[#FF5C8A] animate-spin" />
                </div>
                <CardTitle className="text-2xl text-[#313131] dark:text-white">Verificando...</CardTitle>
                <CardDescription className="dark:text-zinc-300">Validando seu link de recuperação</CardDescription>
              </CardHeader>
            </>
          )}

          {/* Form State */}
          {step === "form" && (
            <>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-[#FF96B2]/10 dark:bg-[#FF5C8A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-[#FF96B2] dark:text-[#FF5C8A]" />
                </div>
                <CardTitle className="text-2xl text-[#313131] dark:text-white">Nova senha</CardTitle>
                <CardDescription className="dark:text-zinc-300">{email ? `Redefinindo senha para ${email}` : "Digite sua nova senha"}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="dark:text-zinc-200">Nova senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50 dark:text-zinc-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Digite sua nova senha"
                        className="pl-10 pr-10 border-[#EFEFEF] dark:border-zinc-700 focus:border-[#FF96B2] dark:focus:border-[#FF5C8A] bg-white dark:bg-zinc-900 text-[#313131] dark:text-white"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-[#313131]/50 dark:text-zinc-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-[#313131]/50 dark:text-zinc-400" />
                        )}
                      </button>
                    </div>
                    {password && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#313131]/70 dark:text-zinc-400">Força da senha:</span>
                          <span
                            className={`font-medium ${
                              passwordStrength >= 75
                                ? "text-green-600 dark:text-green-400"
                                : passwordStrength >= 50
                                ? "text-yellow-600 dark:text-yellow-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {getStrengthText(passwordStrength)}
                          </span>
                        </div>
                        <Progress value={passwordStrength} className="h-2 bg-zinc-200 dark:bg-zinc-800">
                          <div
                            className={`h-full transition-all ${
                              passwordStrength < 25
                                ? "bg-red-500 dark:bg-red-600"
                                : passwordStrength < 50
                                ? "bg-orange-500 dark:bg-orange-600"
                                : passwordStrength < 75
                                ? "bg-yellow-500 dark:bg-yellow-600"
                                : "bg-green-500 dark:bg-green-600"
                            }`}
                            style={{ width: `${passwordStrength}%` }}
                          />
                        </Progress>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="dark:text-zinc-200">Confirmar nova senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50 dark:text-zinc-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirme sua nova senha"
                        className="pl-10 pr-10 border-[#EFEFEF] dark:border-zinc-700 focus:border-[#FF96B2] dark:focus:border-[#FF5C8A] bg-white dark:bg-zinc-900 text-[#313131] dark:text-white"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={isLoading}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4 text-[#313131]/50 dark:text-zinc-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-[#313131]/50 dark:text-zinc-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <div className="text-xs text-[#313131]/70 dark:text-zinc-400 space-y-1">
                    <p>A senha deve conter:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li className={password.length >= 8 ? "text-green-600 dark:text-green-400" : ""}>Pelo menos 8 caracteres</li>
                      <li className={/[a-z]/.test(password) ? "text-green-600 dark:text-green-400" : ""}>Uma letra minúscula</li>
                      <li className={/[A-Z]/.test(password) ? "text-green-600 dark:text-green-400" : ""}>Uma letra maiúscula</li>
                      <li className={/[0-9]/.test(password) ? "text-green-600 dark:text-green-400" : ""}>Um número</li>
                    </ul>
                  </div>

                  {error && (
                    <Alert className="border-red-200 dark:border-red-600 bg-red-50 dark:bg-red-950">
                      <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                      <AlertDescription className="text-red-800 dark:text-red-300">{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white dark:bg-[#FF5C8A] dark:hover:bg-[#FF5C8A]/90"
                    disabled={isLoading || passwordStrength < 50}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Redefinindo...
                      </>
                    ) : (
                      "Redefinir senha"
                    )}
                  </Button>
                </form>
              </CardContent>
            </>
          )}

          {/* Success State */}
          {step === "success" && (
            <>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-2xl text-[#313131] dark:text-white">Senha redefinida!</CardTitle>
                <CardDescription className="dark:text-zinc-300">Sua senha foi alterada com sucesso</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="border-green-200 dark:border-green-600 bg-green-50 dark:bg-green-950 mb-4">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertDescription className="text-green-800 dark:text-green-300">
                    Agora você pode fazer login com sua nova senha
                  </AlertDescription>
                </Alert>

                <Button asChild className="w-full bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white dark:bg-[#FF5C8A] dark:hover:bg-[#FF5C8A]/90">
                  <Link href="/auth/login">Fazer login</Link>
                </Button>
              </CardContent>
            </>
          )}

          {/* Error State */}
          {step === "error" && (
            <>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <CardTitle className="text-2xl text-[#313131] dark:text-white">Link inválido</CardTitle>
                <CardDescription className="dark:text-zinc-300">Este link de recuperação não é válido ou expirou</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-red-200 dark:border-red-600 bg-red-50 dark:bg-red-950">
                  <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <AlertDescription className="text-red-800 dark:text-red-300">{error}</AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Button asChild className="w-full bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white dark:bg-[#FF5C8A] dark:hover:bg-[#FF5C8A]/90">
                    <Link href="/auth/forgot-password">Solicitar novo link</Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-[#FF96B2] dark:border-[#FF5C8A] text-[#FF96B2] dark:text-[#FF5C8A] hover:bg-[#FF96B2] hover:text-white dark:hover:bg-[#FF5C8A] dark:hover:text-white"
                  >
                    <Link href="/auth/login">Voltar para o login</Link>
                  </Button>
                </div>
              </CardContent>
            </>
          )}
        </Card>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#313131]/70 dark:text-zinc-400 mb-2">Precisa de ajuda?</p>
          <div className="flex justify-center space-x-4 text-sm">
            <Link href="/help" className="text-[#FF96B2] dark:text-[#FF5C8A] hover:underline">
              Central de Ajuda
            </Link>
            <Link href="/contact" className="text-[#FF96B2] dark:text-[#FF5C8A] hover:underline">
              Contato
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
