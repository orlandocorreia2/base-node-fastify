-- CreateTable
CREATE TABLE "auction_properties" (
    "id" TEXT NOT NULL,
    "created_by_id" TEXT NOT NULL,
    "number_property" INTEGER NOT NULL,
    "uf" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "appraisal_value" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "sale_method" TEXT NOT NULL,
    "access_link" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "auction_properties_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "auction_properties" ADD CONSTRAINT "auction_properties_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
