# InkOS --- Collaborative Whiteboard

InkOS is a full-stack, real-time collaborative whiteboarding application
with a hand-drawn sketching experience. Users can create projects and
team workspaces, draw together on an infinite canvas, and see
collaborators' cursors and updates live.

```{=html}
<p align="center">
```
`<img src="docs/screenshots/landing-page.png" alt="InkOS landing page" width="100%" />`{=html}
```{=html}
</p>
```
## ✨ Features

-   **Hand-drawn canvas** --- Sketch rectangles, ellipses, lines,
    diamonds, and arrows with a natural RoughJS style.
-   **Real-time collaboration** --- Drawing events are synchronized
    between connected users through WebSockets.
-   **Live cursor presence** --- See collaborators' cursor positions and
    identities while working together.
-   **Projects and workspaces** --- Create personal projects, create
    team workspaces, or join an existing team.
-   **Persistent drawings** --- Canvas elements are stored in PostgreSQL
    through Prisma ORM.
-   **Authentication** --- Email/password authentication and Google
    OAuth support.
-   **Fast shared state** --- Redis caching and debounced persistence
    help keep collaboration responsive.
-   **Monorepo architecture** --- Frontend, HTTP API, WebSocket server,
    database package, and shared packages are managed together with
    Turborepo and pnpm.

## 📸 Screenshots

### Landing Page

A responsive product landing page introducing InkOS and its
collaborative drawing experience.

![Landing Page](docs/screenshots/landing-page.png)

### Product Features

The feature section highlights the hand-drawn experience, real-time
collaboration, and performance-focused canvas.

![Features Section](docs/screenshots/features-section.png)

### Project Dashboard

Create blank projects, create or join teams, search projects, and manage
existing workspaces from one dashboard.

![Dashboard](docs/screenshots/dashboard.png)

### Drawing Canvas

The canvas provides a focused dark workspace with quick access to shape
and drawing tools.

![Drawing Canvas](docs/screenshots/drawing-canvas.png)

### Workspace Creation

Create collaborative team workspaces directly from the dashboard.

```{=html}
<p align="center">
```
`<img src="docs/screenshots/create-workspace.png" alt="Create workspace dialog" width="520" />`{=html}
```{=html}
</p>
```
### Real-Time Collaboration

Multiple users can work on the same canvas while seeing synchronized
drawings and live collaborator cursors.

![Real-Time Collaboration](docs/screenshots/realtime-collaboration.png)

## 🛠️ Tech Stack

### Frontend

-   **Framework:** Next.js 16 with App Router
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS 4
-   **Canvas Rendering:** RoughJS
-   **State Management:** Zustand
-   **Authentication:** NextAuth.js
-   **Icons:** Lucide React

### Backend

-   **HTTP API:** Express
-   **Real-Time Server:** `ws` WebSocket library
-   **Database:** PostgreSQL
-   **ORM:** Prisma
-   **Caching:** Redis
-   **Validation:** Zod

### Monorepo

-   **Build System:** Turborepo
-   **Package Manager:** pnpm

## 🏗️ Architecture

``` text
Browser (Next.js)
   │
   ├── HTTP requests ───────► Express API
   │                              │
   │                              ├──► PostgreSQL / Prisma
   │                              └──► Redis
   │
   └── WebSocket connection ► WebSocket Server
                                  │
                                  ├──► Real-time drawing events
                                  ├──► Cursor presence
                                  └──► Room collaboration
```

## 📂 Project Structure

``` text
.
├── apps/
│   ├── web/                 # Next.js frontend application
│   ├── http-backend/        # Express HTTP API (auth and CRUD)
│   └── ws-backend/          # WebSocket server (real-time events)
│
├── packages/
│   ├── db/                  # Shared Prisma schema and database client
│   ├── common/              # Shared Zod schemas and TypeScript types
│   ├── backend-common/      # Shared backend utilities, Redis and config
│   ├── ui/                  # Shared React component library
│   ├── eslint-config/       # Shared ESLint configuration
│   └── typescript-config/   # Shared TypeScript configuration
│
├── docs/
│   └── screenshots/         # README screenshots
│
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## ⚙️ Getting Started

### Prerequisites

Make sure the following are installed and available:

-   Node.js 18 or later
-   pnpm
-   PostgreSQL
-   Redis

### 1. Clone the repository

``` bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install dependencies

``` bash
pnpm install
```

### 3. Configure environment variables

Create the required `.env` files for the backend services.

#### `apps/http-backend/.env`

``` env
DATABASE_URL="postgresql://user:password@localhost:5432/inkos"
JWT_SECRET="replace_with_a_secure_secret"
REDIS_URL="redis://localhost:6379"
```

#### `apps/ws-backend/.env`

``` env
DATABASE_URL="postgresql://user:password@localhost:5432/inkos"
JWT_SECRET="replace_with_a_secure_secret"
REDIS_URL="redis://localhost:6379"
```

#### `apps/web/.env`

``` env
NEXT_BACKEND_URL="http://localhost:3001"
NEXTAUTH_SECRET="replace_with_a_secure_secret"
NEXT_GOOGLE_CLIENT_ID="your_google_client_id"
NEXT_GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

> Environment variable names should match the names used by your
> application code. Update this example if your current configuration
> uses different names or public client-side variables.

### 4. Generate the Prisma client

``` bash
pnpm run generate --filter=@repo/db
```

### 5. Apply the database schema

``` bash
cd packages/db
pnpm exec prisma db push
cd ../..
```

### 6. Start development services

``` bash
pnpm run dev
```

Default local services:

  Service            Address
  ------------------ -------------------------
  Web application    `http://localhost:3000`
  HTTP API           `http://localhost:3001`
  WebSocket server   `ws://localhost:8080`

## 🔄 Collaboration Flow

1.  A user opens or joins a collaborative workspace.
2.  The browser establishes a WebSocket connection with the real-time
    server.
3.  Drawing operations are sent as events to the server.
4.  The server broadcasts updates to other users connected to the same
    room.
5.  Cursor positions are synchronized separately for live presence.
6.  Drawing state is persisted so the canvas can be restored later.

## 🗺️ Roadmap

-   Text tool and richer canvas editing
-   Selection, resize, move, and delete tools
-   Improved undo/redo history
-   Export canvas as PNG or SVG
-   Workspace roles and permissions
-   Shareable invitation links
-   Better mobile and tablet support
-   Deployment documentation and Docker-based local setup

## 🤝 Contributing

Contributions are welcome. Fork the repository, create a feature branch,
make your changes, and open a pull request with a clear description of
the improvement.

## 📄 License

This project is licensed under the ISC License.
