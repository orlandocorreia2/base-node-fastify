-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UsersPermissionGroups" (
    "userId" TEXT NOT NULL,
    "permissionGroupId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "permissionGroupId"),
    CONSTRAINT "UsersPermissionGroups_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsersPermissionGroups_permissionGroupId_fkey" FOREIGN KEY ("permissionGroupId") REFERENCES "permission_groups" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UsersPermissionGroups" ("permissionGroupId", "userId") SELECT "permissionGroupId", "userId" FROM "UsersPermissionGroups";
DROP TABLE "UsersPermissionGroups";
ALTER TABLE "new_UsersPermissionGroups" RENAME TO "UsersPermissionGroups";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
