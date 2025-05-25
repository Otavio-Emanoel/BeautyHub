# 📚 Estrutura do Banco de Dados – Firestore (Firebase)

## 🔑 Autenticação (Firebase Auth)
- Usuários autenticados por e-mail/senha ou Google.
- Campos extras (nome, telefone, foto, tipo de perfil) ficam no Firestore.

---

## 🔥 Firestore – Estrutura das Coleções

### 1. `users` (coleção)
**Campos comuns:**
- `uid`: string (igual ao Auth)
- `name`: string
- `email`: string
- `phone`: string
- `photoURL`: string
- `role`: "client" | "professional" | "admin"
- `createdAt`: timestamp
- `notifications`: objeto (preferências)

**Campos extras por tipo:**
- **Profissional:**  
  - `bio`: string  
  - `specialties`: array de strings  
  - `servicesIds`: array de IDs  
  - `availability`: objeto (dias/horários)  
  - `rating`: number  
  - `reviews`: array de IDs  
  - `salonId`: ID do salão  
- **Cliente:**  
  - `address`: string  
  - `favorites`: array de IDs de salões  
  - `history`: array de IDs de agendamentos  
- **Admin:**  
  - `salonId`: ID do salão  

---

### 2. `salons` (coleção)
- `name`: string
- `description`: string
- `address`: string
- `cep`: string
- `phone`: string
- `whatsapp`: string
- `email`: string
- `website`: string
- `instagram`: string
- `facebook`: string
- `category`: string (ex: premium)
- `capacity`: number
- `foundedYear`: number
- `logoURL`: string
- `operatingHours`: objeto (dias/horários)
- `amenities`: array de strings (ex: acessibilidade, wifi)
- `paymentMethods`: array de strings
- `admins`: array de uids
- `createdAt`: timestamp
- `servicesIds`: array de IDs
- `professionalsIds`: array de IDs

---

### 3. `services` (coleção)
- `salonId`: ID do salão
- `name`: string
- `description`: string
- `duration`: number (minutos)
- `price`: number
- `category`: string
- `active`: boolean
- `createdAt`: timestamp

---

### 4. `professionals` (coleção)
- `userId`: referência ao user
- `salonId`: ID do salão
- `name`: string
- `email`: string
- `phone`: string
- `specialty`: string
- `experience`: string
- `commission`: number
- `isManager`: boolean
- `avatar`: string
- `rating`: number
- `reviews`: array de IDs
- `status`: "active" | "vacation" | "inactive"
- `joinDate`: timestamp
- `servicesIds`: array de IDs
- `availability`: objeto (dias/horários)

---

### 5. `appointments` (coleção)
- `salonId`: ID do salão
- `serviceId`: ID do serviço
- `professionalId`: ID do profissional
- `clientId`: ID do cliente
- `date`: data
- `time`: hora
- `status`: "pending" | "confirmed" | "canceled" | "finished"
- `price`: number
- `notes`: string
- `createdAt`: timestamp
- `rating`: number (opcional, após atendimento)
- `review`: string (opcional)

---

### 6. `reviews` (coleção)
- `appointmentId`: ID do agendamento
- `clientId`: ID do cliente
- `professionalId`: ID do profissional
- `salonId`: ID do salão
- `serviceId`: ID do serviço
- `rating`: number
- `comment`: string
- `createdAt`: timestamp
- `response`: string (resposta do profissional/salão)
- `tags`: array de strings

---

### 7. `reports` (coleção ou subcoleção em `salons`)
- Relatórios agregados (pode ser gerado sob demanda, não precisa persistir tudo)

---

### 8. 🔔 Notificações
- Pode ser subcoleção em `users` ou via Firebase Cloud Messaging.

---

## 🔒 Segurança
- Regras do Firestore para garantir que cada perfil só acesse o que pode.

---

## 📝 Observações
- Cada entidade pode ter subcoleções se necessário (ex: `salons/{salonId}/services`).
- Para MVP, pode simplificar e depois normalizar.

---

## 📋 Exemplo de Documento (users)
```json
{
  "uid": "abc123",
  "name": "Maria Silva",
  "email": "maria@email.com",
  "phone": "11999999999",
  "photoURL": "https://...",
  "role": "professional",
  "createdAt": "2024-05-24T12:00:00Z",
  "bio": "Especialista em cortes femininos",
  "specialties": ["Corte", "Coloração"],
  "servicesIds": ["srv1", "srv2"],
  "availability": {
    "monday": ["09:00-12:00", "14:00-18:00"],
    "tuesday": ["09:00-18:00"]
  },
  "rating": 4.8,
  "reviews": ["rev1", "rev2"],
  "salonId": "salon123"
}
```