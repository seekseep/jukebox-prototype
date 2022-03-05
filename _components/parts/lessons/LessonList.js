import List, { LinkItem } from '../List'

export default function LessonList ({ lessons, urlBase = '/lessons' }) {
  return (
    <List>
      {lessons.map(lesson => (
        <LinkItem key={lesson.id} href={`/lessons/${lesson.id}`}>
          <div>{lesson.name}</div>
        </LinkItem>
      ))}
    </List>
  )
}
