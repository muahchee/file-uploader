/*
  Warnings:

  - You are about to drop the column `uploadedTime` on the `File` table. All the data in the column will be lost.
  - Added the required column `uploadedAt` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "uploadedTime",
ADD COLUMN     "uploadedAt" TIMESTAMP(3) NOT NULL;
