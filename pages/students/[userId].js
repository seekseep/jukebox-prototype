import { useCurrentStudentId } from '../../hooks/students'

import ViewStudentHead from '../../components/features/students/ViewStudentHead'
import ViewStudentBreadcrumb from '../../components/features/students/ViewStudentBreadcrumb'
import ViewStudent from '../../components/features/students/ViewStudent'

export default function Student () {
  const currentStudentId = useCurrentStudentId()
  return (
    <>
      <ViewStudentHead studentId={currentStudentId} />
      <ViewStudentBreadcrumb studentId={currentStudentId} />
      <ViewStudent studentId={currentStudentId} />
    </>
  )
}
