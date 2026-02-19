/*
  Warnings:

  - You are about to drop the column `slug` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Drawing` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_userId_fkey";

-- AlterTable
ALTER TABLE "Canvas" ADD COLUMN     "roomId" INTEGER;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "slug",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "Chat";

-- DropTable
DROP TABLE "Drawing";

-- AddForeignKey
ALTER TABLE "Canvas" ADD CONSTRAINT "Canvas_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
