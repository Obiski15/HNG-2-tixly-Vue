# Tixly - Vue Edition

Modern ticket management made simple and efficient. Built with Vue 3, TypeScript, and Vite.

## 🚀 Tech Stack

- **Framework**: Vue 3 with TypeScript
- **Build Tool**: Vite
- **Routing**: Vue Router v4
- **Styling**: Tailwind CSS
- **Form Validation**: Zod schemas

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ installed
- pnpm, npm, or yarn package manager
- [server/README.md on GitHub](https://github.com/Obiski15/HNG-2-tixly-Backend-Server/blob/main/README.md)

### Installation

1. **Install dependencies:**

```bash
pnpm install
# or
npm install
# or
yarn install
```

2. **Configure environment:**

Create a `.env` file:

```env
API_BASE_URL = "http://localhost:4000";
```

3. **Start the backend server:**

Make sure the backend API is running on port 4000:

```bash
cd ../server
pnpm dev
```

4. **Start development server:**

```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

## 🎯 Key Features

- ✅ User authentication (signup/login/logout)
- ✅ Dashboard with ticket statistics
- ✅ Full CRUD operations for tickets
- ✅ Real-time form validation with Zod
