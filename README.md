# 📚 Library

Aplicação **fullstack** para gerenciamento de uma livraria, com autenticação segura via **JWT**, controle dinâmico de cargos e authorities, e funcionalidades completas para livros e autores.

---

## 🚀 Tecnologias Utilizadas

### 🔧 Backend

- Java 23
- Spring Boot
- Spring Security + JWT
- Spring Data JPA
- Banco de dados: MySQL

### 🎨 Frontend

- React
- Tailwind CSS
- Axios (com suporte a JWT)

---

## ⚙️ Funcionalidades

### 🔐 Autenticação & Autorização

- Registro e login de usuários com token JWT
- Sistema de cargos e permissões dinâmico
- Cargos principais:
  - **SUPER_ADMIN**: acesso total e authorities imutáveis
  - **USER**: apenas visualização de livros e autores

### 📘 Gestão de Livros

- **CRUD completo**
- Filtros por:
  - ISBN
  - Título
  - Nome do Autor
  - Gênero
  - Ano de Publicação

### ✍️ Gestão de Autores

- **CRUD completo**
- Filtros por:
  - Nome
  - Nacionalidade

### 👤 Gestão de Usuários

- Visualizar todos os usuários
  - Filtros por nome e cargo
- Atribuir e remover cargos

### 🛡️ Gestão de Cargos

- Criar e excluir **cargos personalizados**
- Gerenciar **authorities** (permissões) de cada cargo
- **SUPER_ADMIN** é imutável e não pode ser alterado
- Exemplo: criar o cargo **GERENTE** com acesso total a livros e apenas visualização de autores

---

### 👥 Usuários de Teste

#### Para acessar rapidamente o sistema com diferentes níveis de permissão:`

- 👑 SUPER_ADMIN

  - login: SUPER_ADMIN
  - senha: admin

- 👤 USER
  - login: user
  - senha: user

---

## ▶️ Como Rodar o Projeto

### ⚙️ Opção 1: Com Docker Compose

> Pré-requisitos: Docker

#### Banco de dados

```bash
docker-compose up --build
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:8080](http://localhost:8080)

---

### 🖥️ Opção 2: Manualmente (sem Docker)

> Pré-requisitos: Java 23, Node.js, MySQL

#### Backend

```bash
cd libraryAPI/backend
# Configure o application.properties com as credenciais do banco
./mvnw spring-boot:run
```

- Backend: [http://localhost:8080](http://localhost:8080)

#### Frontend

```bash
cd libraryAPI\frontend\library
npm install
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)

---

## 📡 Endpoints

Para acessar a documentação completa das rotas da API, execute o projeto e acesse:

👉 [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)


## 🔑 Armazenamento do Token JWT

- O token JWT é **armazenado no `localStorage`**
- Enviado automaticamente no header:
  ```http
  Authorization: Bearer <token>
  ```

---

## 📌 Observações

- Interface moderna e responsiva com Tailwind CSS
- Acesso controlado por authorities dinâmicas
- O cargo SUPER_ADMIN tem privilégios fixos e inalteráveis

---

## 📄 Desenvolvido por:

### Carlos Serafim

[Linkedin](https://www.linkedin.com/in/carlos-serafim-951049306/)
