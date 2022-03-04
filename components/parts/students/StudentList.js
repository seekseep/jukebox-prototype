import List, { LinkItem } from '../List'

export default function StudentList ({ students, urlBase = '/students' }) {
  return (
    <List>
      {students.map((student) =>
        <LinkItem key={student.id} href={`${urlBase}/${student.id}`}>
          {student.name}
        </LinkItem>
      )}
    </List>
  )
}
