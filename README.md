# 🍽️ Restaurant Management System

A full-stack restaurant management system for handling tables, orders, invoices, and reservations.

**Live demo:** https://restaurant-management-system-two-nu.vercel.app

## Demo Credentials

| Username | Password |
|----------|----------|
| dusan20923 | test123! |


## Tech Stack

**Frontend:** React, TypeScript, Tailwind CSS, React Konva, Vite  
**Backend:** Node.js, Express, TypeScript  
**Database:** PostgreSQL, Prisma ORM  
**Deploy:** Vercel (frontend), Railway (backend)

## Features

- **Floor Plan** — interactive table layout with drag & drop, positions saved to database
- **Orders** — add menu items per table with search, persisted in localStorage
- **Invoices** — create, view and print receipts
- **Menu** — 150+ items grouped by category
- **Reservations** — create and manage table reservations
- **Reports** — daily and periodic financial reports

## Getting Started

### Backend
```bash
cd server
npm install
npx prisma migrate dev
npx tsx database/seed.ts
npx tsx database/seedTables.ts
npx tsx api/main.ts
```

### Frontend
```bash
cd client
npm install
npm run dev
```

### Environment Variables

Backend `.env`:
