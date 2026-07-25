# TripNest 🌍
<img width="1906" height="994" alt="Screenshot 2026-07-15 134237" src="https://github.com/user-attachments/assets/536ebb65-e39c-4f28-a676-26c57801da5f" />


A full-stack travel tour discovery and booking platform built with **Next.js**, **Express.js**, **TypeScript**, and **MongoDB**.

**Live Site (Frontend):** [https://tripnest-seven.vercel.app](https://tripnest-seven.vercel.app)
**Live API (Backend):** [https://tripnest-server.vercel.app](https://tripnest-server.vercel.app)

**GitHub Repositories:**
- Frontend: [github.com/WebdeveloperNahid/tripnest](https://github.com/WebdeveloperNahid/tripnest)
- Backend: [github.com/WebdeveloperNahid/tripnest-server](https://github.com/WebdeveloperNahid/tripnest-server)

---

## 📖 About

TripNest is a travel platform where **Admins (travel agencies)** can create and manage tour packages, and **Users (travelers)** can browse, search, filter, and book tours across categories like Beach, Adventure, Hill & Mountain, and Historical destinations.

---

## 🛠️ Tech Stack

### Frontend
- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Icons**
- Hero UI


### Backend
- **Node.js + Express.js** (v5)
- **TypeScript**
- **MongoDB** (native driver)
- **Custom Authentication** — token/session-based middleware (`verifyToken`, `verifyUser`, `verifyAdmin`), backed by `session` and `user` collections

---

## ✨ Features

### Public
- Responsive **Home Page** with Hero section, Categories, Features, Statistics, Testimonials, Newsletter, and FAQ sections
- **Explore Tours** page with:
  - Search bar (title/destination)
  - Filters: Category + Price Range
  - Sorting: Price (low/high), Rating, Newest
  - Pagination
- **Tour Details** page with image gallery, overview, key information, and related tours
- **About** and **Contact** pages

### Authentication
- Login & Registration with validation and error handling
- Demo login (auto-fill credentials)
- Session/token-based authentication with role verification (`user` / `admin`)

### Protected — Admin
- **Add Tour** — create new tour packages
- **Manage Tours** — view, edit, and delete tour packages (ownership-based authorization)

### Protected — User
- **Book Tour** — book an available tour package
- View and manage personal bookings

---

## 🔌 API Endpoints (Backend)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/add-tours` | Admin | Create a new tour |
| GET | `/api/add-tours` | Public | List all tours (search, filter, sort, pagination) |
| GET | `/api/add-tours/latest` | Public | Latest 6 tours (for Home page) |
| GET | `/api/add-tours/:id` | Public | Get tour details by ID |
| GET | `/api/add-tours/user/:userId` | Owner | Get tours created by a specific user |
| PATCH | `/api/add-tours/:id` | Owner | Update a tour |
| DELETE | `/api/add-tours/:id` | Owner | Delete a tour |
| POST | `/api/bookings` | User | Book a tour |
| GET | `/api/bookings/user/:userId` | User | Get a user's bookings |

---

## 🎨 Design System

| Role | Color |
|------|-------|
| Primary | Teal |
| Accent | Coral |
| Neutral | Slate |

Consistent card sizing, border radius, and spacing throughout. Fully responsive across mobile, tablet, and desktop.

---

## 📁 Project Structure

```
tripnest/               → Next.js frontend
  src/
    app/                → Pages (App Router)
    Components/         → Reusable UI components
    lib/                → API helpers, auth utilities
    types/               → TypeScript type definitions

tripnest-server/        → Express.js backend
  index.ts              → Server entry point, routes, MongoDB connection
  middleware/           → verifyToken, verifyUser, verifyAdmin
```

## 🧗 Challenges Faced

This was my **first project built with TypeScript**. I was already comfortable with JavaScript, Express, MongoDB, and authentication concepts from previous projects, so the real challenge was learning TypeScript itself — understanding types, interfaces, generics, and fixing type errors — while still delivering a complete, production-ready full-stack application within the assignment deadline.

Moving from writing loose JavaScript to strict, type-safe TypeScript across both the Next.js frontend and Express backend took some adjustment, but I was able to pick it up steadily and complete the project successfully.

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| User | user@tripnest.com | user1234 |
| Admin | admin@tripnest.com | admin1234 |

---

## 🚀 Getting Started

### Frontend
```bash
git clone https://github.com/WebdeveloperNahid/tripnest.git
cd tripnest
npm install
npm run dev
```

### Backend
```bash
git clone https://github.com/WebdeveloperNahid/tripnest-server.git
cd tripnest-server
npm install
npm run dev
```

### Environment Variables

**tripnest/.env.local**
```
NEXT_PUBLIC_BASE_URL=http://localhost:7000
```

**tripnest-server/.env**
```
MONGO_DB_URI=your_mongodb_connection_string
PORT=7000
```

---

## 📄 License

Built as a TypeScript full-stack assignment project.
