/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "reservations" ALTER COLUMN "status" SET DEFAULT 'booked';

-- DropTable
DROP TABLE "users";
