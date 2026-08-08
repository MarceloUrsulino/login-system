# Login System

API REST de autenticação construída com Node.js, Express e Sequelize (MySQL). Implementa cadastro, login e redefinição de senha, com hashing de senhas via bcrypt e autenticação via JWT.

## Tecnologias

Node.js · Express · Sequelize · MySQL · bcrypt · JWT

## Como rodar

```bash
git clone https://github.com/MarceloUrsulino/login-system.git
cd login-system/backend
npm install
```

Configure um `.env` com as credenciais do MySQL e uma chave JWT (`DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `JWT_SECRET`), crie o banco e inicie:

```bash
npm run dev
```

## Endpoints

| Método | Rota                  | Descrição                          | Protegida |
|--------|------------------------|--------------------------------------|-----------|
| POST   | `/user/register`      | Cadastra um novo usuário            | Não       |
| POST   | `/user/login`         | Autentica e retorna um token JWT    | Não       |
| POST   | `/user/resetpassword` | Redefine a senha do usuário logado  | Sim       |

**Exemplo — Login**

```json
// Request
POST /user/login
{
  "email": "marcelo@example.com",
  "password": "senha123"
}

// Response 200
{
  "message": "Você está conectado",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "userId": 1
}
```

**Exemplo — Redefinir senha** (requer header `Authorization: Bearer <token>`)

```json
// Request
POST /user/resetpassword
{
  "newPassword": "novaSenha456"
}

// Response 200
{
  "message": "Nova senha atualizada com sucesso"
}
```

## Segurança

- Senhas armazenadas com hash bcrypt (nunca em texto plano)
- Autenticação via JWT, validado em rotas protegidas
- Redefinição de senha identifica o usuário pelo token, não por dado enviado no body
- Validação de força de senha (mínimo 6 caracteres + 1 número)

## Autor

**Marcelo Ursulino** — [GitHub](https://github.com/MarceloUrsulino)
