/*
  Warnings:

  - A unique constraint covering the columns `[number_property]` on the table `auction_properties` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "auction_properties_number_property_key" ON "auction_properties"("number_property");
