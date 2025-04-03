/*
  Warnings:

  - Added the required column `accept_financing` to the `auction_properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "auction_properties" ADD COLUMN     "accept_financing" BOOLEAN NOT NULL;
