import { useStudent } from '../../../hooks/students'
import Breadcrumb, { BreadcrumbItem } from '../../parts/Breadcrumb'

export default function ViewStudentBreadcrumb ({ studentId }) {
  const student = useStudent(studentId)
  return (
    <Breadcrumb>
      <BreadcrumbItem>{student?.name || '読込中'}</BreadcrumbItem>
    </Breadcrumb>
  )
}
