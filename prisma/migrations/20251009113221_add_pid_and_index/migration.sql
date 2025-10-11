/*
  Warnings:

  - Added the required column `pid` to the `DemoRequest` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DemoRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT,
    "prompt" TEXT NOT NULL,
    "pid" TEXT NOT NULL,
    "previewUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_DemoRequest" ("company", "createdAt", "email", "id", "name", "previewUrl", "prompt") SELECT "company", "createdAt", "email", "id", "name", "previewUrl", "prompt" FROM "DemoRequest";
DROP TABLE "DemoRequest";
ALTER TABLE "new_DemoRequest" RENAME TO "DemoRequest";
CREATE UNIQUE INDEX "DemoRequest_email_key" ON "DemoRequest"("email");
CREATE UNIQUE INDEX "DemoRequest_pid_key" ON "DemoRequest"("pid");
CREATE INDEX "DemoRequest_createdAt_idx" ON "DemoRequest"("createdAt");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
