-- CreateEnum
CREATE TYPE "CanvasType" AS ENUM ('PROJECT', 'WORKSPACE');

-- AlterTable
ALTER TABLE "Canvas" ADD COLUMN     "canvasType" "CanvasType" NOT NULL DEFAULT 'PROJECT';
