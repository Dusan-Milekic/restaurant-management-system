import { prisma } from "../lib/prisma"


async function main() {
  await prisma.table.createMany({
    data: Array.from({ length: 20 }, (_, i) => {
      const broj = i + 1
      const kapacitet = i % 5 === 0 ? 6 : i % 3 === 0 ? 4 : 2
      const shape = kapacitet >= 6 ? "rect" : kapacitet === 4 ? "square" : "round"
      return {
        broj,
        kapacitet,
        shape,
        x: (i % 5) * 160 + 50,
        y: Math.floor(i / 5) * 160 + 50,
      }
    }),
  })
  console.log("20 tables seeded!")
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })