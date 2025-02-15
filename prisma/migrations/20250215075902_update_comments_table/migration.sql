/*
  Warnings:

  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Comment";

-- CreateTable
CREATE TABLE "AccountComment" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "account_story_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccountComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AccountComment" ADD CONSTRAINT "AccountComment_account_story_id_fkey" FOREIGN KEY ("account_story_id") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;
