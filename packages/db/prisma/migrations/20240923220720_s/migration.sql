/*
  Warnings:

  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_event_id_fkey";

-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_uid_fkey";

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "profiles";

-- CreateTable
CREATE TABLE "_CommunityToMember" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CommunityToMember_AB_unique" ON "_CommunityToMember"("A", "B");

-- CreateIndex
CREATE INDEX "_CommunityToMember_B_index" ON "_CommunityToMember"("B");

-- AddForeignKey
ALTER TABLE "_CommunityToMember" ADD CONSTRAINT "_CommunityToMember_A_fkey" FOREIGN KEY ("A") REFERENCES "communities"("community_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommunityToMember" ADD CONSTRAINT "_CommunityToMember_B_fkey" FOREIGN KEY ("B") REFERENCES "Member"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
