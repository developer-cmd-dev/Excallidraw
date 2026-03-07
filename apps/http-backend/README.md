# Excallidraw - HTTP Backend

This is the Express.js HTTP backend server for Excallidraw, handling authentication, user management, and room data.

## 🌟 Overview

The HTTP backend provides the core RESTful API for the Excallidraw platform. It manages user registration, authentication (including Google OAuth), room creation, and persistent storage of drawing data.

## 🚀 Key Technologies

- **Framework**: [Express](https://expressjs.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Caching**: [Redis](https://redis.io/)
- **Auth**: [JWT](https://jwt.io/) & [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- **Validation**: [Zod](https://zod.dev/)

## 🛠️ Configuration

Configure the `.env` file with the following variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/excallidraw"
JWT_SECRET="your_jwt_secret"
REDIS_URL="redis://localhost:6379"
```

## 🏃 Getting Started

To run the HTTP backend:

```bash
pnpm run dev --filter=http-backend
```

The server will be available at [http://localhost:3001](http://localhost:3001).

---

For full setup instructions, please refer to the [Root README.md](../../README.md).
