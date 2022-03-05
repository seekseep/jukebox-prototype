import { useSchoolTeachers } from '../../../hooks/schools'

import SchoolTeacherList from '../../parts/schools/SchoolTeacherList'

export default function ViewSchoolTeachers ({ schoolId }) {
  const schoolTeachers = useSchoolTeachers(schoolId)

  return (
    <div className="p-3 flex flex-col gap-3">
      <div className="text-lg">講師一覧</div>
      {schoolTeachers && <SchoolTeacherList schoolTeachers={schoolTeachers} />}
    </div>
  )
}
