/*
  Warnings:

  - You are about to drop the column `duration` on the `Share` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Share` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `durationSeconds` to the `Share` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Share" DROP COLUMN "duration",
ADD COLUMN     "durationSeconds" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Share_code_key" ON "Share"("code");
