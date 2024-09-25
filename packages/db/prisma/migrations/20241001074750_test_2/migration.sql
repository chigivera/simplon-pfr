-- DropForeignKey
ALTER TABLE "communities" DROP CONSTRAINT "communities_uid_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_uid_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_uid_fkey";

-- AddForeignKey
ALTER TABLE "communities" ADD CONSTRAINT "communities_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
