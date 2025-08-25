-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "last_reset_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
