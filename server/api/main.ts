import express from "express";
import "dotenv/config";
import cors from "cors";
import { Login ,GetUser,GetMeni, prisma, CreateInvoice,CreateReservation,GetReservations} from "../lib/prisma";
import { table } from "node:console";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/api/login", async (req, res) => {
  const message = await Login(req.body.username, req.body.password); // ← await
  return res.json(message);
});

// main.ts
app.post("/api/user", async (req, res) => {
  const user = await GetUser(req.body.token)
  if (!user) return res.status(401).json({ message: "Invalid token" })
  return res.json({username: user.username, name: user.name, lastName: user.lastName})
})

app.get("/api/meni", async (req, res) => {
  try {
    const meni = await GetMeni()
    return res.json({ meni })
  } catch (e) {
    return res.status(500).json({ message: "Greška na serveru" })
  }
})

app.get("/api/tables", async (req, res) => {
  try {
    const tables = await prisma.table.findMany()
    return res.json({ tables })
  } catch (e) {
    return res.status(500).json({ message: "Server error" })
  }
})

app.put("/api/tables/layout", async (req, res) => {
  try {
    const { tables } = req.body
    await Promise.all(
      tables.map((t: { id: number; x: number; y: number }) =>
        prisma.table.update({
          where: { id: t.id },
          data: { x: t.x, y: t.y },
        })
      )
    )
    return res.json({ message: "Layout saved!" })
  } catch (e) {
    return res.status(500).json({ message: "Server error" })
  }
})

app.post("/api/payment", async (req, res) => {
  try {
    const { tableId, items } = req.body

    if (!tableId || !items || items.length === 0) {
      return res.status(400).json({ message: "tableId i items su obavezni" })
    }

    const invoice = await CreateInvoice(tableId, items)
    return res.json({ invoice })
  } catch (e) {
    return res.status(500).json({ message: "Server error" })
  }
})
app.get("/api/invoices", async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        table: true,
        items: true,
      },
      orderBy: {
        createdAt: "desc"
      }
    })
    return res.json({ invoices })
  } catch (e) {
    return res.status(500).json({ message: "Server error" })
  }
})

app.post("/api/reservations", async (req, res) => {
  try {
    const { tableId, nameReserved, date } = req.body
    const reservation = await CreateReservation(tableId, nameReserved, new Date(date))
    return res.json({ reservation })
  } catch (e) {
    return res.status(500).json({ message: "Server error" })
  }
})

app.get("/api/reservations", async (req, res) => {
  try {
    const reservations = await GetReservations()
    return res.json({ reservations })
  } catch (e) {
    return res.status(500).json({ message: "Server error" })
  }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});