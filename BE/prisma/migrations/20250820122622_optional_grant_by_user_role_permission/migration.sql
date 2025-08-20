-- DropForeignKey
ALTER TABLE "public"."user_permissions" DROP CONSTRAINT "user_permissions_grantedBy_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_roles" DROP CONSTRAINT "user_roles_grantedBy_fkey";

-- AlterTable
ALTER TABLE "public"."user_permissions" ALTER COLUMN "grantedBy" DROP NOT NULL,
ALTER COLUMN "grantedAt" DROP NOT NULL,
ALTER COLUMN "grantedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."user_roles" ALTER COLUMN "grantedBy" DROP NOT NULL,
ALTER COLUMN "grantedAt" DROP NOT NULL,
ALTER COLUMN "grantedAt" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "user_roles_grantedBy_fkey" FOREIGN KEY ("grantedBy") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_permissions" ADD CONSTRAINT "user_permissions_grantedBy_fkey" FOREIGN KEY ("grantedBy") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
