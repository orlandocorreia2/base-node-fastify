-- CreateEnum
CREATE TYPE "PermissionRuleType" AS ENUM ('permissionGroup', 'user');

-- CreateTable
CREATE TABLE "permission_rules" (
    "id" TEXT NOT NULL,
    "rule" TEXT NOT NULL,
    "type" "PermissionRuleType" NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "permission_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permission_groups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "permission_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permission_group_rules" (
    "permission_group_id" TEXT NOT NULL,
    "permission_rule_id" TEXT NOT NULL,

    CONSTRAINT "permission_group_rules_pkey" PRIMARY KEY ("permission_group_id","permission_rule_id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiredAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_permission_groups" (
    "user_id" TEXT NOT NULL,
    "permission_group_id" TEXT NOT NULL,

    CONSTRAINT "users_permission_groups_pkey" PRIMARY KEY ("user_id","permission_group_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "permission_rules_rule_key" ON "permission_rules"("rule");

-- CreateIndex
CREATE UNIQUE INDEX "permission_groups_name_key" ON "permission_groups"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "permission_group_rules" ADD CONSTRAINT "permission_group_rules_permission_group_id_fkey" FOREIGN KEY ("permission_group_id") REFERENCES "permission_groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "permission_group_rules" ADD CONSTRAINT "permission_group_rules_permission_rule_id_fkey" FOREIGN KEY ("permission_rule_id") REFERENCES "permission_rules"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users_permission_groups" ADD CONSTRAINT "users_permission_groups_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users_permission_groups" ADD CONSTRAINT "users_permission_groups_permission_group_id_fkey" FOREIGN KEY ("permission_group_id") REFERENCES "permission_groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
