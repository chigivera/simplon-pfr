/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `communities` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "communities_uid_key" ON "communities"("uid");
