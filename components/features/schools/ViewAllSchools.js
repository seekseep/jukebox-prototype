import { useAllSchools } from '../../../hooks/schools'

import SchoolList from '../../parts/schools/SchoolList'

export default function ViewAllSchools () {
  const allSchools = useAllSchools()

  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="text-xl">すべての学校</div>
      <SchoolList schools={allSchools} />
    </div>
  )
}
