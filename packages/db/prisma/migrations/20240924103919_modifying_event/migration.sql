/*
  Warnings:

  - Added the required column `ticketAmount` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('FREE', 'PAID');

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "TicketPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "ticketAmount" INTEGER NOT NULL,
ADD COLUMN     "type" "EventType" NOT NULL;
