import { useStudentsByLessonId } from '../../../hooks/lessons'

import StudentList from '../../parts/students/StudentList'

export default function ViewLessonStudents ({ lessonId }) {
  const students = useStudentsByLessonId(lessonId)

  return (
    <div className="p-3 flex flex-col gap-3">
      <div className="text-lg">生徒一覧</div>
      {students && <StudentList students={students} />}
    </div>
  )
}
