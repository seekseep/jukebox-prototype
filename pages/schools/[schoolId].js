import { useCurrentSchoolId } from '../../hooks/schools'

import ViewSchoolHead from '../../components/features/schools/ViewSchoolHead'
import ViewSchoolBreadcrumb from '../../components/features/schools/ViewSchoolBreadcrumb'
import ViewSchool from '../../components/features/schools/ViewSchool'
import ViewSchoolRooms from '../../components/features/schools/ViewSchoolRooms'
import ViewSchoolTeachers from '../../components/features/schools/ViewSchoolTeachers'
import ViewSchoolStudents from '../../components/features/schools/ViewSchoolStudents'

export default function Schools () {
  const currentSchoolId = useCurrentSchoolId()

  return (
    <>
      <ViewSchoolHead schoolId={currentSchoolId} />
      <ViewSchoolBreadcrumb schoolId={currentSchoolId} />
      <ViewSchool schoolId={currentSchoolId} />
      <ViewSchoolRooms schoolId={currentSchoolId} />
      <ViewSchoolTeachers schoolId={currentSchoolId} />
      <ViewSchoolStudents schoolId={currentSchoolId} />
    </>
  )
}
