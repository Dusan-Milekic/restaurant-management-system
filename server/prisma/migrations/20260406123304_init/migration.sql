-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KategorijaMeni" (
    "id" SERIAL NOT NULL,
    "nazivKategorije" TEXT NOT NULL,

    CONSTRAINT "KategorijaMeni_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meni" (
    "id" SERIAL NOT NULL,
    "naziv" TEXT NOT NULL,
    "cena" DOUBLE PRECISION NOT NULL,
    "kategorijaId" INTEGER NOT NULL,

    CONSTRAINT "Meni_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Table" (
    "id" SERIAL NOT NULL,
    "broj" INTEGER NOT NULL,
    "kapacitet" INTEGER NOT NULL,
    "x" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "y" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Table_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Meni" ADD CONSTRAINT "Meni_kategorijaId_fkey" FOREIGN KEY ("kategorijaId") REFERENCES "KategorijaMeni"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
