/*
  Warnings:

  - You are about to drop the `Spectate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Spectate" DROP CONSTRAINT "Spectate_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Spectate" DROP CONSTRAINT "Spectate_userId_fkey";

-- DropTable
DROP TABLE "Spectate";
