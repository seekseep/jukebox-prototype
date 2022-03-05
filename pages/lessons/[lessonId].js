import { useCurrentLessonId } from '../../hooks/lessons'

import ViewLessonHead from '../../components/features/lessons/ViewLessonHead'
import ViewLessonBreadcrumb from '../../components/features/lessons/ViewLessonBreadcrumb'
import ViewLesson from '../../components/features/lessons/ViewLesson'
import ViewLessonTeachers from '../../components/features/lessons/ViewLessonTeachers'
import ViewLessonStudents from '../../components/features/lessons/ViewLessonStudents'
import ViewLessonEvents from '../../components/features/lessons/ViewLessonEvents'

export default function Lesson () {
  const currentLessonId = useCurrentLessonId()

  return (
    <>
      <ViewLessonHead lessonId={currentLessonId} />
      <ViewLessonBreadcrumb lessonId={currentLessonId} />
      <ViewLesson lessonId={currentLessonId} />
      <ViewLessonTeachers lessonId={currentLessonId} />
      <ViewLessonStudents lessonId={currentLessonId} />
      <ViewLessonEvents lessonId={currentLessonId} />
    </>
  )
}
