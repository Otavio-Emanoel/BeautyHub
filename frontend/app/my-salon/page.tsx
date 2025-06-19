"use client"

import { useState, useEffect } from "react"
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
  Snowflake,
  Book,
  Music,
} from "lucide-react"


// COMPONENTES

// Foto do Salão
function SalonPhoto({ salonData, setSalonData }: { salonData: any, setSalonData: any }) {
  return (
    <Card className="border-0 shadow-lg bg-card">
      <CardHeader className="text-center">
        <CardTitle className="text-foreground">Foto do Salão</CardTitle>
        <CardDescription>URL da imagem do salão (será exibida no perfil público)</CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="flex flex-col items-center gap-2">
          <Avatar className="w-32 h-32 mx-auto">
            <AvatarImage src={salonData.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-2xl bg-primary text-white">
              <Building2 className="w-10 h-10" />
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2 w-full">
            <Label htmlFor="salon-avatar" className="text-foreground">Link da foto (URL)</Label>
            <Input
              id="salon-avatar"
              placeholder="https://exemplo.com/salao.jpg"
              value={salonData.avatar}
              onChange={e => setSalonData((prev: any) => ({ ...prev, avatar: e.target.value }))}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Informações Básicas Tab
function SalonBasicInfo({ salonData, setSalonData, handleSaveSalon }: any) {
  return (
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
                className="pl-10 border-2 border-primary border-opacity-60 focus:border-primary"
                value={salonData.name}
                onChange={(e) => setSalonData((prev: any) => ({ ...prev, name: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select
              value={salonData.category}
              onValueChange={(value) => setSalonData((prev: any) => ({ ...prev, category: value }))}
            >
              <SelectTrigger className="border-2 border-primary border-opacity-60 focus:border-primary">
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
                className="pl-10 border-2 border-primary border-opacity-60 focus:border-primary"
                value={salonData.phone}
                onChange={(e) => setSalonData((prev: any) => ({ ...prev, phone: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="whatsapp"
                className="pl-10 border-2 border-primary border-opacity-60 focus:border-primary"
                value={salonData.whatsapp}
                onChange={(e) => setSalonData((prev: any) => ({ ...prev, whatsapp: e.target.value }))}
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
                className="pl-10 border-2 border-primary border-opacity-60 focus:border-primary"
                value={salonData.email}
                onChange={(e) => setSalonData((prev: any) => ({ ...prev, email: e.target.value }))}
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
                className="pl-10 border-2 border-primary border-opacity-60 focus:border-primary"
                value={salonData.capacity}
                onChange={(e) => setSalonData((prev: any) => ({ ...prev, capacity: Number.parseInt(e.target.value) }))}
              />
            </div>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Endereço completo</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="address"
                className="pl-10 border-2 border-primary border-opacity-60 focus:border-primary"
                value={salonData.address}
                onChange={(e) => setSalonData((prev: any) => ({ ...prev, address: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="website"
                className="pl-10 border-2 border-primary border-opacity-60 focus:border-primary"
                value={salonData.website}
                onChange={(e) => setSalonData((prev: any) => ({ ...prev, website: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <div className="relative">
              <Instagram className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="instagram"
                className="pl-10 border-2 border-primary border-opacity-60 focus:border-primary"
                value={salonData.instagram}
                onChange={(e) => setSalonData((prev: any) => ({ ...prev, instagram: e.target.value }))}
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Descrição do salão</Label>
          <Textarea
            id="description"
            placeholder="Conte sobre o seu salão, especialidades, diferenciais..."
            className="border-2 border-primary border-opacity-60 focus:border-primary min-h-[100px]"
            value={salonData.description}
            onChange={(e) => setSalonData((prev: any) => ({ ...prev, description: e.target.value }))}
          />
        </div>
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleSaveSalon}>
          Salvar Informações
        </Button>
      </CardContent>
    </Card>
  )
}

// Profissionais Tab
function ProfessionalsTab({
  professionals,
  setProfessionals,
  newProfessional,
  setNewProfessional,
  handleAddProfessional,
  handleDeleteProfessional,
  getStatusBadge,
}: any) {
  return (
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
                      className="border-2 border-primary border-opacity-60 focus:border-primary"
                      value={newProfessional.name}
                      onChange={(e) => setNewProfessional((prev: any) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profEmail">E-mail</Label>
                    <Input
                      id="profEmail"
                      type="email"
                      className="border-2 border-primary border-opacity-60 focus:border-primary"
                      value={newProfessional.email}
                      onChange={(e) => setNewProfessional((prev: any) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profPhone">Telefone</Label>
                    <Input
                      id="profPhone"
                      className="border-2 border-primary border-opacity-60 focus:border-primary"
                      value={newProfessional.phone}
                      onChange={(e) => setNewProfessional((prev: any) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profSpecialty">Especialidade</Label>
                    <Input
                      id="profSpecialty"
                      className="border-2 border-primary border-opacity-60 focus:border-primary"
                      value={newProfessional.specialty}
                      onChange={(e) => setNewProfessional((prev: any) => ({ ...prev, specialty: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profExperience">Experiência</Label>
                    <Select
                      value={newProfessional.experience}
                      onValueChange={(value) => setNewProfessional((prev: any) => ({ ...prev, experience: value }))}
                    >
                      <SelectTrigger className="border-2 border-primary border-opacity-60 focus:border-primary">
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
                      className="border-2 border-primary border-opacity-60 focus:border-primary"
                      value={newProfessional.commission}
                      onChange={(e) =>
                        setNewProfessional((prev: any) => ({ ...prev, commission: Number.parseInt(e.target.value) }))
                      }
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isManager"
                      checked={newProfessional.isManager}
                      onCheckedChange={(checked) =>
                        setNewProfessional((prev: any) => ({ ...prev, isManager: checked }))
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
              {professionals.map((professional: any) => (
                <TableRow key={professional.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={professional.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {professional.name
                            .split(" ")
                            .map((n: string) => n[0])
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
  )
}

// Serviços Tab
function ServicesTab({
  services,
  setServices,
  newService,
  setNewService,
  handleAddService,
  handleDeleteService,
  handleToggleService,
}: any) {
  return (
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
                      className="border-2 border-primary border-opacity-60 focus:border-primary"
                      value={newService.name}
                      onChange={(e) => setNewService((prev: any) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceCategory">Categoria</Label>
                    <Select
                      value={newService.category}
                      onValueChange={(value) => setNewService((prev: any) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="border-2 border-primary border-opacity-60 focus:border-primary">
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
                        className="border-2 border-primary border-opacity-60 focus:border-primary"
                        value={newService.duration}
                        onChange={(e) =>
                          setNewService((prev: any) => ({ ...prev, duration: Number.parseInt(e.target.value) }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="servicePrice">Preço (R$)</Label>
                      <Input
                        id="servicePrice"
                        type="number"
                        className="border-2 border-primary border-opacity-60 focus:border-primary"
                        value={newService.price}
                        onChange={(e) =>
                          setNewService((prev: any) => ({ ...prev, price: Number.parseFloat(e.target.value) }))
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceDescription">Descrição</Label>
                    <Textarea
                      id="serviceDescription"
                      className="border-2 border-primary border-opacity-60 focus:border-primary"
                      value={newService.description}
                      onChange={(e) => setNewService((prev: any) => ({ ...prev, description: e.target.value }))}
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
            {services.map((service: any) => (
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
  )
}

// Horários de Funcionamento
function HoursTab({ operatingHours, setOperatingHours, dayNames }: any) {
  return (
    <Card className="border-0 shadow-lg bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Horários de Funcionamento</CardTitle>
        <CardDescription>Configure os horários de abertura e fechamento do salão</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(operatingHours).map(([day, info]: any) => (
            <div key={day} className="flex items-center gap-4">
              <Label className="w-32">{dayNames[day]}</Label>
              <Input
                type="time"
                value={info.open}
                disabled={info.closed}
                onChange={e =>
                  setOperatingHours((prev: any) => ({
                    ...prev,
                    [day]: { ...prev[day], open: e.target.value }
                  }))
                }
                className="w-28"
              />
              <span>às</span>
              <Input
                type="time"
                value={info.close}
                disabled={info.closed}
                onChange={e =>
                  setOperatingHours((prev: any) => ({
                    ...prev,
                    [day]: { ...prev[day], close: e.target.value }
                  }))
                }
                className="w-28"
              />
              <div className="flex items-center gap-2 ml-4">
                <Switch
                  checked={info.closed}
                  onCheckedChange={checked =>
                    setOperatingHours((prev: any) => ({
                      ...prev,
                      [day]: { ...prev[day], closed: checked }
                    }))
                  }
                  id={`closed-${day}`}
                />
                <Label htmlFor={`closed-${day}`}>Fechado</Label>
              </div>
            </div>
          ))}
        </div>
        <Button className="mt-6 w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          Salvar Horários
        </Button>
      </CardContent>
    </Card>
  )
}

// Comodidades do Salão
function AmenitiesTab({ amenities, setAmenities, paymentMethods, setPaymentMethods }: any) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="border-0 shadow-lg bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Comodidades</CardTitle>
          <CardDescription>O que seu salão oferece aos clientes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <Wifi className="w-5 h-5 text-primary" />
              Wi-Fi
              <Switch
                checked={amenities.wifi}
                onCheckedChange={checked => setAmenities((prev: any) => ({ ...prev, wifi: checked }))}
              />
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Car className="w-5 h-5 text-primary" />
              Estacionamento
              <Switch
                checked={amenities.parking}
                onCheckedChange={checked => setAmenities((prev: any) => ({ ...prev, parking: checked }))}
              />
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Coffee className="w-5 h-5 text-primary" />
              Café
              <Switch
                checked={amenities.coffee}
                onCheckedChange={checked => setAmenities((prev: any) => ({ ...prev, coffee: checked }))}
              />
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Shield className="w-5 h-5 text-primary" />
              Acessibilidade
              <Switch
                checked={amenities.accessibility}
                onCheckedChange={checked => setAmenities((prev: any) => ({ ...prev, accessibility: checked }))}
              />
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Music className="w-5 h-5 text-primary" />
              Música Ambiente
              <Switch
                checked={amenities.musicSystem}
                onCheckedChange={checked => setAmenities((prev: any) => ({ ...prev, musicSystem: checked }))}
              />
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Book className="w-5 h-5 text-primary" />
              Revistas
              <Switch
                checked={amenities.magazines}
                onCheckedChange={checked => setAmenities((prev: any) => ({ ...prev, magazines: checked }))}
              />
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Users className="w-5 h-5 text-primary" />
              Espaço Kids
              <Switch
                checked={amenities.childArea}
                onCheckedChange={checked => setAmenities((prev: any) => ({ ...prev, childArea: checked }))}
              />
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Snowflake className="w-5 h-5 text-primary" />
              Ar Condicionado
              <Switch
                checked={amenities.airConditioning}
                onCheckedChange={checked => setAmenities((prev: any) => ({ ...prev, airConditioning: checked }))}
              />
            </label>
          </div>
        </CardContent>
      </Card>
      <Card className="border-0 shadow-lg bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Formas de Pagamento</CardTitle>
          <CardDescription>Selecione as formas aceitas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <CreditCard className="w-5 h-5 text-primary" />
              Cartão de Crédito
              <Switch
                checked={paymentMethods.creditCard}
                onCheckedChange={checked => setPaymentMethods((prev: any) => ({ ...prev, creditCard: checked }))}
              />
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <CreditCard className="w-5 h-5 text-primary" />
              Cartão de Débito
              <Switch
                checked={paymentMethods.debitCard}
                onCheckedChange={checked => setPaymentMethods((prev: any) => ({ ...prev, debitCard: checked }))}
              />
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <DollarSign className="w-5 h-5 text-primary" />
              Dinheiro
              <Switch
                checked={paymentMethods.cash}
                onCheckedChange={checked => setPaymentMethods((prev: any) => ({ ...prev, cash: checked }))}
              />
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <CreditCard className="w-5 h-5 text-primary" />
              Pix
              <Switch
                checked={paymentMethods.pix}
                onCheckedChange={checked => setPaymentMethods((prev: any) => ({ ...prev, pix: checked }))}
              />
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <CreditCard className="w-5 h-5 text-primary" />
              Transferência
              <Switch
                checked={paymentMethods.bankTransfer}
                onCheckedChange={checked => setPaymentMethods((prev: any) => ({ ...prev, bankTransfer: checked }))}
              />
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <CreditCard className="w-5 h-5 text-primary" />
              Vale/Convênio
              <Switch
                checked={paymentMethods.voucher}
                onCheckedChange={checked => setPaymentMethods((prev: any) => ({ ...prev, voucher: checked }))}
              />
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Galeria de Fotos
function GalleryTab() {
  // Para produção, use um state para as imagens e upload real
  return (
    <Card className="border-0 shadow-lg bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Galeria de Fotos</CardTitle>
        <CardDescription>Adicione fotos do seu salão para atrair mais clientes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-4">
          {/* Imagens mockadas */}
          {[1, 2, 3].map((n) => (
            <div key={n} className="w-40 h-32 bg-muted rounded-lg flex items-center justify-center">
              <img
                src={`/gallery/salao${n}.jpg`}
                alt={`Foto ${n}`}
                className="object-cover w-full h-full rounded-lg"
                onError={e => (e.currentTarget.style.display = "none")}
              />
            </div>
          ))}
        </div>
        <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
          <Upload className="w-4 h-4 mr-2" />
          Adicionar Foto
        </Button>
      </CardContent>
    </Card>
  )
}

// COMPONENTE PRINCIPAL

export default function AdminSalonPage() {

  const [hasSalon, setHasSalon] = useState(false);

  useEffect(() => {
    async function fetchSalon() {
      const token = localStorage.getItem("token")
      // 1. Busca o perfil do admin para pegar o salonId
      const resAdmin = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!resAdmin.ok) return
      const adminData = await resAdmin.json()
      if (!adminData.salonId) {
        setHasSalon(false)
        return
      }
      // 2. Busca os dados do salão pelo ID
      const resSalon = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/salons/${adminData.salonId}`)
      if (!resSalon.ok) return
      const salon = await resSalon.json()
      setSalonData((prev: any) => ({
        ...prev,
        ...salon,
        id: salon.id || adminData.salonId,
        avatar: salon.avatar || "",
      }))
    }
    fetchSalon()
  }, [])

  const [salonData, setSalonData] = useState({
    id: "",
    name: "",
    description: "",
    address: "",
    cep: "",
    phone: "",
    whatsapp: "",
    email: "",
    website: "",
    instagram: "",
    facebook: "",
    category: "",
    capacity: 0,
    foundedYear: "",
    avatar: "",
  })

  // Mocked data for the salon

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

  const handleSaveSalon = async () => {
  const token = localStorage.getItem("token")
  if (!hasSalon) {
    // Busca o perfil do admin para pegar o uid
    const resAdmin = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const adminData = await resAdmin.json()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/salon`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...salonData,
        uid: adminData.uid, 
      }),
    })
    if (res.ok) {
      alert("Salão criado com sucesso!")
      window.location.reload()
    } else {
      alert("Erro ao criar salão.")
      const errorData = await res.json()
      console.error("Erro ao criar salão:", errorData)
    }
  } else {
    // Edição do salão (PUT)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/salon/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        salonId: salonData.id,
        ...salonData,
      }),
    })
    if (res.ok) {
      alert("Informações do salão salvas com sucesso!")
    } else {
      alert("Erro ao salvar informações do salão.")
    }
  }
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
              <SalonPhoto salonData={salonData} setSalonData={setSalonData} />
              <SalonBasicInfo
                salonData={salonData}
                setSalonData={setSalonData}
                handleSaveSalon={handleSaveSalon}
                isCreation={!hasSalon}
              />
            </div>
          </TabsContent>

          {/* Professionals Tab */}
          <TabsContent value="professionals">
            <ProfessionalsTab
              professionals={professionals}
              setProfessionals={setProfessionals}
              newProfessional={newProfessional}
              setNewProfessional={setNewProfessional}
              handleAddProfessional={handleAddProfessional}
              handleDeleteProfessional={handleDeleteProfessional}
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
            <ServicesTab
              services={services}
              setServices={setServices}
              newService={newService}
              setNewService={setNewService}
              handleAddService={handleAddService}
              handleDeleteService={handleDeleteService}
              handleToggleService={handleToggleService}
            />
          </TabsContent>

          {/* Hours Tab */}
          <TabsContent value="hours">
            <HoursTab
              operatingHours={operatingHours}
              setOperatingHours={setOperatingHours}
              dayNames={dayNames}
            />
          </TabsContent>

          {/* Amenities Tab */}
          <TabsContent value="amenities">
            <AmenitiesTab
              amenities={amenities}
              setAmenities={setAmenities}
              paymentMethods={paymentMethods}
              setPaymentMethods={setPaymentMethods}
            />
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery">
            <GalleryTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}