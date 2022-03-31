import Link from 'next/link'

import { useSchool } from "../../hooks/schools"

export default function SchoolNavigation ({ schoolId }) {
  const school = useSchool(schoolId)
  return (
    <header className="bg-white border-b">
      <div className="flex justify-between leading-none items-center">
        <Link href={`/schools/${schoolId}`} passHref>
          <a className="p-4 block font-bold">{school.name}</a>
        </Link>
        <Link href="/schools">
          <a className="p-4 block text-blue-500">
            ログアウト
          </a>
        </Link>
      </div>
    </header>
  )
}
