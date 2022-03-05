import { useSchool } from '../../../hooks/schools'
import Breadcrumb, { BreadcrumbItem } from '../../parts/Breadcrumb'

export default function ViewSchoolBreadcrumb ({ schoolId }) {
  const school = useSchool(schoolId)
  return (
    <Breadcrumb>
      <BreadcrumbItem href="/schools">すべての学校</BreadcrumbItem>
      <BreadcrumbItem>{school?.name || '読込中'}</BreadcrumbItem>
    </Breadcrumb>
  )
}
