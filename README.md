# Texho Service

Projeto backend em Node.js com TypeScript, Express e MongoDB.

## 🚀 Descrição

API REST para gerenciamento de usuários (`usuario`) usando Mongoose. O projeto segue um padrão MVC leve e já inclui camada de repositório para separar persistência de dados da lógica de controller.

## 🧱 Stack

- Node.js
- TypeScript
- Express
- MongoDB
- Mongoose
- Argon2 (password hashing)
- Swagger/OpenAPI
- ESLint

## 📁 Estrutura principal

```text
src/
├── config/          # Configuração do banco de dados
├── controllers/     # Controllers com lógica de requisição
├── middleware/      # Middlewares e tratamento de erros
├── models/          # Schemas Mongoose e interfaces
├── repositories/    # Repositórios de dados (MongoDB)
├── routes/          # Rotas da API
└── server.ts        # Inicialização do servidor
```

## ⚙️ Instalação

### Pré-requisitos

- Node.js >= 16
- MongoDB acessível via URI

### Comandos

```bash
npm install
npm run dev
```

Para build e produção:

```bash
npm run build
npm start
```

## 🌱 Variáveis de ambiente

Crie um arquivo `.env` na raiz com as variáveis:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/texho_service
API_VERSION=v1
```

## 🧾 Swagger

A documentação Swagger fica disponível em:

```http
GET /api/v1/docs
```

## 📦 Scripts

- `npm run dev` — iniciar servidor em desenvolvimento
- `npm run build` — compilar TypeScript em `dist`
- `npm start` — iniciar servidor compilado
- `npm run lint` — executar ESLint

## 🧭 Endpoints

### Health

```http
GET /health
```

### Login

#### Realizar login com email e senha

```http
POST /api/v1/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "senha": "123456"
}
```

**Resposta de sucesso (200):**
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "_id": "...",
    "usua_uuid": "...",
    "usua_email": "usuario@example.com",
    "usua_criado": "...",
    "usua_atualizado": "..."
  }
}
```

**Resposta de erro (401):**
```json
{
  "success": false,
  "message": "Email ou senha incorretos"
}
```

### Usuários

Base: `/api/v1/usuario`

#### Listar usuários

```http
GET /api/v1/usuario
```

#### Buscar por email

```http
GET /api/v1/usuario/email/:email
```

### Buscar por UUID

```http
GET /api/v1/usuario/uuid/:uuid
```

### Criar usuário

```http
POST /api/v1/usuario
Content-Type: application/json

{
  "email": "usuario@example.com",
  "senha": "123456"
}
```

### Atualizar usuário por UUID

```http
PUT /api/v1/usuario/:uuid
Content-Type: application/json

{
  "email": "novo@example.com",
  "senha": "novaSenha"
}
```

### Deletar usuário por UUID

```http
DELETE /api/v1/usuario/:uuid
```

## 🏛️ Arquitetura

### Model
- `src/models/Usuario.ts`: define o schema Mongoose e campos do usuário.

### Controllers
- `src/controllers/LoginController.ts`: autenticação de usuário (login).
- `src/controllers/UsuarioController.ts`: CRUD de usuários.

### Routes
- `src/routes/loginRoutes.ts`: endpoint de login.
- `src/routes/usuarioRoutes.ts`: endpoints de usuário.

### Repository
- `src/repositories/Repository.ts`: base genérica de persistência.
- `src/repositories/UsuarioRepository.ts`: encapsula operações de usuário com hash de senha.

## ✅ Padrões implementados

- MVC leve
- Camada de repositório para persistência
- Tratamento de erros centralizado
- Tipagem forte com TypeScript
- Configuração de rotas versionadas

## ⚠️ Observações

- `usua_uuid` é gerado automaticamente via UUID v4.
- **Senhas são hasheadas com Argon2** antes de serem armazenadas no banco de dados.
- O campo de senha no schema é `usua_senha`.
- Não retornamos `usua_senha` nas respostas (filtrado com `.select('-usua_senha')`).

## 🔐 Segurança

### Password Hashing
- Senhas são hasheadas usando **Argon2** no momento da criação e atualização.
- Usar `PasswordService.verifyPassword(plainPassword, hash)` para verificar senhas durante autenticação.

Exemplo de uso (para autenticação futura):
```typescript
import { usuarioRepository } from './repositories/UsuarioRepository';

const isValid = await usuarioRepository.verifyPassword('usuario@example.com', 'senha');
```

## 📌 Melhorias futuras

- Adicionar autenticação JWT
- Criar endpoints de login com verificação de senha
- Validar payload com `zod` ou `joi`
- Criar testes automatizados
- Adicionar logging estruturado
- Rate limiting para proteção contra força bruta
