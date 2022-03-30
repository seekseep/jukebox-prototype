import Link from 'next/link'
import List, { LinkItem } from '../List'

export default function SchoolList ({ schools, urlBase = '/schools' }) {
  return (
    <div className="flex flex-row flex-wrap">
      {schools.map(school =>
        <Link key={school.id} href={`${urlBase}/${school.id}`}>
          <a className="border rounded w-full sm:w-1/2 md:w-1/4 p-4 py-8">
            {school.name}
          </a>
        </Link>
      )}
    </div>
  )
}
