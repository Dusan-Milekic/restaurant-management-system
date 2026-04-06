import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
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


export { prisma, Login ,GetUser};