/*
  Warnings:

  - Added the required column `acceptTerms` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "acceptTerms" BOOLEAN NOT NULL,
ADD COLUMN     "emailConfirmed" BOOLEAN NOT NULL DEFAULT false;
