import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Invoice, InvoiceItem, PrismaClient, Table } from "../generated/prisma/client";
import { Pool } from "pg";
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'


dotenv.config({ path: '../.env' })


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });


async function Login(username: string, password: string) {
  const user = await prisma.user.findFirst({
    where: { username, password },
  });

  if (!user) 
    return { message: "Wrong username or password" };



    const secret_key = process.env.SECRET_KEY;
    const payload = { username: username };
    const token = jwt.sign(payload, secret_key!, { expiresIn: '12h' });

    await prisma.user.update({
        where: {username: username},
        data: {token: token}
    })

    return { message: "Login successful you got a token expires in 12h", token: token };
}



async function GetUser(token:string) {
    const user = await prisma.user.findFirst({
        where: {token: token}
    })
    return user
}

async function GetMeni() {
  return await prisma.meni.findMany({
    include: {
      kategorija: true
    }
  })
}

async function CreateInvoice(tableId: number, items: { naziv: string, cena: number, kolicina: number }[]) {
  const amount = items.reduce((sum, item) => sum + item.cena * item.kolicina, 0)
  const tax = Math.round(amount * 0.1)
  const total = amount + tax

  return await prisma.invoice.create({
    data: {
      amount,
      tax,
      total,
      tableId,
      items: {
        create: items.map(item => ({
          naziv: item.naziv,
          cena: item.cena,
          kolicina: item.kolicina,
        }))
      }
    },
    include: {
      items: true
    }
  })
}

async function CreateReservation(tableId: number, nameReserved: string, date: Date) {
  return await prisma.reservation.create({
    data: {
      tableId,
      nameReserved,
      date,
    },
    include: {
      table: true,
    }
  })
}

async function GetReservations() {
  return await prisma.reservation.findMany({
    include: {
      table: true,
    },
    orderBy: {
      date: "asc"
    }
  })
}

async function GetTodayStats() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const tomorrow = new Date()
  tomorrow.setHours(23, 59, 59, 999)

  const invoices = await prisma.invoice.findMany({
    where: {
      createdAt: {
        gte: today,
        lte: tomorrow,
      }
    },
    include: {
      table: true,
      items: true,
    }
  })

  const total = invoices.reduce((sum, i) => sum + i.total, 0)
  const count = invoices.length

  return { invoices, total, count }
}

async function GetPeriodicalStats(from: Date, to: Date) {
  const invoices = await prisma.invoice.findMany({
    where: {
      createdAt: {
        gte: from,
        lte: to,
      }
    },
    include: {
      table: true,
      items: true,
    }
  })

  const total = invoices.reduce((sum, i) => sum + i.total, 0)
  const count = invoices.length

  return { invoices, total, count }
}

export { prisma, Login ,GetUser,GetMeni,CreateInvoice,CreateReservation,GetReservations,GetTodayStats,GetPeriodicalStats};
