import { useStudent } from '../../../hooks/students'

import StudentPropertyList from '../../parts/students/StudentPropertyList'

export default function ViewStudent ({ studentId }) {
  const student = useStudent(studentId)

  return (
    <div className="p-3 flex flex-col gap-3">
      <div className="text-lg">生徒</div>
      {student && <StudentPropertyList student={student} />}
    </div>
  )
}
