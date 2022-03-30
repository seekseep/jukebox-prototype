import Link from 'next/link'

import { useAllSchools } from '../../../hooks/schools'

import {
  ResourceCardContainer,
  CreateSchoolCard,
  SchoolCard
} from '../../parts/cards/resourceCards'

export default function ViewAllSchools () {
  const allSchools = useAllSchools()

  return (
    <div>
      <div className="bg-gray-100 py-24">
        <div className="text-center text-xl font-bold">すべての学校</div>
      </div>
      <div className="max-w-3xl mx-auto py-16 px-4">
        <ResourceCardContainer>
          <CreateSchoolCard baseUrl="/schools" />
          {allSchools.map(school =>
            <SchoolCard key={school.id} school={school} baseUrl="/schools" />
          )}
        </ResourceCardContainer>
      </div>
    </div>
  )
}
