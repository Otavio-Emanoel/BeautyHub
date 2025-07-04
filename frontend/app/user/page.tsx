"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Phone, MapPin, LogOut, Check, X, Star } from "lucide-react"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

function formatDate(dateStr: string) {
  if (!dateStr) return ""
  const [year, month, day] = dateStr.split("-")
  return `${day}/${month}/${year}`
}

function AtividadeTab() {
  const [completedAppointments, setCompletedAppointments] = useState<any[]>([])
  const [loadingCompleted, setLoadingCompleted] = useState(true)

  useEffect(() => {
    async function fetchCompletedAppointments() {
      setLoadingCompleted(true)
      try {
        const token = localStorage.getItem("token")
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedules/client`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        // Se vier como array direto:
        const appointments = Array.isArray(data) ? data : data.appointments || []
        setCompletedAppointments(appointments.filter((a: any) => a.status === "completed"))
      } catch {
        setCompletedAppointments([])
      } finally {
        setLoadingCompleted(false)
      }
    }
    fetchCompletedAppointments()
  }, [])

  const [rateModal, setRateModal] = useState<{ open: boolean, appointment: any | null }>({ open: false, appointment: null })
  const [rateValue, setRateValue] = useState(5)
  const [rateComment, setRateComment] = useState("")
  const [ratingLoading, setRatingLoading] = useState(false)

  function openRateModal(appointment: any) {
    setRateModal({ open: true, appointment })
    setRateValue(5)
    setRateComment("")
  }

  async function handleRate() {
    if (!rateValue) {
      alert("Escolha uma nota!")
      return
    }
    setRatingLoading(true)
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedules/appointment/${rateModal.appointment.id}/rate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating: rateValue, review: rateComment }),
      })
      if (!res.ok) throw new Error("Erro ao enviar avaliação")
      setCompletedAppointments((prev) =>
        prev.map((a) =>
          a.id === rateModal.appointment.id
            ? { ...a, rating: rateValue, review: rateComment }
            : a
        )
      )
      setRateModal({ open: false, appointment: null })
    } catch (e) {
      alert("Erro ao enviar avaliação")
    } finally {
      setRatingLoading(false)
    }
  }

  return (
    <>
      <Card className="border-0 shadow-lg bg-white dark:bg-[#232326]">
        <CardHeader>
          <CardTitle className="text-[#313131] dark:text-white">Meus Serviços Concluídos</CardTitle>
          <CardDescription className="dark:text-white/70">
            Veja seus serviços concluídos e avalie sua experiência.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loadingCompleted ? (
            <div className="py-8 text-center">Carregando...</div>
          ) : completedAppointments.length === 0 ? (
            <div className="py-8 text-center text-[#313131]/70 dark:text-white/70">
              Você ainda não concluiu nenhum serviço.
            </div>
          ) : (
            <div className="space-y-4">
              {completedAppointments.map((appointment) => (
                <div key={appointment.id} className="border-b border-[#EFEFEF] dark:border-[#232326] pb-4 mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{appointment.serviceName}</span>
                    {appointment.professionalName && (
                      <> com <span className="font-medium">{appointment.professionalName}</span></>
                    )}
                    <span className="text-xs text-[#313131]/60 dark:text-white/60 ml-2">
                      {appointment.date ? formatDate(appointment.date) : ""}
                    </span>
                  </div>
                  {appointment.rating ? (
                    <>
                      <div className="flex items-center gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className={`w-4 h-4 ${appointment.rating >= star ? "text-yellow-400" : "text-gray-300"}`} fill={appointment.rating >= star ? "#facc15" : "none"} />
                        ))}
                        <span className="ml-2 text-sm text-[#313131]/80 dark:text-white/80">{appointment.rating} estrelas</span>
                      </div>
                      {appointment.review && (
                        <div className="text-[#313131]/70 dark:text-white/70 text-sm italic">"{appointment.review}"</div>
                      )}
                    </>
                  ) : (
                    <Button
                      size="sm"
                      className="bg-yellow-500 hover:bg-yellow-600 text-white mt-2"
                      onClick={() => openRateModal(appointment)}
                    >
                      Avaliar
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de avaliação */}
      <Dialog open={rateModal.open} onOpenChange={(open) => !open && setRateModal({ open: false, appointment: null })}>
        <DialogContent className="bg-white dark:bg-[#232326] text-[#313131] dark:text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#313131] dark:text-white">Avaliar Atendimento</DialogTitle>
            <DialogDescription className="dark:text-white/60">
              Dê uma nota e deixe um comentário sobre o serviço recebido.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm dark:text-white">Nota</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`p-1 ${rateValue >= star ? "text-yellow-400" : "text-gray-400"}`}
                    onClick={() => setRateValue(star)}
                  >
                    <Star className="w-6 h-6" fill={rateValue >= star ? "#facc15" : "none"} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm dark:text-white">Comentário</label>
              <Textarea
                value={rateComment}
                onChange={(e) => setRateComment(e.target.value)}
                placeholder="Deixe seu comentário (opcional)"
                className="border-[#FF96B2] dark:border-[#FF96B2] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white"
                rows={3}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                className="border-[#FF96B2] text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white"
                onClick={() => setRateModal({ open: false, appointment: null })}
                disabled={ratingLoading}
              >
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
              <Button
                className="bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white"
                onClick={handleRate}
                disabled={ratingLoading}
              >
                <Check className="w-4 h-4 mr-2" />
                Enviar Avaliação
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default function AccountPage() {
  const [profileData, setProfileData] = useState<any>({
    name: "",
    email: "",
    phone: "",
    address: "",
    birthdate: "",
    gender: "",
    about: "",
    avatar: "",
  })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchProfileData = async () => {
      const localUser = JSON.parse(localStorage.getItem("user") || "{ }")
      if (!localUser || !localUser.role) {
        router.push("/auth/login")
        return
      }
      let endpoint = ""
      if (localUser.role === "client") endpoint = "/api/client/profile"
      else if (localUser.role === "professional") endpoint = "/api/professional/profile"
      else if (localUser.role === "admin") endpoint = "/api/admin/profile"
      else return

      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        if (!res.ok) throw new Error("Erro ao buscar perfil")
        const data = await res.json()
        setProfileData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          birthdate: data.birthdate || "",
          gender: data.gender || "",
          about: data.about || "",
          avatar: data.avatar || data.photoURL || "", // Corrigido para garantir que a foto apareça ao relogar
        })
      } catch (e) {
        router.push("/auth/login")
      } finally {
        setLoading(false)
      }
    }
    fetchProfileData()
  }, [router])

  // Logout real
  const handleLogout = async () => {
    await signOut(auth)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    window.dispatchEvent(new Event("userChanged"))
    router.push("/auth/login")
  }

  // Atualizar perfil (exemplo para nome, email, telefone)
  const handleSaveProfile = async () => {
    const localUser = JSON.parse(localStorage.getItem("user") || "{ }")
    let endpoint = ""
    if (localUser.role === "client") endpoint = "/api/client/profile"
    else if (localUser.role === "professional") endpoint = "/api/professional/profile"
    else if (localUser.role === "admin") endpoint = "/api/admin/profile"
    else return

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(profileData)
      })
      if (!res.ok) throw new Error("Erro ao atualizar perfil")
      alert("Perfil atualizado com sucesso!")
    } catch (e) {
      alert("Erro ao atualizar perfil")
    }
  }

  if (loading) return <div>Carregando...</div>
  if (!profileData) return <div>Usuário não encontrado</div>

  return (
    <div className="min-h-screen bg-[#EFEFEF] dark:bg-[#18181b] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#313131] dark:text-white mb-2">Minha Conta</h1>
          <p className="text-[#313131]/70 dark:text-white/70">Gerencie suas informações pessoais e configurações</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="activity">Atividade</TabsTrigger>
            <TabsTrigger value="logout">Sair</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Profile Picture */}
              <Card className="border-0 shadow-lg bg-white dark:bg-[#232326]">
                <CardHeader className="text-center">
                  <CardTitle className="text-[#313131] dark:text-white">Foto do Perfil</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="w-32 h-32 mx-auto">
                      <AvatarImage src={profileData.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-2xl bg-[#FF96B2] dark:bg-[#FF96B2] text-white">
                        {profileData.name
                          ? profileData.name.split(" ").map((n: string) => n[0]).join("")
                          : ""}
                      </AvatarFallback>
                    </Avatar>
                    <Input
                      type="url"
                      placeholder="Cole o link da sua foto de perfil"
                      value={profileData.avatar || ""}
                      onChange={e => setProfileData((prev: any) => ({ ...prev, avatar: e.target.value }))}
                      className="w-full border-[#FF96B2] dark:border-[#FF96B2] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Profile Form */}
              <Card className="lg:col-span-2 border-0 shadow-lg bg-white dark:bg-[#232326]">
                <CardHeader>
                  <CardTitle className="text-[#313131] dark:text-white">Informações Pessoais</CardTitle>
                  <CardDescription className="dark:text-white/70">Atualize suas informações pessoais</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="dark:text-white">Nome completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50 dark:text-white/50" />
                        <Input
                          id="name"
                          className="pl-10 border-[#EFEFEF] dark:border-[#232326] focus:border-[#FF96B2] dark:focus:border-[#FF96B2] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="dark:text-white">E-mail</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50 dark:text-white/50" />
                        <Input
                          id="email"
                          type="email"
                          className="pl-10 border-[#EFEFEF] dark:border-[#232326] focus:border-[#FF96B2] dark:focus:border-[#FF96B2] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="dark:text-white">Telefone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50 dark:text-white/50" />
                        <Input
                          id="phone"
                          className="pl-10 border-[#EFEFEF] dark:border-[#232326] focus:border-[#FF96B2] dark:focus:border-[#FF96B2] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address" className="dark:text-white">Endereço</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50 dark:text-white/50" />
                        <Input
                          id="address"
                          className="pl-10 border-[#EFEFEF] dark:border-[#232326] focus:border-[#FF96B2] dark:focus:border-[#FF96B2] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white"
                          value={profileData.address}
                          onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthdate" className="dark:text-white">Data de Nascimento</Label>
                      <Input
                        id="birthdate"
                        type="date"
                        className="border-[#EFEFEF] dark:border-[#232326] focus:border-[#FF96B2] dark:focus:border-[#FF96B2] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white"
                        value={profileData.birthdate}
                        onChange={(e) => setProfileData({ ...profileData, birthdate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender" className="dark:text-white">Gênero</Label>
                      <select
                        id="gender"
                        className="w-full border-[#EFEFEF] dark:border-[#232326] focus:border-[#FF96B2] dark:focus:border-[#FF96B2] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white rounded-md py-2 px-3"
                        value={profileData.gender}
                        onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                      >
                        <option value="">Selecione</option>
                        <option value="feminino">Feminino</option>
                        <option value="masculino">Masculino</option>
                        <option value="outro">Outro</option>
                        <option value="prefiro_nao_dizer">Prefiro não dizer</option>
                      </select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="about" className="dark:text-white">Sobre você</Label>
                      <Textarea
                        id="about"
                        className="border-[#EFEFEF] dark:border-[#232326] focus:border-[#FF96B2] dark:focus:border-[#FF96B2] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white"
                        value={profileData.about}
                        onChange={(e) => setProfileData({ ...profileData, about: e.target.value })}
                        rows={3}
                        placeholder="Conte um pouco sobre você..."
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <Button
                      className="flex-1 bg-[#FF96B2] dark:bg-[#FF96B2] hover:bg-[#FF96B2]/90 dark:hover:bg-[#be185d] text-white"
                      onClick={handleSaveProfile}
                    >
                      Salvar Alterações
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-[#FF96B2] dark:border-[#FF96B2] text-[#FF96B2] dark:text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white dark:hover:bg-[#FF96B2] dark:hover:text-white"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair da Conta
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notificações Tab */}
          <TabsContent value="notifications">
            <Card className="border-0 shadow-lg bg-white dark:bg-[#232326]">
              <CardHeader>
                <CardTitle className="text-[#313131] dark:text-white">Notificações</CardTitle>
                <CardDescription className="dark:text-white/70">
                  Aqui você poderá configurar e visualizar suas notificações futuramente.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-[#313131]/70 dark:text-white/70">Funcionalidade em breve.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Atividade Tab */}
          <TabsContent value="activity">
            <AtividadeTab />
          </TabsContent>

          {/* Logout Tab */}
          <TabsContent value="logout">
            <div className="flex flex-col items-center justify-center h-40">
              <Button
                className="bg-[#FF96B2] dark:bg-[#FF96B2] hover:bg-[#FF96B2]/90 dark:hover:bg-[#be185d] text-white"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair da Conta
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}