import { useSchool } from '../../../hooks/schools'
import Breadcrumb, { BreadcrumbItem } from '../../parts/Breadcrumb'

export default function ViewSchoolBreadcrumb ({ schoolId }) {
  const school = useSchool(schoolId)
  return (
    <div className="p-3">
      <Breadcrumb>
        <BreadcrumbItem href="/schools">すべての学校</BreadcrumbItem>
        <BreadcrumbItem>{school?.name || '読込中'}</BreadcrumbItem>
      </Breadcrumb>
    </div>
  )
}
