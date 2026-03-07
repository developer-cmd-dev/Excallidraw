# Excallidraw - Web Frontend

This is the Next.js frontend application for Excallidraw, a collaborative whiteboard platform.

## 🌟 Overview

The web application provides the user interface for sketching, room management, and real-time collaboration. It leverages [RoughJS](https://roughjs.com/) for canvas rendering and [NextAuth.js](https://next-auth.js.org/) for authentication.

## 🚀 Key Technologies

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Canvas Rendering**: [RoughJS](https://roughjs.com/)
- **State Management**: [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🛠️ Configuration

The frontend requires connection to the HTTP and WebSocket backends. Ensure your `.env` file is correctly configured:

```env
NEXT_BACKEND_URL="http://localhost:3001"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXT_GOOGLE_CLIENT_ID="your_google_client_id"
NEXT_GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

## 🏃 Getting Started

To run only the web application (ensure the backends are running):

```bash
pnpm run dev --filter=web
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

For full setup instructions including backend services, please refer to the [Root README.md](../../README.md).
