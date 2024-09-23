/*
  Warnings:

  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "tags";

-- CreateTable
CREATE TABLE "Tag" (
    "tag_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("tag_id")
);

-- CreateTable
CREATE TABLE "_CommunityTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CommunityTags_AB_unique" ON "_CommunityTags"("A", "B");

-- CreateIndex
CREATE INDEX "_CommunityTags_B_index" ON "_CommunityTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventTags_AB_unique" ON "_EventTags"("A", "B");

-- CreateIndex
CREATE INDEX "_EventTags_B_index" ON "_EventTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserTags_AB_unique" ON "_UserTags"("A", "B");

-- CreateIndex
CREATE INDEX "_UserTags_B_index" ON "_UserTags"("B");

-- AddForeignKey
ALTER TABLE "_CommunityTags" ADD CONSTRAINT "_CommunityTags_A_fkey" FOREIGN KEY ("A") REFERENCES "communities"("community_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommunityTags" ADD CONSTRAINT "_CommunityTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("tag_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventTags" ADD CONSTRAINT "_EventTags_A_fkey" FOREIGN KEY ("A") REFERENCES "events"("event_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventTags" ADD CONSTRAINT "_EventTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("tag_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTags" ADD CONSTRAINT "_UserTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("tag_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTags" ADD CONSTRAINT "_UserTags_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
