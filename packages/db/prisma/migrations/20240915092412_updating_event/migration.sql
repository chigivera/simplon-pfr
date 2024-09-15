/*
  Warnings:

  - You are about to drop the column `end_date` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `events` table. All the data in the column will be lost.
  - Added the required column `date` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "end_date",
DROP COLUMN "start_date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
