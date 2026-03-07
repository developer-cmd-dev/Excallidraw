# Excallidraw - WebSocket Backend

This is the real-time collaboration server for Excallidraw, built with `ws` to handle real-time drawing updates.

## 🌟 Overview

The WebSocket server facilitates real-time communication between multiple users within the same drawing room. It handles event broadcasting for:
- Live drawing updates (shapes and strokes).
- Cursor movements.
- Room joining and leaving.
- Collaborative state syncing.

## 🚀 Key Technologies

- **Framework**: [ws](https://github.com/websockets/ws)
- **Runtime**: Node.js
- **Auth**: [JWT](https://jwt.io/) (Token-based authentication)

## 🛠️ Configuration

The WebSocket server requires basic configuration:

```env
JWT_SECRET="your_jwt_secret"
PORT=8080
```

*Note: The current configuration defaults to port `8080`.*

## 🏃 Getting Started

To run the WebSocket backend:

```bash
pnpm run dev --filter=ws-backend
```

The WebSocket server will be available at `ws://localhost:8080`.

---

For full setup instructions including backend services, please refer to the [Root README.md](../../README.md).
