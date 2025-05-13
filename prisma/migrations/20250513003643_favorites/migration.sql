-- CreateTable
CREATE TABLE "auction_propertie_user_favorites" (
    "user_id" TEXT NOT NULL,
    "auction_property_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "auction_propertie_user_favorites_user_id_auction_property_i_key" ON "auction_propertie_user_favorites"("user_id", "auction_property_id");

-- AddForeignKey
ALTER TABLE "auction_propertie_user_favorites" ADD CONSTRAINT "auction_propertie_user_favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auction_propertie_user_favorites" ADD CONSTRAINT "auction_propertie_user_favorites_auction_property_id_fkey" FOREIGN KEY ("auction_property_id") REFERENCES "auction_properties"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
