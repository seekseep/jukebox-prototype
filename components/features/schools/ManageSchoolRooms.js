import Link from 'next/link'

import { useSchoolRooms } from '../../../hooks/schools'

function Card (props) {
  return <a className="w-full sm:w-1/2 md:w-1/3 p-3 border rounded" {...props} />
}

export default function ManageSchoolRooms ({ schoolId }) {
  const rooms = useSchoolRooms(schoolId)

  return (
    <div className="p-3 flex flex-col gap-3 max-w-3xl mx-auto">
      <div className="text-lg">教室の一覧</div>
      <div className="flex flex-wrap gap-3">
        <Link href={`/schools/${schoolId}/rooms/new`} passHref>
          <Card>➕</Card>
        </Link>
        {rooms && rooms.map(room => (
          <Link key={room.id} href={`/schools/${schoolId}/rooms/${room.id}`} passHref>
            <Card>
              🚪 {room.name}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
