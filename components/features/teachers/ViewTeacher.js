import { useTeacher } from '../../../hooks/teachers'

import TeacherPropertyList from '../../parts/teachers/TeacherPropertyList'

export default function ViewTeacher ({ teacherId }) {
  const teacher = useTeacher(teacherId)

  return (
    <div className="p-3 flex flex-col gap-3">
      <div className="text-lg">講師</div>
      {teacher && <TeacherPropertyList teacher={teacher} />}
    </div>
  )
}
