import { response } from "express";
import {prisma} from "../lib/prisma"



async function main () {
    const user = await prisma.user.create({
        data: {
            username: "dusan20923",
            name: "Dusan",
            lastName: "Milekic",
            password: "test123!",
            token: ""
        }
    });


}


main().then(async () => {
    await prisma.$disconnect();
})
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect();
})

