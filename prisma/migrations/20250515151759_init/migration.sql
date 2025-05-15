/*
  Warnings:

  - A unique constraint covering the columns `[idLojista]` on the table `Loja` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Loja_idLojista_key" ON "Loja"("idLojista");
