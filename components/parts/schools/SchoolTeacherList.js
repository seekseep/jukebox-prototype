import Link from 'next/link'
import List, { Item } from '../List'

export default function SchoolTeacherList ({ schoolTeachers, urlBase = '/teachers', roomUrlBase = '/rooms' }) {
  return (
    <List>
      {schoolTeachers.map((schoolTeacher) =>
        <Item key={schoolTeacher.id}>
          <div className="flex items-center gap-2">
            <Link href={`${urlBase}/${schoolTeacher.id}`}>
              <a className="flex-grow">{schoolTeacher.name}</a>
            </Link>
            {schoolTeacher.rooms && (
              <div className="flex gap-2">
                {schoolTeacher.rooms.map(room =>
                  <Link key={room.id} href={`${roomUrlBase}/${room.id}`}>
                    <a className="text-gray-800 text-sm">{room.name}</a>
                  </Link>
                )}
              </div>
            )}
          </div>
        </Item>
      )}
    </List>
  )
}
