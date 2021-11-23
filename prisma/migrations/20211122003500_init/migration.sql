-- CreateTable
CREATE TABLE "StudySet" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "StudySet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Term" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "studySetId" INTEGER NOT NULL,

    CONSTRAINT "Term_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudySet_userId_key" ON "StudySet"("userId");

-- AddForeignKey
ALTER TABLE "Term" ADD CONSTRAINT "Term_studySetId_fkey" FOREIGN KEY ("studySetId") REFERENCES "StudySet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
