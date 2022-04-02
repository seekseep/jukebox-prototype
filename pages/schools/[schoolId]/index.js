import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useSchool } from '../../../hooks/schools'
import { useRoomsBySchoolId } from '../../../hooks/rooms'
import SchoolNavigation from '../../../components/parts/SchoolNavigation'

export default function School () {
  const { query : { schoolId } } = useRouter()
  const school = useSchool(schoolId)
  const rooms = useRoomsBySchoolId(schoolId)

  return (
    <>
      <Head>
        <title>学校 | {school?.name}</title>
      </Head>
      <SchoolNavigation schoolId={schoolId}/>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-blue-500">
          <div className="max-w-2xl py-8 mx-auto">
            <h1 className="text-2xl text-white text-center">{school?.name}</h1>
          </div>
        </header>
        <section className="max-w-2xl mx-auto py-4 flex flex-col gap-4">
          <div className="flex justify-end">
            <Link href={`/schools/${schoolId}/rooms/new`}>
              <a className="bg-blue-500 text-whtie text-white px-4 py-2 rounded">
                教室を作成
              </a>
            </Link>
          </div>
          <nav className="grid grid-cols-3 gap-4 leading-none">
            {rooms?.map(room => (
              <Link key={room.id} href={`/rooms/${room.id}`} passHref>
                <a className="bg-white rounded shadow p-4 flex items-center gap-2">
                  <span className="text-3xl">🚪</span>
                  <span>{room.name}</span>
                </a>
              </Link>
            ))}
          </nav>
        </section>
      </div>


    </>
  )
}
