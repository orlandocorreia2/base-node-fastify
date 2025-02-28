-- CreateTable
CREATE TABLE "UsersPermissionGroups" (
    "userId" TEXT NOT NULL,
    "permissionGroupId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "permissionGroupId")
);
