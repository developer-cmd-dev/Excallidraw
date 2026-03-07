# Excallidraw - Collaborative Whiteboard

Excallidraw is a real-time, collaborative whiteboarding application that brings the hand-drawn feel to digital sketching. Built with a modern full-stack architecture, it allows multiple users to draw, share, and collaborate in real-time within persistent rooms.

![App Preview](apps/web/public/FullAppLogo.png)

## 🚀 Key Features

- **Hand-Drawn Aesthetics**: Uses [RoughJS](https://roughjs.com/) to give sketches a natural, hand-drawn look.
- **Real-time Collaboration**: Live drawing updates and cursor tracking for all users in a room using WebSockets.
- **Room Management**: Create private drawing rooms or join existing ones with unique codes.
- **Persistent Storage**: All drawings are saved to a PostgreSQL database via Prisma ORM.
- **Multi-Shape Support**: Draw rectangles, ellipses, and lines with ease.
- **Undo/Redo**: Robust state management for correcting mistakes during sketching.
- **Secure Authentication**: Supports both traditional Email/Password login and Google OAuth via NextAuth.
- **Optimized Performance**: Redis caching for fast data retrieval and debounced database updates for smooth drawing persistence.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Canvas Rendering**: [RoughJS](https://roughjs.com/)
- **State Management**: [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **HTTP API**: [Express](https://expressjs.com/)
- **WebSocket Server**: [ws](https://github.com/websockets/ws)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Caching**: [Redis](https://redis.io/)
- **Validation**: [Zod](https://zod.dev/)

### Monorepo Tools
- **Build System**: [Turborepo](https://turbo.build/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 📂 Project Structure

```text
├── apps/
│   ├── web/             # Next.js frontend application
│   ├── http-backend/     # Express HTTP server (Auth, CRUD)
│   └── ws-backend/       # WebSocket server (Real-time events)
├── packages/
│   ├── db/              # Shared Prisma schema and client
│   ├── common/          # Shared Zod schemas and TypeScript types
│   ├── backend-common/   # Shared backend utilities (Redis, Config)
│   ├── ui/              # Shared React component library
│   ├── eslint-config/   # Shared ESLint configurations
│   └── typescript-config/# Shared TSConfig files
```

## ⚙️ Getting Started

### Prerequisites

- **Node.js**: v18 or later
- **pnpm**: `npm install -g pnpm`
- **PostgreSQL**: Local or hosted instance
- **Redis**: Local or hosted instance

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd excallidraw
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create `.env` files in the respective directories based on your environment.

   **Root / Backend (`apps/http-backend/.env` & `apps/ws-backend/.env`):**
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/excallidraw"
   JWT_SECRET="your_jwt_secret"
   REDIS_URL="redis://localhost:6379"
   ```

   **Frontend (`apps/web/.env`):**
   ```env
   NEXT_BACKEND_URL="http://localhost:3001"
   NEXTAUTH_SECRET="your_nextauth_secret"
   NEXT_GOOGLE_CLIENT_ID="your_google_client_id"
   NEXT_GOOGLE_CLIENT_SECRET="your_google_client_secret"
   ```

4. Generate Prisma Client:
   ```bash
   pnpm run generate --filter=@repo/db
   ```

5. Push Database Schema:
   ```bash
   cd packages/db
   npx prisma db push
   ```

### Running the Project

To start all services (web, http-backend, ws-backend) in development mode:

```bash
pnpm run dev
```

- **Web Frontend**: [http://localhost:3000](http://localhost:3000)
- **HTTP Backend**: [http://localhost:3001](http://localhost:3001)
- **WS Backend**: `ws://localhost:8080`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.
