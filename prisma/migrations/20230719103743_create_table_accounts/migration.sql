/*
  Warnings:

  - Made the column `updated_by` on table `accounts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `accounts` MODIFY `updated_by` INTEGER NOT NULL;
