# 📖 Rotas e Endpoints – Backend Node.js + Express + Firebase

## 📁 Estrutura de Pastas

```
src/
├── config/
│   └── firebase.ts                # Configuração do Firebase
├── controllers/
│   ├── authController.ts          # Login, registro, autenticação
│   ├── clientController.ts        # Funções do cliente
│   ├── professionalController.ts  # Funções do profissional
│   ├── adminController.ts         # Funções do administrador
│   └── scheduleController.ts      # Agendamentos
├── middlewares/
│   ├── authMiddleware.ts          # Verificação de token e permissões
│   └── errorMiddleware.ts         # Tratamento de erros
├── routes/
│   ├── authRoutes.ts
│   ├── clientRoutes.ts
│   ├── professionalRoutes.ts
│   ├── adminRoutes.ts
│   └── scheduleRoutes.ts
├── services/
│   ├── emailService.ts            # Envio de notificações por e-mail
│   └── schedulingService.ts       # Lógica de agendamento
├── utils/
│   └── validators.ts              # Validações genéricas
├── app.ts                         # Configuração principal do Express
└── server.ts                      # Inicialização do servidor
```

---

## 🚦 Rotas e Endpoints

### 🔐 Autenticação
| Método | Endpoint                | Descrição                      |
|--------|-------------------------|-------------------------------|
| POST   | `/api/auth/register`    | Registro de usuário           |
| POST   | `/api/auth/login`       | Login com email/senha         |
| POST   | `/api/auth/google`      | Login com Google              |
| POST   | `/api/auth/logout`      | Logout                        |
| GET    | `/api/auth/me`          | Dados do usuário logado       |

---

### 👤 Cliente
| Método | Endpoint                        | Descrição                        |
|--------|---------------------------------|----------------------------------|
| GET    | `/api/clients/profile`          | Ver perfil do cliente            |
| PUT    | `/api/clients/profile`          | Editar perfil do cliente         |
| GET    | `/api/salons`                   | Buscar salões por filtros        |
| GET    | `/api/salons/:id/services`      | Ver serviços de um salão         |
| POST   | `/api/schedules`                | Agendar horário                  |
| GET    | `/api/schedules`                | Listar agendamentos do cliente   |
| DELETE | `/api/schedules/:id`            | Cancelar agendamento             |
| POST   | `/api/schedules/:id/rate`       | Avaliar serviço                  |

---

### 💇 Profissional
| Método | Endpoint                                 | Descrição                                 |
|--------|------------------------------------------|-------------------------------------------|
| GET    | `/api/professionals/profile`             | Ver perfil profissional                   |
| PUT    | `/api/professionals/profile`             | Editar perfil profissional                |
| PUT    | `/api/professionals/availability`        | Editar disponibilidade                    |
| GET    | `/api/professionals/schedules`           | Ver agendamentos recebidos                |
| PATCH  | `/api/schedules/:id/status`              | Confirmar, remarcar ou recusar agendamento|

---

### 🏢 Administrador do Salão
| Método | Endpoint                                 | Descrição                                 |
|--------|------------------------------------------|-------------------------------------------|
| GET    | `/api/admin/profile`                     | Ver perfil do salão                       |
| PUT    | `/api/admin/profile`                     | Editar perfil do salão                    |
| POST   | `/api/admin/services`                    | Criar serviço                             |
| PUT    | `/api/admin/services/:id`                | Editar serviço                            |
| DELETE | `/api/admin/services/:id`                | Remover serviço                           |
| POST   | `/api/admin/professionals`               | Adicionar profissional                    |
| DELETE | `/api/admin/professionals/:id`           | Remover profissional                      |
| GET    | `/api/admin/schedules`                   | Ver todos os agendamentos                 |
| GET    | `/api/admin/reports`                     | Gerar relatórios                          |

---

> **Observação:**  
> Todas as rotas devem ser protegidas com middleware de autenticação e validação de permissões de acordo com o tipo de usuário.
