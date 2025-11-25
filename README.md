# Blog com Painel Administrativo

Sistema de blog full-stack construído com Next.js 15 e React 19, com painel administrativo protegido por autenticação JWT para gerenciamento completo de posts.

## Funcionalidades

### Área Pública
- 📝 Visualização de posts publicados
- ⭐ Post em destaque na página inicial
- 📄 Páginas individuais para cada post (acessadas por slug)
- 🎨 Renderização de Markdown com suporte a GitHub Flavored Markdown
- 🔒 Sanitização de HTML para prevenir ataques XSS
- 📱 Design responsivo com Tailwind CSS

### Painel Administrativo
- 🔐 Sistema de autenticação JWT com cookies HTTP-only
- ✏️ CRUD completo de posts (Criar, Ler, Atualizar, Deletar)
- 📝 Editor de Markdown com preview ao vivo
- 🖼️ Upload de imagens de capa com validação de tamanho
- ✅ Controle de publicação (publicado/rascunho)
- 🔔 Notificações toast para feedback do usuário
- ✓ Validação de dados com Zod

## Tecnologias

### Core
- **Next.js** 15.3.0 - Framework React com App Router
- **React** 19.0.0 - Biblioteca UI
- **TypeScript** 5 - Tipagem estática

### Banco de Dados
- **SQLite** - Banco de dados file-based
- **Drizzle ORM** 0.44.7 - ORM type-safe
- **better-sqlite3** 12.4.1 - Driver SQLite

### Autenticação & Segurança
- **jose** 6.1.2 - Assinatura e verificação JWT
- **bcryptjs** 3.0.3 - Hash de senhas
- **sanitize-html** 2.17.0 - Sanitização de HTML

### Markdown & Conteúdo
- **react-markdown** 10.1.0 - Renderização de Markdown
- **@uiw/react-md-editor** 4.0.8 - Editor WYSIWYG
- **remark-gfm** 4.0.1 - GitHub Flavored Markdown
- **rehype-sanitize** 6.0.0 - Sanitização HTML

### Utilidades
- **zod** 3.25.76 - Validação de schemas
- **date-fns** 4.1.0 - Formatação de datas
- **react-toastify** 11.0.5 - Notificações toast
- **lucide-react** 0.554.0 - Biblioteca de ícones

### Estilização
- **Tailwind CSS** 4 - Framework CSS utility-first
- **@tailwindcss/typography** 0.5.19 - Plugin para estilização de prosa

## Pré-requisitos

- Node.js 18 ou superior
- npm, yarn, pnpm ou bun

## Configuração Inicial

### 1. Clone e Instale as Dependências

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd blog

# Instale as dependências
npm install
# ou
yarn install
# ou
pnpm install
```

### 2. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Configuração de Upload de Imagens
NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE=921600  # Máximo 900KB
IMAGE_UPLOAD_DIRECTORY=uploads
IMAGE_SERVER_URL='http://localhost:3000/uploads'

# JWT & Autenticação
JWT_SECRET_KEY='sua-chave-secreta-aqui'
LOGIN_EXPIRATION_SECONDS=86400            # 24 horas
LOGIN_EXPIRATION_STRING='1d'
LOGIN_COOKIE_NAME='loginSession'

# Credenciais do Administrador
LOGIN_USER='seu-usuario-admin'
LOGIN_PASS='hash-da-senha-aqui'
ALLOW_LOGIN=1                             # 0=desabilitado, 1=habilitado

# Desenvolvimento (opcional)
SIMULATE_WAIT_IN_MS=0                     # Delay simulado de queries
```

### 3. Gere as Credenciais de Administrador

Execute o script para gerar o JWT_SECRET_KEY e o hash da senha:

```bash
npx tsx src/utils/generate-hashed-password.ts
```

O script irá:
1. Gerar uma chave secreta JWT aleatória
2. Solicitar sua senha desejada
3. Gerar o hash bcrypt da senha
4. Exibir os valores para você adicionar ao `.env`

Copie os valores gerados para as variáveis `JWT_SECRET_KEY` e `LOGIN_PASS` no seu arquivo `.env`.

### 4. Execute as Migrations do Banco de Dados

```bash
npm run db:push
```

Este comando criará o arquivo `db.sqlite3` e aplicará o schema do banco.

### 5. (Opcional) Popule o Banco com Dados de Exemplo

```bash
npm run seed
```

Isso irá popular o banco com alguns posts de exemplo.

## Como Executar

### Modo Desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Build para Produção

```bash
npm run build
npm run start
```

## Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa o linter
- `npm run db:push` - Aplica schema ao banco de dados
- `npm run db:studio` - Abre Drizzle Studio (interface visual do banco)
- `npm run db:generate` - Gera migrations do Drizzle
- `npm run seed` - Popula o banco com dados de exemplo

## Estrutura do Projeto

```
src/
├── app/                    # Pages do Next.js App Router
│   ├── page.tsx           # Homepage (ISR)
│   ├── post/[slug]/       # Páginas de posts (SSG)
│   └── admin/             # Rotas administrativas (Dynamic)
│       ├── login/
│       └── post/
├── actions/               # Server Actions do Next.js
│   ├── login/            # Login e logout
│   ├── post/             # CRUD de posts
│   └── upload/           # Upload de imagens
├── components/           # Componentes React
│   ├── admin/           # Componentes da área admin
│   └── ...              # Componentes públicos
├── lib/                 # Queries e validações
│   ├── post/
│   └── login/
├── repositories/        # Camada de acesso a dados
├── models/             # Definições de tipos
├── dto/                # Data Transfer Objects
├── db/                 # Configuração do banco
│   └── drizzle/
│       ├── schemas.ts  # Schema do banco
│       └── migrations/ # Migrations
├── utils/              # Funções utilitárias
└── middleware.ts       # Middleware JWT do Next.js

public/
└── uploads/            # Imagens enviadas
```

## Rotas Disponíveis

### Rotas Públicas

- `/` - Homepage com post em destaque e lista de posts
- `/post/[slug]` - Página individual do post

### Rotas Administrativas (Protegidas)

- `/admin/login` - Página de login
- `/admin/post` - Lista todos os posts (com opções de editar/deletar)
- `/admin/post/new` - Criar novo post
- `/admin/post/[id]` - Editar post existente

## Estratégias de Rendering

- **Homepage & Listagens**: ISR (Incremental Static Regeneration) - Revalida a cada 60 segundos
- **Posts Individuais**: SSG (Static Site Generation) - Pré-renderizado no build
- **Páginas Admin**: Dynamic - Renderizado no servidor a cada request

## Schema do Banco de Dados

### Tabela: posts

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | string (UUID) | Chave primária |
| slug | string (unique) | URL amigável |
| title | string | Título do post |
| author | string | Nome do autor |
| excerpt | string | Resumo do post |
| content | string | Conteúdo em Markdown |
| coverImageUrl | string | URL da imagem de capa |
| published | boolean | Status de publicação |
| createdAt | string (ISO) | Data de criação |
| updatedAt | string (ISO) | Data de atualização |

## Validações

### Posts

- **Título**: 3-120 caracteres
- **Conteúdo**: Mínimo 3 caracteres (sanitizado)
- **Autor**: 4-100 caracteres
- **Resumo**: 3-200 caracteres
- **Imagem de Capa**: URL válida ou caminho relativo
- **Imagens**: Máximo 900KB (configurável)

## Segurança

- ✅ Autenticação JWT com HTTP-only cookies
- ✅ Senhas hasheadas com bcryptjs
- ✅ Middleware de proteção de rotas admin
- ✅ Sanitização de HTML para prevenir XSS
- ✅ Validação de dados com Zod no servidor
- ✅ Tokens com expiração configurável

## Cache e Otimização

- Cache de posts com tags para revalidação seletiva
- Revalidação automática após create/update/delete
- Request-level deduplication com React `cache()`
- Imagens otimizadas automaticamente pelo Next.js

## Deploy

### Vercel (Recomendado)

O deploy mais fácil é usando a [Vercel Platform](https://vercel.com/new):

1. Faça push do código para GitHub/GitLab/Bitbucket
2. Importe o projeto na Vercel
3. Configure as variáveis de ambiente
4. Deploy!

**Nota**: Para produção com SQLite, considere usar um volume persistente ou migrar para PostgreSQL/MySQL.

### Outras Plataformas

Consulte a [documentação de deploy do Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para outras opções.

## Aprendizado

Este projeto foi desenvolvido durante o curso de React 19 e Next.js 15 do Luiz Otávio Miranda na Udemy.

## Licença

Este projeto é de código aberto e está disponível para fins educacionais.
