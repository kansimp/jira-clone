/*
  Warnings:

  - You are about to drop the `audit_logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notifications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role_permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `task_attachments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `task_comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `task_dependencies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tasks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_info` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."notifications" DROP CONSTRAINT "notifications_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."project_users" DROP CONSTRAINT "project_users_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."project_users" DROP CONSTRAINT "project_users_roleInProjectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."project_users" DROP CONSTRAINT "project_users_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."role_permissions" DROP CONSTRAINT "role_permissions_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."role_permissions" DROP CONSTRAINT "role_permissions_roleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."task_attachments" DROP CONSTRAINT "task_attachments_taskId_fkey";

-- DropForeignKey
ALTER TABLE "public"."task_attachments" DROP CONSTRAINT "task_attachments_uploadedBy_fkey";

-- DropForeignKey
ALTER TABLE "public"."task_comments" DROP CONSTRAINT "task_comments_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."task_comments" DROP CONSTRAINT "task_comments_taskId_fkey";

-- DropForeignKey
ALTER TABLE "public"."task_dependencies" DROP CONSTRAINT "task_dependencies_dependentTaskId_fkey";

-- DropForeignKey
ALTER TABLE "public"."task_dependencies" DROP CONSTRAINT "task_dependencies_requiredTaskId_fkey";

-- DropForeignKey
ALTER TABLE "public"."tasks" DROP CONSTRAINT "tasks_assigneeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."tasks" DROP CONSTRAINT "tasks_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."tasks" DROP CONSTRAINT "tasks_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_info" DROP CONSTRAINT "user_info_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_roles" DROP CONSTRAINT "user_roles_roleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_roles" DROP CONSTRAINT "user_roles_userId_fkey";

-- DropTable
DROP TABLE "public"."audit_logs";

-- DropTable
DROP TABLE "public"."notifications";

-- DropTable
DROP TABLE "public"."permissions";

-- DropTable
DROP TABLE "public"."project_users";

-- DropTable
DROP TABLE "public"."projects";

-- DropTable
DROP TABLE "public"."role_permissions";

-- DropTable
DROP TABLE "public"."roles";

-- DropTable
DROP TABLE "public"."task_attachments";

-- DropTable
DROP TABLE "public"."task_comments";

-- DropTable
DROP TABLE "public"."task_dependencies";

-- DropTable
DROP TABLE "public"."tasks";

-- DropTable
DROP TABLE "public"."user_info";

-- DropTable
DROP TABLE "public"."user_roles";

-- DropTable
DROP TABLE "public"."users";

-- DropEnum
DROP TYPE "public"."ProjectStatus";

-- DropEnum
DROP TYPE "public"."TaskPriority";

-- DropEnum
DROP TYPE "public"."TaskStatus";
