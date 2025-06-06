"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Building2,
  Camera,
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  Users,
  Plus,
  Edit,
  Trash2,
  Upload,
  Instagram,
  Globe,
  Wifi,
  CreditCard,
  Car,
  Coffee,
  Shield,
  Eye,
  DollarSign,
} from "lucide-react"

export default function AdminSalonPage() {
  const [salonData, setSalonData] = useState({
    name: "Salão Elegance",
    description:
      "Um salão moderno e acolhedor, especializado em transformar looks e elevar a autoestima dos nossos clientes.",
    address: "Rua das Flores, 123 - Centro, São Paulo - SP",
    cep: "01234-567",
    phone: "(11) 3333-4444",
    whatsapp: "(11) 99999-9999",
    email: "contato@salaoelegance.com.br",
    website: "www.salaoelegance.com.br",
    instagram: "@salaoelegance",
    facebook: "Salão Elegance",
    category: "premium",
    capacity: 8,
    foundedYear: "2018",
  })

  const [operatingHours, setOperatingHours] = useState({
    monday: { open: "08:00", close: "18:00", closed: false },
    tuesday: { open: "08:00", close: "18:00", closed: false },
    wednesday: { open: "08:00", close: "18:00", closed: false },
    thursday: { open: "08:00", close: "19:00", closed: false },
    friday: { open: "08:00", close: "19:00", closed: false },
    saturday: { open: "08:00", close: "17:00", closed: false },
    sunday: { open: "09:00", close: "15:00", closed: true },
  })

  const [amenities, setAmenities] = useState({
    wifi: true,
    parking: true,
    coffee: true,
    airConditioning: true,
    accessibility: false,
    musicSystem: true,
    magazines: true,
    childArea: false,
  })

  const [paymentMethods, setPaymentMethods] = useState({
    cash: true,
    debitCard: true,
    creditCard: true,
    pix: true,
    bankTransfer: false,
    voucher: true,
  })

  const [professionals, setProfessionals] = useState([
    {
      id: 1,
      name: "Ana Costa",
      email: "ana@salaoelegance.com",
      phone: "(11) 98888-8888",
      specialty: "Cortes e Coloração",
      experience: "8 anos",
      rating: 4.9,
      reviews: 127,
      status: "active",
      avatar: "/placeholder.svg?height=60&width=60",
      joinDate: "2020-03-15",
      commission: 60,
      isManager: true,
    },
    {
      id: 2,
      name: "Carlos Lima",
      email: "carlos@salaoelegance.com",
      phone: "(11) 97777-7777",
      specialty: "Cortes Masculinos e Barba",
      experience: "5 anos",
      rating: 4.8,
      reviews: 89,
      status: "active",
      avatar: "/placeholder.svg?height=60&width=60",
      joinDate: "2021-07-20",
      commission: 55,
      isManager: false,
    },
    {
      id: 3,
      name: "Lucia Mendes",
      email: "lucia@salaoelegance.com",
      phone: "(11) 96666-6666",
      specialty: "Manicure e Pedicure",
      experience: "6 anos",
      rating: 4.7,
      reviews: 156,
      status: "vacation",
      avatar: "/placeholder.svg?height=60&width=60",
      joinDate: "2019-11-10",
      commission: 50,
      isManager: false,
    },
    {
      id: 4,
      name: "Roberto Santos",
      email: "roberto@salaoelegance.com",
      phone: "(11) 95555-5555",
      specialty: "Tratamentos Capilares",
      experience: "10 anos",
      rating: 4.9,
      reviews: 203,
      status: "inactive",
      avatar: "/placeholder.svg?height=60&width=60",
      joinDate: "2018-01-05",
      commission: 65,
      isManager: false,
    },
  ])

  const [newProfessional, setNewProfessional] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "",
    experience: "",
    commission: 50,
    isManager: false,
  })

  const [services, setServices] = useState([
    {
      id: 1,
      name: "Corte Feminino",
      description: "Corte personalizado para mulheres",
      duration: 60,
      price: 80,
      category: "Cabelo",
      active: true,
    },
    {
      id: 2,
      name: "Coloração Completa",
      description: "Coloração profissional com produtos premium",
      duration: 180,
      price: 200,
      category: "Cabelo",
      active: true,
    },
    {
      id: 3,
      name: "Manicure",
      description: "Cuidado completo das unhas das mãos",
      duration: 45,
      price: 35,
      category: "Unhas",
      active: true,
    },
    {
      id: 4,
      name: "Pedicure",
      description: "Cuidado completo das unhas dos pés",
      duration: 60,
      price: 45,
      category: "Unhas",
      active: true,
    },
  ])

  const [newService, setNewService] = useState({
    name: "",
    description: "",
    duration: 60,
    price: 0,
    category: "",
  })

  const dayNames = {
    monday: "Segunda-feira",
    tuesday: "Terça-feira",
    wednesday: "Quarta-feira",
    thursday: "Quinta-feira",
    friday: "Sexta-feira",
    saturday: "Sábado",
    sunday: "Domingo",
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>
      case "vacation":
        return <Badge className="bg-yellow-100 text-yellow-800">Férias</Badge>
      case "inactive":
        return <Badge className="bg-red-100 text-red-800">Inativo</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Pendente</Badge>
    }
  }

  const handleSaveSalon = () => {
    console.log("Salon data saved:", salonData)
  }

  const handleAddProfessional = () => {
    if (newProfessional.name && newProfessional.email && newProfessional.specialty) {
      setProfessionals([
        ...professionals,
        {
          ...newProfessional,
          id: Date.now(),
          rating: 0,
          reviews: 0,
          status: "active",
          avatar: "/placeholder.svg?height=60&width=60",
          joinDate: new Date().toISOString().split("T")[0],
        },
      ])
      setNewProfessional({
        name: "",
        email: "",
        phone: "",
        specialty: "",
        experience: "",
        commission: 50,
        isManager: false,
      })
    }
  }

  const handleDeleteProfessional = (professionalId: number) => {
    setProfessionals(professionals.filter((prof) => prof.id !== professionalId))
  }

  const handleAddService = () => {
    if (newService.name && newService.description && newService.category) {
      setServices([
        ...services,
        {
          ...newService,
          id: Date.now(),
          active: true,
        },
      ])
      setNewService({
        name: "",
        description: "",
        duration: 60,
        price: 0,
        category: "",
      })
    }
  }

  const handleDeleteService = (serviceId: number) => {
    setServices(services.filter((service) => service.id !== serviceId))
  }

  const handleToggleService = (serviceId: number) => {
    setServices(
      services.map((service) => (service.id === serviceId ? { ...service, active: !service.active } : service)),
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Meu Salão</h1>
          <p className="text-muted-foreground">Gerencie todas as informações do seu salão</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general">Geral</TabsTrigger>
            <TabsTrigger value="professionals">Profissionais</TabsTrigger>
            <TabsTrigger value="services">Serviços</TabsTrigger>
            <TabsTrigger value="hours">Horários</TabsTrigger>
            <TabsTrigger value="amenities">Comodidades</TabsTrigger>
            <TabsTrigger value="gallery">Galeria</TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Salon Photo */}
              <Card className="border-0 shadow-lg bg-card">
                <CardHeader className="text-center">
                  <CardTitle className="text-foreground">Foto do Salão</CardTitle>
                  <CardDescription>Imagem principal que aparece no perfil</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="relative inline-block">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                      <Building2 className="w-16 h-16 text-primary" />
                    </div>
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0 bg-primary hover:bg-primary/90"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Alterar Foto
                    </Button>
                    <p className="text-xs text-muted-foreground">Recomendado: 800x600px, máximo 5MB</p>
                  </div>
                </CardContent>
              </Card>

              {/* Basic Information */}
              <Card className="lg:col-span-2 border-0 shadow-lg bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Informações Básicas</CardTitle>
                  <CardDescription>Dados principais do seu salão</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="salonName">Nome do salão</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="salonName"
                          className="pl-10 border-border focus:border-primary"
                          value={salonData.name}
                          onChange={(e) => setSalonData({ ...salonData, name: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Categoria</Label>
                      <Select
                        value={salonData.category}
                        onValueChange={(value) => setSalonData({ ...salonData, category: value })}
                      >
                        <SelectTrigger className="border-border focus:border-primary">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Básico</SelectItem>
                          <SelectItem value="standard">Padrão</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="luxury">Luxo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          className="pl-10 border-border focus:border-primary"
                          value={salonData.phone}
                          onChange={(e) => setSalonData({ ...salonData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">WhatsApp</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="whatsapp"
                          className="pl-10 border-border focus:border-primary"
                          value={salonData.whatsapp}
                          onChange={(e) => setSalonData({ ...salonData, whatsapp: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          className="pl-10 border-border focus:border-primary"
                          value={salonData.email}
                          onChange={(e) => setSalonData({ ...salonData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="capacity">Capacidade</Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="capacity"
                          type="number"
                          className="pl-10 border-border focus:border-primary"
                          value={salonData.capacity}
                          onChange={(e) => setSalonData({ ...salonData, capacity: Number.parseInt(e.target.value) })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Endereço completo</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="address"
                          className="pl-10 border-border focus:border-primary"
                          value={salonData.address}
                          onChange={(e) => setSalonData({ ...salonData, address: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="website"
                          className="pl-10 border-border focus:border-primary"
                          value={salonData.website}
                          onChange={(e) => setSalonData({ ...salonData, website: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <div className="relative">
                        <Instagram className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="instagram"
                          className="pl-10 border-border focus:border-primary"
                          value={salonData.instagram}
                          onChange={(e) => setSalonData({ ...salonData, instagram: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição do salão</Label>
                    <Textarea
                      id="description"
                      placeholder="Conte sobre o seu salão, especialidades, diferenciais..."
                      className="border-border focus:border-primary min-h-[100px]"
                      value={salonData.description}
                      onChange={(e) => setSalonData({ ...salonData, description: e.target.value })}
                    />
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleSaveSalon}>
                    Salvar Informações
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Professionals Tab */}
          <TabsContent value="professionals">
            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-card">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-foreground">Equipe de Profissionais</CardTitle>
                      <CardDescription>Gerencie os profissionais do seu salão</CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                          <Plus className="w-4 h-4 mr-2" />
                          Adicionar Profissional
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-foreground">Novo Profissional</DialogTitle>
                          <DialogDescription>Adicione um novo profissional à equipe</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="profName">Nome completo</Label>
                            <Input
                              id="profName"
                              className="border-border focus:border-primary"
                              value={newProfessional.name}
                              onChange={(e) => setNewProfessional({ ...newProfessional, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="profEmail">E-mail</Label>
                            <Input
                              id="profEmail"
                              type="email"
                              className="border-border focus:border-primary"
                              value={newProfessional.email}
                              onChange={(e) => setNewProfessional({ ...newProfessional, email: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="profPhone">Telefone</Label>
                            <Input
                              id="profPhone"
                              className="border-border focus:border-primary"
                              value={newProfessional.phone}
                              onChange={(e) => setNewProfessional({ ...newProfessional, phone: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="profSpecialty">Especialidade</Label>
                            <Input
                              id="profSpecialty"
                              className="border-border focus:border-primary"
                              value={newProfessional.specialty}
                              onChange={(e) => setNewProfessional({ ...newProfessional, specialty: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="profExperience">Experiência</Label>
                            <Select
                              value={newProfessional.experience}
                              onValueChange={(value) => setNewProfessional({ ...newProfessional, experience: value })}
                            >
                              <SelectTrigger className="border-border focus:border-primary">
                                <SelectValue placeholder="Selecione a experiência" />
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
                            <Label htmlFor="profCommission">Comissão (%)</Label>
                            <Input
                              id="profCommission"
                              type="number"
                              min="0"
                              max="100"
                              className="border-border focus:border-primary"
                              value={newProfessional.commission}
                              onChange={(e) =>
                                setNewProfessional({ ...newProfessional, commission: Number.parseInt(e.target.value) })
                              }
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="isManager"
                              checked={newProfessional.isManager}
                              onCheckedChange={(checked) =>
                                setNewProfessional({ ...newProfessional, isManager: checked })
                              }
                            />
                            <Label htmlFor="isManager">Gerente</Label>
                          </div>
                          <Button
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                            onClick={handleAddProfessional}
                          >
                            Adicionar Profissional
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Profissional</TableHead>
                        <TableHead>Contato</TableHead>
                        <TableHead>Especialidade</TableHead>
                        <TableHead>Avaliação</TableHead>
                        <TableHead>Comissão</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {professionals.map((professional) => (
                        <TableRow key={professional.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={professional.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                  {professional.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-foreground">{professional.name}</p>
                                <p className="text-sm text-muted-foreground">{professional.experience}</p>
                                {professional.isManager && (
                                  <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs">Gerente</Badge>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <p className="text-foreground">{professional.email}</p>
                              <p className="text-muted-foreground">{professional.phone}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm text-foreground">{professional.specialty}</p>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{professional.rating}</span>
                              <span className="text-sm text-muted-foreground">({professional.reviews})</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm font-medium text-primary">{professional.commission}%</span>
                          </TableCell>
                          <TableCell>{getStatusBadge(professional.status)}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="ghost">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="ghost" className="text-destructive">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Remover profissional</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Tem certeza que deseja remover {professional.name} da equipe?
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-destructive hover:bg-destructive/90"
                                      onClick={() => handleDeleteProfessional(professional.id)}
                                    >
                                      Remover
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-card">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-foreground">Serviços Oferecidos</CardTitle>
                      <CardDescription>Gerencie os serviços do seu salão</CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                          <Plus className="w-4 h-4 mr-2" />
                          Novo Serviço
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-foreground">Adicionar Serviço</DialogTitle>
                          <DialogDescription>Crie um novo serviço para o salão</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="serviceName">Nome do serviço</Label>
                            <Input
                              id="serviceName"
                              className="border-border focus:border-primary"
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
                              <SelectTrigger className="border-border focus:border-primary">
                                <SelectValue placeholder="Selecione a categoria" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Cabelo">Cabelo</SelectItem>
                                <SelectItem value="Unhas">Unhas</SelectItem>
                                <SelectItem value="Estética">Estética</SelectItem>
                                <SelectItem value="Maquiagem">Maquiagem</SelectItem>
                                <SelectItem value="Sobrancelha">Sobrancelha</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="serviceDuration">Duração (min)</Label>
                              <Input
                                id="serviceDuration"
                                type="number"
                                className="border-border focus:border-primary"
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
                                className="border-border focus:border-primary"
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
                              className="border-border focus:border-primary"
                              value={newService.description}
                              onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                            />
                          </div>
                          <Button
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
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
                      <Card key={service.id} className="border border-border bg-card">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg text-foreground">{service.name}</CardTitle>
                              <Badge className="bg-primary/10 text-primary">{service.category}</Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={service.active}
                                onCheckedChange={() => handleToggleService(service.id)}
                              />
                              <div className="flex space-x-1">
                                <Button size="sm" variant="ghost">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button size="sm" variant="ghost" className="text-destructive">
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Excluir serviço</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Tem certeza que deseja excluir este serviço?
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                      <AlertDialogAction
                                        className="bg-destructive hover:bg-destructive/90"
                                        onClick={() => handleDeleteService(service.id)}
                                      >
                                        Excluir
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {service.duration} min
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />
                                R$ {service.price}
                              </div>
                            </div>
                            <Badge
                              className={service.active ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" : "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200"}
                            >
                              {service.active ? "Ativo" : "Inativo"}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

            {/* Hours Tab */}
            <TabsContent value="hours">
            <Card className="border-0 shadow-lg bg-card">
              <CardHeader>
              <CardTitle className="text-foreground">Horário de Funcionamento</CardTitle>
              <CardDescription>Configure os horários de abertura e fechamento</CardDescription>
              </CardHeader>
              <CardContent>
              <div className="space-y-4">
                {Object.entries(operatingHours).map(([day, hours]) => (
                <div
                  key={day}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted dark:bg-muted/40"
                >
                  <div className="flex items-center space-x-4">
                  <div className="w-32">
                    <span className="font-medium text-foreground">
                    {dayNames[day as keyof typeof dayNames]}
                    </span>
                  </div>
                  <Switch
                    checked={!hours.closed}
                    onCheckedChange={(checked) =>
                    setOperatingHours({
                      ...operatingHours,
                      [day]: { ...hours, closed: !checked },
                    })
                    }
                  />
                  </div>
                  {!hours.closed && (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                    <Label htmlFor={`${day}-open`} className="text-sm text-foreground">
                      Abertura:
                    </Label>
                    <Input
                      id={`${day}-open`}
                      type="time"
                      className="w-24 border-border focus:border-primary bg-background text-foreground"
                      value={hours.open}
                      onChange={(e) =>
                      setOperatingHours({
                        ...operatingHours,
                        [day]: { ...hours, open: e.target.value },
                      })
                      }
                    />
                    </div>
                    <div className="flex items-center space-x-2">
                    <Label htmlFor={`${day}-close`} className="text-sm text-foreground">
                      Fechamento:
                    </Label>
                    <Input
                      id={`${day}-close`}
                      type="time"
                      className="w-24 border-border focus:border-primary bg-background text-foreground"
                      value={hours.close}
                      onChange={(e) =>
                      setOperatingHours({
                        ...operatingHours,
                        [day]: { ...hours, close: e.target.value },
                      })
                      }
                    />
                    </div>
                  </div>
                  )}
                  {hours.closed && (
                  <Badge className="bg-destructive/10 dark:bg-destructive/30 text-destructive dark:text-destructive-foreground">
                    Fechado
                  </Badge>
                  )}
                </div>
                ))}
              </div>
              <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                Salvar Horários
              </Button>
              </CardContent>
            </Card>
            </TabsContent>

          {/* Amenities Tab */}
          <TabsContent value="amenities">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Comodidades</CardTitle>
                  <CardDescription>Serviços e facilidades oferecidas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Wifi className="w-5 h-5 text-primary" />
                      <span className="text-foreground">Wi-Fi gratuito</span>
                    </div>
                    <Switch
                      checked={amenities.wifi}
                      onCheckedChange={(checked) => setAmenities({ ...amenities, wifi: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Car className="w-5 h-5 text-primary" />
                      <span className="text-foreground">Estacionamento</span>
                    </div>
                    <Switch
                      checked={amenities.parking}
                      onCheckedChange={(checked) => setAmenities({ ...amenities, parking: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Coffee className="w-5 h-5 text-primary" />
                      <span className="text-foreground">Café e água</span>
                    </div>
                    <Switch
                      checked={amenities.coffee}
                      onCheckedChange={(checked) => setAmenities({ ...amenities, coffee: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-primary" />
                      <span className="text-foreground">Acessibilidade</span>
                    </div>
                    <Switch
                      checked={amenities.accessibility}
                      onCheckedChange={(checked) => setAmenities({ ...amenities, accessibility: checked })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Formas de Pagamento</CardTitle>
                  <CardDescription>Métodos de pagamento aceitos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="w-5 h-5 text-primary" />
                      <span className="text-foreground">Dinheiro</span>
                    </div>
                    <Switch
                      checked={paymentMethods.cash}
                      onCheckedChange={(checked) => setPaymentMethods({ ...paymentMethods, cash: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-primary" />
                      <span className="text-foreground">Cartão de débito</span>
                    </div>
                    <Switch
                      checked={paymentMethods.debitCard}
                      onCheckedChange={(checked) => setPaymentMethods({ ...paymentMethods, debitCard: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-primary" />
                      <span className="text-foreground">Cartão de crédito</span>
                    </div>
                    <Switch
                      checked={paymentMethods.creditCard}
                      onCheckedChange={(checked) => setPaymentMethods({ ...paymentMethods, creditCard: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <span className="text-foreground">PIX</span>
                    </div>
                    <Switch
                      checked={paymentMethods.pix}
                      onCheckedChange={(checked) => setPaymentMethods({ ...paymentMethods, pix: checked })}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery">
            <Card className="border-0 shadow-lg bg-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-foreground">Galeria de Fotos</CardTitle>
                    <CardDescription>Mostre o ambiente e trabalhos do seu salão</CardDescription>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Fotos
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                        <Camera className="w-8 h-8 text-primary" />
                      </div>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
