import { useMemo } from "react";
import { db } from "../mocks/db";
import { useSubject } from "./subjects";

export function useLessonsBySubjectId(subjectId) {
  const subject = useSubject(subjectId)
  const lessons = useMemo(() => subject?.lessons || null, [subject])
  return lessons
}

export function useLesson (lessonId) {
  const lesson = useMemo(() => db.lesson.findFirst({ where: { id: {equals: lessonId}}}), [lessonId])
  return lesson
}
