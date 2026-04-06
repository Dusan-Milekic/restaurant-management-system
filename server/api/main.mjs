import express from 'express'
import pkg from '../generated/prisma/index.js'
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'
import cors from 'cors'

const { PrismaClient } = pkg
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body

  const user = await prisma.user.findFirst({
    where: { username, password }
  })

  if (!user) {
    return res.status(401).json({ error: "User does not exist or wrong password" })
  }

  return res.status(200).json({ message: "Login successful" })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})