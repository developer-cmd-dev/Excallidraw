-- DropForeignKey
ALTER TABLE "Drawing" DROP CONSTRAINT "Drawing_canvasId_fkey";

-- AlterTable
ALTER TABLE "Canvas" ADD COLUMN     "drawing" TEXT[];
