import { useCurrentTeacherId } from '../../hooks/teachers'

import ViewTeacherHead from '../../components/features/teachers/ViewTeacherHead'
import ViewTeacherBreadcrumb from '../../components/features/teachers/ViewTeacherBreadcrumb'
import ViewTeacher from '../../components/features/teachers/ViewTeacher'

export default function Teacher () {
  const currentTeacherId = useCurrentTeacherId()
  return (
    <>
      <ViewTeacherHead teacherId={currentTeacherId} />
      <ViewTeacherBreadcrumb teacherId={currentTeacherId} />
      <ViewTeacher teacherId={currentTeacherId} />
    </>
  )
}
