-- CreateTable
CREATE TABLE "user_auction_property_filters" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "filter" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_auction_property_filters_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_auction_property_filters" ADD CONSTRAINT "user_auction_property_filters_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
