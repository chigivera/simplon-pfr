/*
  Warnings:

  - You are about to drop the `Manager` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Manager" DROP CONSTRAINT "Manager_uid_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "stripe_customer_id" TEXT;

-- DropTable
DROP TABLE "Manager";

-- CreateTable
CREATE TABLE "Member" (
    "uid" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Individual" (
    "uid" TEXT NOT NULL,

    CONSTRAINT "Individual_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Organization" (
    "uid" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("uid")
);

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Individual" ADD CONSTRAINT "Individual_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
