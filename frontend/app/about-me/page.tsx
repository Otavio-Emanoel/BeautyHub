"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  User,
  Camera,
  Plus,
  Edit,
  Trash2,
  Upload,
  FileText,
  Award,
  Scissors,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Star,
  Clock,
  DollarSign,
} from "lucide-react"

export default function ProfessionalProfilePage() {
  const [profileData, setProfileData] = useState({
    name: "Ana Costa",
    email: "ana.costa@email.com",
    phone: "(11) 99999-9999",
    bio: "Profissional especializada em cortes modernos e coloração. Mais de 8 anos de experiência transformando looks e autoestima.",
    experience: "8 anos",
    location: "São Paulo, SP",
    instagram: "@anacosta_hair",
    facebook: "Ana Costa Hair",
  })

  const [services, setServices] = useState([
    {
      id: 1,
      name: "Corte Feminino",
      description: "Corte personalizado de acordo com o formato do rosto e estilo pessoal",
      duration: 60,
      price: 80,
      category: "Cabelo",
    },
    {
      id: 2,
      name: "Coloração Completa",
      description: "Coloração profissional com produtos de alta qualidade",
      duration: 180,
      price: 200,
      category: "Cabelo",
    },
    {
      id: 3,
      name: "Luzes e Mechas",
      description: "Técnicas modernas de iluminação capilar",
      duration: 240,
      price: 300,
      category: "Cabelo",
    },
  ])

  const [certifications, setCertifications] = useState([
    {
      id: 1,
      name: "Curso de Colorimetria Avançada",
      institution: "Instituto de Beleza SP",
      year: "2023",
      document: "certificado_colorimetria.pdf",
      verified: true,
    },
    {
      id: 2,
      name: "Especialização em Cortes Modernos",
      institution: "Academia Hair Fashion",
      year: "2022",
      document: "diploma_cortes.pdf",
      verified: true,
    },
    {
      id: 3,
      name: "Curso de Química Capilar",
      institution: "Centro de Estudos Capilares",
      year: "2021",
      document: "certificado_quimica.pdf",
      verified: false,
    },
  ])

  const [portfolio, setPortfolio] = useState([
    {
      id: 1,
      image: "/placeholder.svg?height=300&width=300",
      title: "Transformação Loiro Platinado",
      description: "Processo de descoloração e tonalização",
      category: "Coloração",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=300&width=300",
      title: "Corte Bob Moderno",
      description: "Corte bob com camadas sutis",
      category: "Corte",
    },
    {
      id: 3,
      image: "/placeholder.svg?height=300&width=300",
      title: "Mechas Babylights",
      description: "Técnica de mechas naturais",
      category: "Coloração",
    },
  ])

  const [newService, setNewService] = useState({
    name: "",
    description: "",
    duration: 60,
    price: 0,
    category: "",
  })

  const [newCertification, setNewCertification] = useState({
    name: "",
    institution: "",
    year: "",
    document: null as File | null,
  })

  const handleSaveProfile = () => {
    console.log("Profile saved:", profileData)
  }

  const handleAddService = () => {
    if (newService.name && newService.description && newService.category) {
      setServices([...services, { ...newService, id: Date.now() }])
      setNewService({ name: "", description: "", duration: 60, price: 0, category: "" })
    }
  }

  const handleDeleteService = (serviceId: number) => {
    setServices(services.filter((service) => service.id !== serviceId))
  }

  const handleAddCertification = () => {
    if (newCertification.name && newCertification.institution && newCertification.year) {
      setCertifications([
        ...certifications,
        {
          ...newCertification,
          id: Date.now(),
          document: newCertification.document?.name || "",
          verified: false,
        },
      ])
      setNewCertification({ name: "", institution: "", year: "", document: null })
    }
  }

  const handleDeleteCertification = (certId: number) => {
    setCertifications(certifications.filter((cert) => cert.id !== certId))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0]
    if (file) {
      if (type === "certification") {
        setNewCertification({ ...newCertification, document: file })
      }
      console.log(`${type} file uploaded:`, file.name)
    }
  }

  return (
    <div className="min-h-screen bg-[#EFEFEF] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#313131] mb-2">Meu Perfil Profissional</h1>
          <p className="text-[#313131]/70">Gerencie suas informações, serviços e qualificações</p>
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
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Profile Picture */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-[#313131]">Foto Profissional</CardTitle>
                  <CardDescription>Sua foto será exibida no seu perfil público</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="relative inline-block">
                    <Avatar className="w-32 h-32 mx-auto">
                      <AvatarImage src="/placeholder.svg?height=128&width=128" />
                      <AvatarFallback className="text-2xl bg-[#FF96B2] text-white">
                        {profileData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0 bg-[#FF96B2] hover:bg-[#FF96B2]/90"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full border-[#FF96B2] text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Alterar Foto
                    </Button>
                    <p className="text-xs text-[#313131]/50">Recomendado: 400x400px, máximo 2MB</p>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Form */}
              <Card className="lg:col-span-2 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#313131]">Informações Pessoais</CardTitle>
                  <CardDescription>Mantenha suas informações sempre atualizadas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome profissional</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50" />
                        <Input
                          id="name"
                          className="pl-10 border-[#EFEFEF] focus:border-[#FF96B2]"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Experiência</Label>
                      <Select
                        value={profileData.experience}
                        onValueChange={(value) => setProfileData({ ...profileData, experience: value })}
                      >
                        <SelectTrigger className="border-[#EFEFEF] focus:border-[#FF96B2]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
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
                      <Label htmlFor="email">E-mail</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50" />
                        <Input
                          id="email"
                          type="email"
                          className="pl-10 border-[#EFEFEF] focus:border-[#FF96B2]"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50" />
                        <Input
                          id="phone"
                          className="pl-10 border-[#EFEFEF] focus:border-[#FF96B2]"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Localização</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50" />
                        <Input
                          id="location"
                          className="pl-10 border-[#EFEFEF] focus:border-[#FF96B2]"
                          value={profileData.location}
                          onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <div className="relative">
                        <Instagram className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50" />
                        <Input
                          id="instagram"
                          className="pl-10 border-[#EFEFEF] focus:border-[#FF96B2]"
                          value={profileData.instagram}
                          onChange={(e) => setProfileData({ ...profileData, instagram: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Sobre você</Label>
                    <Textarea
                      id="bio"
                      placeholder="Conte sobre sua experiência, especialidades e o que te motiva..."
                      className="border-[#EFEFEF] focus:border-[#FF96B2] min-h-[100px]"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    />
                  </div>

                  <Button className="w-full bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white" onClick={handleSaveProfile}>
                    Salvar Perfil
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-[#313131]">Meus Serviços</CardTitle>
                      <CardDescription>Gerencie os serviços que você oferece</CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white">
                          <Plus className="w-4 h-4 mr-2" />
                          Novo Serviço
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-[#313131]">Adicionar Serviço</DialogTitle>
                          <DialogDescription>Preencha as informações do novo serviço</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="serviceName">Nome do serviço</Label>
                            <Input
                              id="serviceName"
                              className="border-[#EFEFEF] focus:border-[#FF96B2]"
                              value={newService.name}
                              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="serviceCategory">Categoria</Label>
                            <Select
                              value={newService.category}
                              onValueChange={(value) => setNewService({ ...newService, category: value })}
                            >
                              <SelectTrigger className="border-[#EFEFEF] focus:border-[#FF96B2]">
                                <SelectValue placeholder="Selecione a categoria" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Cabelo">Cabelo</SelectItem>
                                <SelectItem value="Unhas">Unhas</SelectItem>
                                <SelectItem value="Estética">Estética</SelectItem>
                                <SelectItem value="Maquiagem">Maquiagem</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="serviceDuration">Duração (min)</Label>
                              <Input
                                id="serviceDuration"
                                type="number"
                                className="border-[#EFEFEF] focus:border-[#FF96B2]"
                                value={newService.duration}
                                onChange={(e) =>
                                  setNewService({ ...newService, duration: Number.parseInt(e.target.value) })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="servicePrice">Preço (R$)</Label>
                              <Input
                                id="servicePrice"
                                type="number"
                                className="border-[#EFEFEF] focus:border-[#FF96B2]"
                                value={newService.price}
                                onChange={(e) =>
                                  setNewService({ ...newService, price: Number.parseFloat(e.target.value) })
                                }
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="serviceDescription">Descrição</Label>
                            <Textarea
                              id="serviceDescription"
                              className="border-[#EFEFEF] focus:border-[#FF96B2]"
                              value={newService.description}
                              onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                            />
                          </div>
                          <Button
                            className="w-full bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white"
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
                      <Card key={service.id} className="border border-[#EFEFEF]">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg text-[#313131]">{service.name}</CardTitle>
                              <Badge className="bg-[#FF96B2]/10 text-[#FF96B2]">{service.category}</Badge>
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
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Excluir serviço</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Tem certeza que deseja excluir este serviço? Esta ação não pode ser desfeita.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-red-600 hover:bg-red-700"
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
                          <p className="text-sm text-[#313131]/70 mb-3">{service.description}</p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4 text-sm text-[#313131]/70">
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
          </TabsContent>

          {/* Certifications Tab */}
          <TabsContent value="certifications">
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-[#313131]">Formações e Certificações</CardTitle>
                      <CardDescription>Adicione seus diplomas e certificados</CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white">
                          <Plus className="w-4 h-4 mr-2" />
                          Nova Certificação
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-[#313131]">Adicionar Certificação</DialogTitle>
                          <DialogDescription>Preencha as informações da certificação</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="certName">Nome do curso/certificação</Label>
                            <Input
                              id="certName"
                              className="border-[#EFEFEF] focus:border-[#FF96B2]"
                              value={newCertification.name}
                              onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="certInstitution">Instituição</Label>
                            <Input
                              id="certInstitution"
                              className="border-[#EFEFEF] focus:border-[#FF96B2]"
                              value={newCertification.institution}
                              onChange={(e) =>
                                setNewCertification({ ...newCertification, institution: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="certYear">Ano de conclusão</Label>
                            <Input
                              id="certYear"
                              className="border-[#EFEFEF] focus:border-[#FF96B2]"
                              value={newCertification.year}
                              onChange={(e) => setNewCertification({ ...newCertification, year: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="certDocument">Documento (PDF)</Label>
                            <Input
                              id="certDocument"
                              type="file"
                              accept=".pdf"
                              className="border-[#EFEFEF] focus:border-[#FF96B2]"
                              onChange={(e) => handleFileUpload(e, "certification")}
                            />
                          </div>
                          <Button
                            className="w-full bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white"
                            onClick={handleAddCertification}
                          >
                            Adicionar Certificação
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {certifications.map((cert) => (
                      <Card key={cert.id} className="border border-[#EFEFEF]">
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-semibold text-[#313131]">{cert.name}</h3>
                                {cert.verified ? (
                                  <Badge className="bg-green-100 text-green-800">
                                    <Award className="w-3 h-3 mr-1" />
                                    Verificado
                                  </Badge>
                                ) : (
                                  <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>
                                )}
                              </div>
                              <p className="text-[#313131]/70">{cert.institution}</p>
                              <p className="text-sm text-[#313131]/50">Ano: {cert.year}</p>
                              {cert.document && (
                                <div className="flex items-center mt-2 text-sm text-[#FF96B2]">
                                  <FileText className="w-4 h-4 mr-1" />
                                  {cert.document}
                                </div>
                              )}
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
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Excluir certificação</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Tem certeza que deseja excluir esta certificação?
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-red-600 hover:bg-red-700"
                                      onClick={() => handleDeleteCertification(cert.id)}
                                    >
                                      Excluir
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-[#313131]">Portfólio</CardTitle>
                    <CardDescription>Mostre seus melhores trabalhos</CardDescription>
                  </div>
                  <Button className="bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Foto
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolio.map((item) => (
                    <Card key={item.id} className="border border-[#EFEFEF] overflow-hidden">
                      <div className="relative">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="pt-4">
                        <h3 className="font-semibold text-[#313131] mb-1">{item.title}</h3>
                        <p className="text-sm text-[#313131]/70 mb-2">{item.description}</p>
                        <Badge className="bg-[#FF96B2]/10 text-[#FF96B2]">{item.category}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#313131]">Visualização do Perfil</CardTitle>
                <CardDescription>Como seu perfil aparece para os clientes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-w-2xl mx-auto">
                  {/* Profile Preview */}
                  <div className="text-center mb-8">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" />
                      <AvatarFallback className="text-xl bg-[#FF96B2] text-white">
                        {profileData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-2xl font-bold text-[#313131] mb-2">{profileData.name}</h2>
                    <div className="flex items-center justify-center space-x-4 text-[#313131]/70 mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {profileData.location}
                      </div>
                      <div className="flex items-center">
                        <Scissors className="w-4 h-4 mr-1" />
                        {profileData.experience}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                        4.9 (127 avaliações)
                      </div>
                    </div>
                    <p className="text-[#313131]/70 max-w-lg mx-auto">{profileData.bio}</p>
                  </div>

                  {/* Services Preview */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-[#313131] mb-4">Serviços</h3>
                    <div className="grid gap-4">
                      {services.slice(0, 3).map((service) => (
                        <div key={service.id} className="flex justify-between items-center p-4 bg-[#EFEFEF] rounded-lg">
                          <div>
                            <h4 className="font-medium text-[#313131]">{service.name}</h4>
                            <p className="text-sm text-[#313131]/70">{service.description}</p>
                            <div className="flex items-center space-x-2 mt-1 text-sm text-[#313131]/50">
                              <Clock className="w-3 h-3" />
                              <span>{service.duration} min</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-[#FF96B2]">R$ {service.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Portfolio Preview */}
                  <div>
                    <h3 className="text-xl font-semibold text-[#313131] mb-4">Portfólio</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {portfolio.slice(0, 6).map((item) => (
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
