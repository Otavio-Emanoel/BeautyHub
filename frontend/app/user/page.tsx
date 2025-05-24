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
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Bell,
  Shield,
  LogOut,
  UserPlus,
  Eye,
  EyeOff,
  Calendar,
  Settings,
} from "lucide-react"

export default function AccountPage() {
  const [profileData, setProfileData] = useState({
    name: "Maria Silva",
    email: "maria.silva@email.com",
    phone: "(11) 99999-9999",
    address: "Rua das Flores, 123 - São Paulo, SP",
    bio: "Apaixonada por beleza e bem-estar. Sempre em busca dos melhores tratamentos para cuidar de mim.",
    birthDate: "1990-05-15",
    gender: "female",
  })

  const [notifications, setNotifications] = useState({
    emailReminders: true,
    smsReminders: true,
    promotions: false,
    newSalons: true,
    reviews: true,
  })

  const [privacy, setPrivacy] = useState({
    profilePublic: false,
    shareReviews: true,
    showLocation: false,
    allowMessages: true,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const accounts = [
    {
      id: 1,
      name: "Maria Silva",
      email: "maria.silva@email.com",
      type: "Cliente",
      avatar: "/placeholder.svg?height=40&width=40",
      isActive: true,
    },
    {
      id: 2,
      name: "Maria Silva - Profissional",
      email: "maria.profissional@email.com",
      type: "Profissional",
      avatar: "/placeholder.svg?height=40&width=40",
      isActive: false,
    },
  ]

  const recentActivity = [
    {
      id: 1,
      action: "Agendamento realizado",
      description: "Corte + Escova no Salão Elegance",
      date: "2024-01-15",
      time: "14:30",
    },
    {
      id: 2,
      action: "Avaliação enviada",
      description: "5 estrelas para Ana Costa",
      date: "2024-01-10",
      time: "16:45",
    },
    {
      id: 3,
      action: "Perfil atualizado",
      description: "Informações de contato alteradas",
      date: "2024-01-08",
      time: "10:20",
    },
  ]

  const handleSaveProfile = () => {
    // Implementar lógica de salvamento do perfil
    console.log("Profile saved:", profileData)
  }

  const handleChangePassword = () => {
    // Implementar lógica de alteração de senha
    console.log("Password change requested")
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleLogout = () => {
    // Implementar lógica de logout
    console.log("User logged out")
  }

  const handleSwitchAccount = (accountId: number) => {
    // Implementar lógica de troca de conta
    console.log("Switching to account:", accountId)
  }

  const handleDeleteAccount = () => {
    // Implementar lógica de exclusão de conta
    console.log("Account deletion requested")
  }

  return (
    <div className="min-h-screen bg-[#EFEFEF] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#313131] mb-2">Minha Conta</h1>
          <p className="text-[#313131]/70">Gerencie suas informações pessoais e configurações</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="accounts">Contas</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="privacy">Privacidade</TabsTrigger>
            <TabsTrigger value="activity">Atividade</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Profile Picture */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-[#313131]">Foto do Perfil</CardTitle>
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
                      Alterar Foto
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full text-red-600 hover:bg-red-50">
                      Remover Foto
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Form */}
              <Card className="lg:col-span-2 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#313131]">Informações Pessoais</CardTitle>
                  <CardDescription>Atualize suas informações pessoais</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
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
                      <Label htmlFor="birthDate">Data de nascimento</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        className="border-[#EFEFEF] focus:border-[#FF96B2]"
                        value={profileData.birthDate}
                        onChange={(e) => setProfileData({ ...profileData, birthDate: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Endereço</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50" />
                        <Input
                          id="address"
                          className="pl-10 border-[#EFEFEF] focus:border-[#FF96B2]"
                          value={profileData.address}
                          onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Gênero</Label>
                      <Select
                        value={profileData.gender}
                        onValueChange={(value) => setProfileData({ ...profileData, gender: value })}
                      >
                        <SelectTrigger className="border-[#EFEFEF] focus:border-[#FF96B2]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="female">Feminino</SelectItem>
                          <SelectItem value="male">Masculino</SelectItem>
                          <SelectItem value="other">Outro</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefiro não informar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Sobre você</Label>
                    <Textarea
                      id="bio"
                      placeholder="Conte um pouco sobre você..."
                      className="border-[#EFEFEF] focus:border-[#FF96B2]"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      className="flex-1 bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white"
                      onClick={handleSaveProfile}
                    >
                      Salvar Alterações
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="border-[#FF96B2] text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white"
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Alterar Senha
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-[#313131]">Alterar Senha</DialogTitle>
                          <DialogDescription>Digite sua senha atual e a nova senha</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword">Senha atual</Label>
                            <Input
                              id="currentPassword"
                              type="password"
                              className="border-[#EFEFEF] focus:border-[#FF96B2]"
                              value={currentPassword}
                              onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="newPassword">Nova senha</Label>
                            <div className="relative">
                              <Input
                                id="newPassword"
                                type={showPassword ? "text" : "password"}
                                className="pr-10 border-[#EFEFEF] focus:border-[#FF96B2]"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                              />
                              <button
                                type="button"
                                className="absolute right-3 top-3"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="w-4 h-4 text-[#313131]/50" />
                                ) : (
                                  <Eye className="w-4 h-4 text-[#313131]/50" />
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
                            <Input
                              id="confirmPassword"
                              type="password"
                              className="border-[#EFEFEF] focus:border-[#FF96B2]"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                          </div>
                          <Button
                            className="w-full bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white"
                            onClick={handleChangePassword}
                            disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
                          >
                            Alterar Senha
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Accounts Tab */}
          <TabsContent value="accounts">
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#313131]">Contas Vinculadas</CardTitle>
                  <CardDescription>Gerencie suas contas e alterne entre elas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {accounts.map((account) => (
                    <div
                      key={account.id}
                      className={`p-4 border rounded-lg ${
                        account.isActive ? "border-[#FF96B2] bg-[#FF96B2]/5" : "border-[#EFEFEF]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={account.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-[#FF96B2] text-white">
                              {account.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-[#313131]">{account.name}</p>
                            <p className="text-sm text-[#313131]/70">{account.email}</p>
                            <Badge
                              className={
                                account.type === "Cliente"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-purple-100 text-purple-800"
                              }
                            >
                              {account.type}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {account.isActive ? (
                            <Badge className="bg-green-100 text-green-800">Ativa</Badge>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-[#FF96B2] text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white"
                              onClick={() => handleSwitchAccount(account.id)}
                            >
                              Alternar
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#313131]">Ações da Conta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="outline"
                      className="flex-1 border-[#FF96B2] text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Criar Nova Conta
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-[#FF96B2] text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair da Conta
                    </Button>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-50">
                        Excluir Conta
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta e removerá todos os
                          seus dados de nossos servidores.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDeleteAccount}>
                          Excluir Conta
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-[#313131]">
                  <Bell className="w-5 h-5 mr-2 text-[#FF96B2]" />
                  Configurações de Notificação
                </CardTitle>
                <CardDescription>Escolha como e quando você quer receber notificações</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#313131]">Lembretes por e-mail</p>
                      <p className="text-sm text-[#313131]/70">Receba lembretes de agendamentos por e-mail</p>
                    </div>
                    <Switch
                      checked={notifications.emailReminders}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailReminders: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#313131]">Lembretes por SMS</p>
                      <p className="text-sm text-[#313131]/70">Receba lembretes de agendamentos por SMS</p>
                    </div>
                    <Switch
                      checked={notifications.smsReminders}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, smsReminders: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#313131]">Promoções e ofertas</p>
                      <p className="text-sm text-[#313131]/70">Receba ofertas especiais e promoções</p>
                    </div>
                    <Switch
                      checked={notifications.promotions}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, promotions: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#313131]">Novos salões</p>
                      <p className="text-sm text-[#313131]/70">Seja notificado sobre novos salões na sua região</p>
                    </div>
                    <Switch
                      checked={notifications.newSalons}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, newSalons: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#313131]">Solicitações de avaliação</p>
                      <p className="text-sm text-[#313131]/70">Receba lembretes para avaliar serviços</p>
                    </div>
                    <Switch
                      checked={notifications.reviews}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, reviews: checked })}
                    />
                  </div>
                </div>

                <Button className="w-full bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white">Salvar Preferências</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-[#313131]">
                  <Shield className="w-5 h-5 mr-2 text-[#FF96B2]" />
                  Configurações de Privacidade
                </CardTitle>
                <CardDescription>Controle quem pode ver suas informações</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#313131]">Perfil público</p>
                      <p className="text-sm text-[#313131]/70">Permitir que outros usuários vejam seu perfil</p>
                    </div>
                    <Switch
                      checked={privacy.profilePublic}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, profilePublic: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#313131]">Compartilhar avaliações</p>
                      <p className="text-sm text-[#313131]/70">Mostrar suas avaliações publicamente</p>
                    </div>
                    <Switch
                      checked={privacy.shareReviews}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, shareReviews: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#313131]">Mostrar localização</p>
                      <p className="text-sm text-[#313131]/70">Permitir que salões vejam sua localização</p>
                    </div>
                    <Switch
                      checked={privacy.showLocation}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, showLocation: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#313131]">Permitir mensagens</p>
                      <p className="text-sm text-[#313131]/70">Receber mensagens de salões e profissionais</p>
                    </div>
                    <Switch
                      checked={privacy.allowMessages}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, allowMessages: checked })}
                    />
                  </div>
                </div>

                <Button className="w-full bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white">Salvar Configurações</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-[#313131]">
                  <Settings className="w-5 h-5 mr-2 text-[#FF96B2]" />
                  Atividade Recente
                </CardTitle>
                <CardDescription>Histórico das suas atividades na plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 bg-[#EFEFEF] rounded-lg">
                      <div className="w-2 h-2 bg-[#FF96B2] rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="font-medium text-[#313131]">{activity.action}</p>
                        <p className="text-sm text-[#313131]/70">{activity.description}</p>
                        <div className="flex items-center space-x-2 mt-1 text-xs text-[#313131]/50">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(activity.date).toLocaleDateString("pt-BR")}</span>
                          <span>•</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    className="border-[#FF96B2] text-[#FF96B2] hover:bg-[#FF96B2] hover:text-white"
                  >
                    Ver Mais Atividades
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
