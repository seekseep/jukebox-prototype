import Link from 'next/link'
import List, { Item } from '../List'

export default function SchoolStudentList ({ schoolStudents, urlBase = '/students', roomUrlBase = '/rooms' }) {
  return (
    <List>
      {schoolStudents.map((schoolStudent) =>
        <Item key={schoolStudent.id}>
          <div className="flex items-center gap-2">
            <Link href={`${urlBase}/${schoolStudent.id}`}>
              <a className="flex-grow">{schoolStudent.name}</a>
            </Link>
            {schoolStudent.rooms && (
              <div className="flex gap-2">
                {schoolStudent.rooms.map(room =>
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
