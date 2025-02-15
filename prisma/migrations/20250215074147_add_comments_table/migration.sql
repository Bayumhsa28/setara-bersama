-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "role" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "account_story_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);
