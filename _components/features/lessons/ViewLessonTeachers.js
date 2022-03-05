import { useTeachersByLessonId } from '../../../hooks/lessons'

import TeacherList from '../../parts/teachers/TeacherList'

export default function ViewLessonTeachers ({ lessonId }) {
  const teachers = useTeachersByLessonId(lessonId)

  return (
    <div className="p-3 flex flex-col gap-3">
      <div className="text-lg">講師一覧</div>
      {teachers && <TeacherList teachers={teachers} />}
    </div>
  )
}
