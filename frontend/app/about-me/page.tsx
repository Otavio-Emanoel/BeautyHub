"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Camera, MapPin, Phone, Mail, Instagram, LogOut, Plus, Badge, Edit, Trash2, Clock, DollarSign, Award, FileText, Scissors, Star } from "lucide-react"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"

// Perfil do profissional
function ProfileSection() {

  const [profileData, setProfileData] = useState<any>({
    name: "",
    email: "",
    phone: "",
    experience: "",
    location: "",
    instagram: "",
    bio: "",
    avatar: "",
  })
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {

    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/auth/login")
      return
    }
    const fetchProfileData = async () => {
      setLoading(true)
      setError("")
      const localUser = JSON.parse(localStorage.getItem("user") || "{}")
      if (!localUser || localUser.role !== "professional") {
        router.push("/auth/login")
        return
      }
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/professional/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        if (!res.ok) throw new Error("Erro ao buscar perfil")
        const data = await res.json()
        setProfileData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          experience: data.experience || "",
          location: data.location || "",
          instagram: data.instagram || "",
          bio: data.bio || data.about || "",
          avatar: data.avatar || "",
        })
      } catch (e: any) {
        setError("Erro ao buscar perfil")
        router.push("/auth/login")
      } finally {
        setLoading(false)
      }
    }


    fetchProfileData()
  }, [router])

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError("")
    const formData = new FormData()
    formData.append("photo", file)
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/professional/profile/photo", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      })
      if (!res.ok) throw new Error("Erro ao enviar foto")
      const data = await res.json()
      setProfileData((prev: any) => ({ ...prev, avatar: data.avatar }))
      alert("Foto atualizada com sucesso!")
    } catch (e) {
      setError("Erro ao enviar foto")
    } finally {
      setUploading(false)
    }
  }

  const handleSaveProfile = async () => {
    setError("")
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/professional/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(profileData),
      })
      if (!res.ok) throw new Error("Erro ao atualizar perfil")
      alert("Perfil atualizado com sucesso!")
    } catch (e) {
      setError("Erro ao atualizar perfil")
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    window.dispatchEvent(new Event("userChanged"))
    router.push("/auth/login")
  }




  if (loading) return <div>Carregando...</div>
  if (error) return <div className="text-red-500">{error}</div>
  if (!profileData) return <div>Usuário não encontrado</div>

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Foto do perfil */}
      <Card className="border-0 shadow-lg bg-white dark:bg-[#232326]">
        <CardHeader className="text-center">
          <CardTitle className="text-[#313131] dark:text-white">Foto Profissional</CardTitle>
          <CardDescription className="dark:text-white/70">Sua foto será exibida no seu perfil público</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="relative inline-block">
            <Avatar className="w-32 h-32 mx-auto">
              <AvatarImage src={profileData.avatar || "/placeholder.svg?height=128&width=128"} />
              <AvatarFallback className="text-2xl bg-[#FF96B2] dark:bg-[#FF5C8A] text-white">
                {profileData.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <label>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
                disabled={uploading}
              />
              <Button
                size="sm"
                className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0 bg-[#FF96B2] dark:bg-[#FF5C8A] hover:bg-[#FF96B2]/90 dark:hover:bg-[#FF5C8A]/90"
                asChild
                disabled={uploading}
              >
                <span>
                  <Camera className="w-4 h-4" />
                </span>
              </Button>
            </label>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-[#313131]/50 dark:text-white/50">Recomendado: 400x400px, máximo 2MB</p>
          </div>
        </CardContent>
      </Card>
      {/* Formulário de perfil */}
      <Card className="lg:col-span-2 border-0 shadow-lg bg-white dark:bg-[#232326]">
        <CardHeader>
          <CardTitle className="text-[#313131] dark:text-white">Informações Pessoais</CardTitle>
          <CardDescription className="dark:text-white/70">Mantenha suas informações sempre atualizadas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="dark:text-white">Nome profissional</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50 dark:text-white/50" />
                <Input
                  id="name"
                  className="pl-10 border-[#EFEFEF] dark:border-[#232326] focus:border-[#FF96B2] dark:focus:border-[#FF5C8A] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience" className="dark:text-white">Experiência</Label>
              <Select
                value={profileData.experience}
                onValueChange={(value) => setProfileData({ ...profileData, experience: value })}
              >
                <SelectTrigger className="border-[#EFEFEF] dark:border-[#232326] focus:border-[#FF96B2] dark:focus:border-[#FF5C8A] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#232326] text-[#313131] dark:text-white">
                  <SelectItem value="1 ano">1 ano</SelectItem>
                  <SelectItem value="2 anos">2 anos</SelectItem>
                  <SelectItem value="3 anos">3 anos</SelectItem>
                  <SelectItem value="5 anos">5 anos</SelectItem>
                  <SelectItem value="8 anos">8 anos</SelectItem>
                  <SelectItem value="10+ anos">10+ anos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="dark:text-white">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50 dark:text-white/50" />
                <Input
                  id="email"
                  type="email"
                  className="pl-10 border-[#EFEFEF] dark:border-[#232326] focus:border-[#FF96B2] dark:focus:border-[#FF5C8A] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white"
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
                  className="pl-10 border-[#EFEFEF] dark:border-[#232326] focus:border-[#FF96B2] dark:focus:border-[#FF5C8A] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="dark:text-white">Localização</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50 dark:text-white/50" />
                <Input
                  id="location"
                  className="pl-10 border-[#EFEFEF] dark:border-[#232326] focus:border-[#FF96B2] dark:focus:border-[#FF5C8A] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white"
                  value={profileData.location}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram" className="dark:text-white">Instagram</Label>
              <div className="relative">
                <Instagram className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50 dark:text-white/50" />
                <Input
                  id="instagram"
                  className="pl-10 border-[#EFEFEF] dark:border-[#232326] focus:border-[#FF96B2] dark:focus:border-[#FF5C8A] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white"
                  value={profileData.instagram}
                  onChange={(e) => setProfileData({ ...profileData, instagram: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio" className="dark:text-white">Sobre você</Label>
            <Textarea
              id="bio"
              placeholder="Conte sobre sua experiência, especialidades e o que te motiva..."
              className="border-[#EFEFEF] dark:border-[#232326] focus:border-[#FF96B2] dark:focus:border-[#FF5C8A] min-h-[100px] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white"
              value={profileData.bio}
              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
            />
          </div>
          <div className="flex space-x-4 mt-4">
            <Button
              className="flex-1 bg-[#FF96B2] dark:bg-[#FF5C8A] hover:bg-[#FF96B2]/90 dark:hover:bg-[#FF5C8A]/90 text-white"
              onClick={handleSaveProfile}
            >
              Salvar Perfil
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-[#FF96B2] dark:border-[#FF5C8A] text-[#FF96B2] dark:text-[#FF5C8A] hover:bg-[#FF96B2] hover:text-white dark:hover:bg-[#FF5C8A] dark:hover:text-white"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair da Conta
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Gerenciamento de Serviços
function ServicesSection() {

  const [services, setServices] = useState<any[]>([])
  const [loadingServices, setLoadingServices] = useState(true)

  const [newService, setNewService] = useState({
    name: "",
    category: "",
    duration: 60,
    price: 0,
    description: "",
  })

  // Buscar serviços do profissional
  useEffect(() => {
    const fetchServices = async () => {
      setLoadingServices(true)
      try {
        const token = localStorage.getItem("token")
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professional/services`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        setServices(data.services || [])
      } catch (e) {
        setServices([])
      } finally {
        setLoadingServices(false)
      }
    }
    fetchServices()
  }, [])

  // Adicionar serviço
  const handleAddService = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professional/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newService),
      })
      if (!res.ok) throw new Error("Erro ao adicionar serviço")
      setNewService({ name: "", category: "", duration: 60, price: 0, description: "" })
      // Atualiza lista
      const data = await res.json()
      setServices((prev) => [...prev, { ...newService, id: data.serviceId }])
    } catch (e) {
      alert("Erro ao adicionar serviço")
    }
  }

  // Excluir serviço
  const handleDeleteService = async (id: string) => {
    const token = localStorage.getItem("token")
    if (!window.confirm("Deseja excluir este serviço?")) return
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professional/services/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) throw new Error("Erro ao excluir serviço")
      setServices((prev) => prev.filter((s) => s.id !== id))
    } catch (e) {
      alert("Erro ao excluir serviço")
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-white dark:bg-[#232326]">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-[#313131] dark:text-white">Meus Serviços</CardTitle>
              <CardDescription className="dark:text-white/70">Gerencie os serviços que você oferece</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#FF96B2] dark:bg-[#FF5C8A] hover:bg-[#FF96B2]/90 dark:hover:bg-[#FF5C8A]/90 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Serviço
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-white dark:bg-[#232326]">
                <DialogHeader>
                  <DialogTitle className="text-[#313131] dark:text-white">Adicionar Serviço</DialogTitle>
                  <DialogDescription className="dark:text-white/70">Preencha as informações do novo serviço</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="serviceName" className="dark:text-white">Nome do serviço</Label>
                    <Input
                      id="serviceName"
                      className="border-[#EFEFEF] dark:border-[#232326] focus:border-[#FF96B2] dark:focus:border-[#FF5C8A] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white"
                      value={newService.name}
                      onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceCategory" className="dark:text-white">Categoria</Label>
                    <Select
                      value={newService.category}
                      onValueChange={(value) => setNewService({ ...newService, category: value })}
                    >
                      <SelectTrigger className="border-[#EFEFEF] dark:border-[#232326] focus:border-[#FF96B2] dark:focus:border-[#FF5C8A] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white">
                        <SelectValue placeholder="Selecione a categoria">
                          {newService.category}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-[#232326] text-[#313131] dark:text-white">
                        <SelectItem value="Cabelo">Cabelo</SelectItem>
                        <SelectItem value="Unhas">Unhas</SelectItem>
                        <SelectItem value="Estética">Estética</SelectItem>
                        <SelectItem value="Maquiagem">Maquiagem</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="serviceDuration" className="dark:text-white">Duração (min)</Label>
                      <Input
                        id="serviceDuration"
                        type="number"
                        className="border-[#EFEFEF] dark:border-[#232326] focus:border-[#FF96B2] dark:focus:border-[#FF5C8A] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white"
                        value={newService.duration}
                        onChange={(e) =>
                          setNewService({ ...newService, duration: Number.parseInt(e.target.value) })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="servicePrice" className="dark:text-white">Preço (R$)</Label>
                      <Input
                        id="servicePrice"
                        type="number"
                        className="border-[#EFEFEF] dark:border-[#232326] focus:border-[#FF96B2] dark:focus:border-[#FF5C8A] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white"
                        value={newService.price}
                        onChange={(e) =>
                          setNewService({ ...newService, price: Number.parseFloat(e.target.value) })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceDescription" className="dark:text-white">Descrição</Label>
                    <Textarea
                      id="serviceDescription"
                      className="border-[#EFEFEF] dark:border-[#232326] focus:border-[#FF96B2] dark:focus:border-[#FF5C8A] bg-white dark:bg-[#18181b] text-[#313131] dark:text-white"
                      value={newService.description}
                      onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    />
                  </div>
                  <Button
                    className="w-full bg-[#FF96B2] dark:bg-[#FF5C8A] hover:bg-[#FF96B2]/90 dark:hover:bg-[#FF5C8A]/90 text-white"
                    onClick={handleAddService}
                  >
                    Adicionar Serviço
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {services.map((service) => (
              <Card key={service.id} className="border border-[#EFEFEF] dark:border-[#232326] bg-white dark:bg-[#18181b]">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-[#313131] dark:text-white">{service.name}</CardTitle>
                      <Badge className="bg-[#FF96B2]/10 dark:bg-[#FF5C8A]/10 text-[#FF96B2] dark:text-[#FF5C8A]">{service.category}</Badge>
                    </div>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="ghost" className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white dark:bg-[#232326] max-w-md rounded-xl shadow-xl">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="dark:text-white text-lg">Excluir serviço</AlertDialogTitle>
                            <AlertDialogDescription className="dark:text-white/70">
                              Tem certeza que deseja excluir este serviço? Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600 hover:bg-red-700 text-white"
                              onClick={() => handleDeleteService(service.id)}
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#313131]/70 dark:text-white/70 mb-3">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4 text-sm text-[#313131]/70 dark:text-white/70">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {service.duration} min
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        R$ {service.price}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Gerenciamento de Certificações
function CertificationSection() {

  const [certifications, setCertifications] = useState<any[]>([])
  const [loadingCerts, setLoadingCerts] = useState(true)
  const [newCertification, setNewCertification] = useState({
    name: "",
    institution: "",
    year: "",
    document: "",
  })
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    const fetchCertifications = async () => {
      setLoadingCerts(true)
      try {
        const token = localStorage.getItem("token")
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professional/certifications`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        setCertifications(data.certifications || [])
      } catch (e) {
        setCertifications([])
      } finally {
        setLoadingCerts(false)
      }
    }
    fetchCertifications()
  }, [])

  const handleAddCertification = async () => {
    setAdding(true)
    const token = localStorage.getItem("token")
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professional/certifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCertification),
      })
      if (!res.ok) throw new Error("Erro ao adicionar certificação")
      const data = await res.json()
      setCertifications((prev) => [...prev, { ...newCertification, id: data.id }])
      setNewCertification({ name: "", institution: "", year: "", document: "" })
    } catch (e) {
      alert("Erro ao adicionar certificação")
    } finally {
      setAdding(false)
    }
  }

  const handleDeleteCertification = async (id: string) => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professional/certifications/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) throw new Error("Erro ao excluir certificação")
      setCertifications((prev) => prev.filter((c) => c.id !== id))
    } catch (e) {
      alert("Erro ao excluir certificação")
    }
  }

  return (
    <Card className="border-0 shadow-lg bg-white dark:bg-[#232326]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-[#313131] dark:text-white">Formações & Certificações</CardTitle>
            <CardDescription className="dark:text-white/70">Adicione suas certificações e cursos</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#FF96B2] dark:bg-[#FF5C8A] hover:bg-[#FF96B2]/90 dark:hover:bg-[#FF5C8A]/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Nova Certificação
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white dark:bg-[#232326]">
              <DialogHeader>
                <DialogTitle className="text-[#313131] dark:text-white">Adicionar Certificação</DialogTitle>
                <DialogDescription className="dark:text-white/70">Preencha os dados da certificação</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="certName" className="dark:text-white">Nome</Label>
                  <Input
                    id="certName"
                    value={newCertification.name}
                    onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certInstitution" className="dark:text-white">Instituição</Label>
                  <Input
                    id="certInstitution"
                    value={newCertification.institution}
                    onChange={(e) => setNewCertification({ ...newCertification, institution: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certYear" className="dark:text-white">Ano</Label>
                  <Input
                    id="certYear"
                    type="number"
                    value={newCertification.year}
                    onChange={(e) => setNewCertification({ ...newCertification, year: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certDoc" className="dark:text-white">Documento (link ou nome do arquivo)</Label>
                  <Input
                    id="certDoc"
                    value={newCertification.document}
                    onChange={(e) => setNewCertification({ ...newCertification, document: e.target.value })}
                  />
                </div>
                <Button
                  className="w-full bg-[#FF96B2] dark:bg-[#FF5C8A] hover:bg-[#FF96B2]/90 dark:hover:bg-[#FF5C8A]/90 text-white"
                  onClick={handleAddCertification}
                  disabled={adding}
                >
                  Adicionar Certificação
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {loadingCerts ? (
          <div className="text-center py-8">Carregando...</div>
        ) : certifications.length === 0 ? (
          <div className="text-center py-8 text-[#313131]/70 dark:text-white/70">Nenhuma certificação cadastrada.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <Card key={cert.id} className="border border-[#EFEFEF] dark:border-[#232326] bg-white dark:bg-[#18181b]">
                <CardHeader className="pb-3 flex flex-row justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-[#313131] dark:text-white">{cert.name}</CardTitle>
                    <div className="text-sm text-[#313131]/70 dark:text-white/70">{cert.institution} • {cert.year}</div>
                    {cert.document && (
                      <div className="mt-1">
                        <a href={cert.document} target="_blank" rel="noopener noreferrer" className="text-xs text-[#FF96B2] underline break-all">
                          {cert.document}
                        </a>
                      </div>
                    )}
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="ghost" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white dark:bg-[#232326] max-w-md rounded-xl shadow-xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="dark:text-white text-lg">Excluir certificação</AlertDialogTitle>
                        <AlertDialogDescription className="dark:text-white/70">
                          Tem certeza que deseja excluir esta certificação? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => handleDeleteCertification(cert.id)}
                        >
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Portfólio
function PortfolioSection() {
  const [portfolio, setPortfolio] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [newItem, setNewItem] = useState({ title: "", description: "", image: "" })
  const [editingItem, setEditingItem] = useState<any | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchPortfolio = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem("token")
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professional/portfolio`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        setPortfolio(data.portfolio || [])
      } catch (e) {
        setPortfolio([])
      } finally {
        setLoading(false)
      }
    }
    fetchPortfolio()
  }, [])

  const handleAdd = async () => {
    setSaving(true)
    const token = localStorage.getItem("token")
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professional/portfolio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newItem),
      })
      if (!res.ok) throw new Error("Erro ao adicionar item")
      const data = await res.json()
      setPortfolio((prev) => [...prev, { ...newItem, id: data.id }])
      setNewItem({ title: "", description: "", image: "" })
    } catch (e) {
      alert("Erro ao adicionar item")
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = async () => {
    if (!editingItem) return
    setSaving(true)
    const token = localStorage.getItem("token")
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professional/portfolio/${editingItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingItem),
      })
      if (!res.ok) throw new Error("Erro ao editar item")
      setPortfolio((prev) =>
        prev.map((item) => (item.id === editingItem.id ? editingItem : item))
      )
      setEditingItem(null)
    } catch (e) {
      alert("Erro ao editar item")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professional/portfolio/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) throw new Error("Erro ao excluir item")
      setPortfolio((prev) => prev.filter((item) => item.id !== id))
    } catch (e) {
      alert("Erro ao excluir item")
    }
  }

  return (
    <Card className="border-0 shadow-lg bg-white dark:bg-[#232326]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-[#313131] dark:text-white">Portfólio</CardTitle>
            <CardDescription className="dark:text-white/70">Adicione fotos dos seus melhores trabalhos</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#FF96B2] dark:bg-[#FF5C8A] hover:bg-[#FF96B2]/90 dark:hover:bg-[#FF5C8A]/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Nova Foto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white dark:bg-[#232326]">
              <DialogHeader>
                <DialogTitle className="text-[#313131] dark:text-white">Adicionar ao Portfólio</DialogTitle>
                <DialogDescription className="dark:text-white/70">Insira o link da imagem, título e descrição</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-white">Título</label>
                  <Input
                    placeholder="Ex: Corte feminino moderno"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-white">Descrição</label>
                  <Textarea
                    placeholder="Descreva o serviço ou resultado da foto"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-white">Link da imagem</label>
                  <Input
                    placeholder="https://exemplo.com/sua-imagem.jpg"
                    value={newItem.image}
                    onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                  />
                </div>
                <Button
                  className="w-full bg-[#FF96B2] dark:bg-[#FF5C8A] hover:bg-[#FF96B2]/90 dark:hover:bg-[#FF5C8A]/90 text-white"
                  onClick={handleAdd}
                  disabled={saving}
                >
                  Adicionar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">Carregando...</div>
        ) : portfolio.length === 0 ? (
          <div className="text-center py-8 text-[#313131]/70 dark:text-white/70">Nenhuma foto cadastrada.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((item) => (
              <Card key={item.id} className="border border-[#EFEFEF] dark:border-[#232326] overflow-hidden bg-white dark:bg-[#18181b]">
                <div className="relative">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex space-x-1">
                    {/* Editar */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="ghost" className="bg-white/80 dark:bg-[#232326]/80 hover:bg-white dark:hover:bg-[#232326]">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md bg-white dark:bg-[#232326]">
                        <DialogHeader>
                          <DialogTitle className="text-[#313131] dark:text-white">Editar Foto</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-1 dark:text-white">Título</label>
                            <Input
                              placeholder="Ex: Corte feminino moderno"
                              value={editingItem?.id === item.id ? editingItem.title : item.title}
                              onChange={(e) =>
                                setEditingItem({ ...item, title: e.target.value, description: editingItem?.description ?? item.description, image: editingItem?.image ?? item.image, id: item.id })
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1 dark:text-white">Descrição</label>
                            <Textarea
                              placeholder="Descreva o serviço ou resultado da foto"
                              value={editingItem?.id === item.id ? editingItem.description : item.description}
                              onChange={(e) =>
                                setEditingItem({ ...item, title: editingItem?.title ?? item.title, description: e.target.value, image: editingItem?.image ?? item.image, id: item.id })
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1 dark:text-white">Link da imagem</label>
                            <Input
                              placeholder="https://exemplo.com/sua-imagem.jpg"
                              value={editingItem?.id === item.id ? editingItem.image : item.image}
                              onChange={(e) =>
                                setEditingItem({ ...item, title: editingItem?.title ?? item.title, description: editingItem?.description ?? item.description, image: e.target.value, id: item.id })
                              }
                            />
                          </div>
                          <Button
                            className="w-full bg-[#FF96B2] dark:bg-[#FF5C8A] hover:bg-[#FF96B2]/90 dark:hover:bg-[#FF5C8A]/90 text-white"
                            onClick={handleEdit}
                            disabled={saving}
                          >
                            Salvar Alterações
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    {/* Excluir */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="ghost" className="bg-white/80 dark:bg-[#232326]/80 hover:bg-white dark:hover:bg-[#232326] text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-white dark:bg-[#232326] max-w-md rounded-xl shadow-xl">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="dark:text-white text-lg">Excluir foto</AlertDialogTitle>
                          <AlertDialogDescription className="dark:text-white/70">
                            Tem certeza que deseja excluir esta foto? Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => handleDelete(item.id)}
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-[#313131] dark:text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-[#313131]/70 dark:text-white/70 mb-2">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Preview do Perfil
function ProfilePreview({ profileData, services, portfolio }: any) {
  return (
    <Card className="border-0 shadow-lg bg-white dark:bg-[#232326]">
      <CardHeader>
        <CardTitle className="text-[#313131] dark:text-white">Visualização do Perfil</CardTitle>
        <CardDescription className="dark:text-white/70">Como seu perfil aparece para os clientes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-w-2xl mx-auto">
          {/* Profile Preview */}
          <div className="text-center mb-8">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src={profileData.avatar || "/placeholder.svg?height=96&width=96"} />
              <AvatarFallback className="text-xl bg-[#FF96B2] dark:bg-[#FF5C8A] text-white">
                {profileData.name?.split(" ").map((n: string) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold text-[#313131] dark:text-white mb-2">{profileData.name}</h2>
            <div className="flex items-center justify-center space-x-4 text-[#313131]/70 dark:text-white/70 mb-4">
              {profileData.location && (
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {profileData.location}
                </div>
              )}
              {profileData.experience && (
                <div className="flex items-center">
                  <Scissors className="w-4 h-4 mr-1" />
                  {profileData.experience}
                </div>
              )}
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                4.9 (127 avaliações)
              </div>
            </div>
            <p className="text-[#313131]/70 dark:text-white/70 max-w-lg mx-auto">{profileData.bio}</p>
            {profileData.instagram && (
              <div className="flex justify-center mt-2">
                <a
                  href={`https://instagram.com/${profileData.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-[#FF96B2] hover:underline"
                >
                  <Instagram className="w-4 h-4 mr-1" />
                  @{profileData.instagram.replace("@", "")}
                </a>
              </div>
            )}
          </div>

          {/* Services Preview */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[#313131] dark:text-white mb-4">Serviços</h3>
            <div className="grid gap-4">
              {services.slice(0, 3).map((service: any) => (
                <div key={service.id} className="flex justify-between items-center p-4 bg-[#EFEFEF] dark:bg-[#18181b] rounded-lg">
                  <div>
                    <h4 className="font-medium text-[#313131] dark:text-white">{service.name}</h4>
                    <p className="text-sm text-[#313131]/70 dark:text-white/70">{service.description}</p>
                    <div className="flex items-center space-x-2 mt-1 text-sm text-[#313131]/50 dark:text-white/50">
                      <Clock className="w-3 h-3" />
                      <span>{service.duration} min</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-[#FF96B2] dark:text-[#FF5C8A]">R$ {service.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio Preview */}
          <div>
            <h3 className="text-xl font-semibold text-[#313131] dark:text-white mb-4">Portfólio</h3>
            <div className="grid grid-cols-3 gap-4">
              {portfolio.slice(0, 6).map((item: any) => (
                <div key={item.id} className="aspect-square">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ProfessionalProfilePage() {

  const [profileData, setProfileData] = useState<any>({
    name: "",
    email: "",
    phone: "",
    experience: "",
    location: "",
    instagram: "",
    bio: "",
    avatar: "",
  })
  const [services, setServices] = useState<any[]>([])
  const [portfolio, setPortfolio] = useState<any[]>([])

  // Carregar perfil
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professional/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setProfileData(data))
      .catch(() => setProfileData({}))
  }, [])

  // Carregar serviços
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professional/services`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setServices(data.services || []))
      .catch(() => setServices([]))
  }, [])

  // Carregar portfólio
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professional/portfolio`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setPortfolio(data.portfolio || []))
      .catch(() => setPortfolio([]))
  }, [])


  return (
    <div className="min-h-screen bg-[#EFEFEF] dark:bg-[#18181b] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#313131] dark:text-white mb-2">Meu Perfil Profissional</h1>
          <p className="text-[#313131]/70 dark:text-white/70">Gerencie suas informações, serviços e qualificações</p>
        </div>
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="services">Serviços</TabsTrigger>
            <TabsTrigger value="certifications">Formações</TabsTrigger>
            <TabsTrigger value="portfolio">Portfólio</TabsTrigger>
            <TabsTrigger value="preview">Visualizar</TabsTrigger>
          </TabsList>
          {/* Profile Tab */}
          <TabsContent value="profile">
            <ProfileSection />
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
            <ServicesSection />
          </TabsContent>

          {/* Certifications Tab */}
          <TabsContent value="certifications">
            <CertificationSection />
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio">
            <PortfolioSection />
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview">
            <ProfilePreview
              profileData={profileData}
              services={services}
              portfolio={portfolio}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
