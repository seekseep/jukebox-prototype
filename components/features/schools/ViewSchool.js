import { useSchool } from '../../../hooks/schools'

import SchoolPropertyList from '../../parts/schools/SchoolPropertyList'

export default function ViewSchool ({ schoolId }) {
  const school = useSchool(schoolId)

  return school && (
    <div className="flex flex-col gap-3 p-3">
      <div className="text-xl">{school.name}</div>
      <SchoolPropertyList school={school} />
    </div>
  )
}
