# 💅 Projeto Frontend - Estrutura de Pastas

Este README descreve a organização do projeto frontend usando `Next.js (App Router)` para facilitar o entendimento e integração do desenvolvedor backend.

---

## 👤 Telas do Cliente

### 📂 auth
Login e cadastro do cliente.

### 📂 booking
Página onde o usuário **agenda um serviço**, escolhendo o profissional e o serviço desejado.

### 📂 salons
Exibe todos os **salões disponíveis** para agendamento.

### 📂 services
Mostra **profissionais independentes** e seus serviços.

### 📂 appoint
Área onde o cliente **visualiza seus agendamentos**.

### 📂 user
Área do cliente para **editar e gerenciar seus dados pessoais**.

### 📂 reset
Recuperação e redefinição de senha.

---

## 💼 Telas do Profissional

### 📂 about-me
Página de **perfil profissional**, com informações públicas sobre cada profissional.

### 📂 profile
Permite ao profissional **editar seu perfil** (nome, bio, serviços, etc).

### 📂 appoint-pro
Área onde o profissional **visualiza os agendamentos** que recebeu de clientes.

---

## 🛠️ Telas do Administrador / Salão de Beleza

### 📂 admin
Painel **administrativo do salão**, onde o administrador pode gerenciar informações, profissionais e serviços.

### 📂 my-salon
Área para **gerenciar o próprio salão**, incluindo agendamentos, horários e profissionais cadastrados.

### 📂 dashboard
Painel com **métricas, estatísticas e visão geral** das atividades do salão.

### 📂 report
Área para **gerenciar feedbacks ou denúncias** feitas por usuários/profissionais.

---

## 📄 Informações Gerais

### 📂 about-us
Página com **informações sobre os desenvolvedores** e sobre o projeto.

### 📂 help
Página de **ajuda (FAQ)** com respostas para dúvidas comuns.

---

## 🌐 Estrutura Global

- **globals.css**: Estilos globais do projeto.
- **layout.tsx**: Estrutura comum entre páginas (navbar, rodapé, etc).
- **page.tsx**: Página inicial (landing page).

---

## 🧩 Componentes

### 📁 components/
Componentes reutilizáveis em toda a aplicação.

- **ui/**: Componentes visuais genéricos (inputs, botões, cards).
- **footer.tsx / navbar.tsx**: Rodapé e navegação principal do layout.

---

📌 **Observação**: Todo o projeto está organizado com base no App Router do `Next.js 13+`.

