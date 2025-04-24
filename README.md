# 📚 Library (em desenvolvimento)

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

> Pré-requisitos: Docker, Java 23 e Node.js instalados

#### Banco de dados

```bash
docker-compose up --build
```
#### Backend

```bash
cd libraryAPI/backend
./mvnw spring-boot:run
```

#### Frontend

```bash
cd libraryAPI\frontend\library
npm install
npm run dev
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

#### Frontend

```bash
cd libraryAPI\frontend\library
npm install
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)

---
## 📡 Endpoints

### 🔐 Autenticação

| Método | Endpoint           | Descrição                   |
|--------|--------------------|-----------------------------|
| **POST** | `/auth/register`   | Criação de um usuário       |
| **POST** | `/auth/login`      | Login de um usuário         |

---

### 📘 Livros

| Método | Endpoint           | Descrição                           |
|--------|--------------------|-------------------------------------|
| **POST** | `/livros`          | Cria um livro                       |
| **GET**  | `/livros/{id}`     | Retorna um livro pelo ID            |
| **GET**  | `/livros`          | Lista todos os livros com filtros   |
| **PUT**  | `/livro/{id}`      | Atualiza um livro pelo ID           |
| **DELETE** | `/livros/{id}`   | Deleta um livro pelo ID             |

---

### ✍️ Autores

| Método | Endpoint           | Descrição                            |
|--------|--------------------|--------------------------------------|
| **POST** | `/autores`         | Cria um autor                        |
| **GET**  | `/autores/{id}`    | Retorna um autor pelo ID             |
| **GET**  | `/autores`         | Lista todos os autores com filtros   |
| **PUT**  | `/autores/{id}`    | Atualiza um autor pelo ID            |
| **DELETE** | `/autores/{id}`  | Deleta um autor pelo ID              |

---

### 👥 Usuários

| Método | Endpoint                | Descrição                             |
|--------|-------------------------|---------------------------------------|
| **GET**  | `/usuarios`              | Lista todos os usuários com filtros   |
| **POST** | `/usuarios/addRole`     | Adiciona uma role ao usuário          |
| **DELETE** | `/usuarios/remRole`   | Remove uma role do usuário            |

---

### 🛡️ Cargos (Roles)

| Método | Endpoint      | Descrição                                     |
|--------|---------------|-----------------------------------------------|
| **POST** | `/roles`      | Cria uma role                                |
| **GET**  | `/roles`      | Lista todas as roles                         |
| **PUT**  | `/roles`      | Atualiza uma role com base no nome           |
| **DELETE** | `/roles`    | Deleta uma role com base no nome             |

---

### 🔧 Authorities

| Método | Endpoint     | Descrição                      |
|--------|--------------|--------------------------------|
| **GET**  | `/authority` | Lista todas as authorities     |

---

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
