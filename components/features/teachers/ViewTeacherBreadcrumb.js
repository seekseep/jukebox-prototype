import { useTeacher } from '../../../hooks/teachers'
import Breadcrumb, { BreadcrumbItem } from '../../parts/Breadcrumb'

export default function ViewTeacherBreadcrumb ({ teacherId }) {
  const teacher = useTeacher(teacherId)
  return (
    <Breadcrumb>
      <BreadcrumbItem>{teacher?.name || '読込中'}</BreadcrumbItem>
    </Breadcrumb>
  )
}
