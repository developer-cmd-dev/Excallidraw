/*
  Warnings:

  - Added the required column `userId` to the `Canvas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Canvas" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Canvas" ADD CONSTRAINT "Canvas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
