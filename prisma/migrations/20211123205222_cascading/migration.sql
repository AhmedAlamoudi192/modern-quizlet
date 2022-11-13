-- DropForeignKey
ALTER TABLE "Term" DROP CONSTRAINT "Term_studySetId_fkey";

-- AddForeignKey
ALTER TABLE "Term" ADD CONSTRAINT "Term_studySetId_fkey" FOREIGN KEY ("studySetId") REFERENCES "StudySet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
