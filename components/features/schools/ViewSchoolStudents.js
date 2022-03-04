import { useSchoolStudents } from '../../../hooks/schools'

import SchoolStudentList from '../../parts/schools/SchoolStudentList'

export default function ViewSchoolStudents ({ schoolId }) {
  const schoolStudents = useSchoolStudents(schoolId)

  return (
    <div className="p-3 flex flex-col gap-3">
      <div className="text-lg">生徒一覧</div>
      {schoolStudents && <SchoolStudentList schoolStudents={schoolStudents} />}
    </div>
  )
}
