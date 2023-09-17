/*
  Warnings:

  - You are about to drop the column `location` on the `Conversion` table. All the data in the column will be lost.
  - Added the required column `fileLocation` to the `Conversion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Conversion" DROP COLUMN "location",
ADD COLUMN     "fileLocation" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT concat('cnv_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Tenant" ALTER COLUMN "id" SET DEFAULT concat('tnt_', replace(cast(gen_random_uuid() as text), '-', '')),
ALTER COLUMN "inviteKey" SET DEFAULT concat('inv_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT concat('usr_', replace(cast(gen_random_uuid() as text), '-', ''));
