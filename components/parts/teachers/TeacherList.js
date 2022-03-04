import List, { LinkItem } from '../List'

export default function TeacherList ({ teachers, urlBase = '/teachers' }) {
  return (
    <List>
      {teachers.map((teacher) =>
        <LinkItem key={teacher.id} href={`${urlBase}/${teacher.id}`}>
          {teacher.name}
        </LinkItem>
      )}
    </List>
  )
}
