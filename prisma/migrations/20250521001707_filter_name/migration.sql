/*
  Warnings:

  - Added the required column `name` to the `user_auction_property_filters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_auction_property_filters" ADD COLUMN     "name" TEXT NOT NULL;
