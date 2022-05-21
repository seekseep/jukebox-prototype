import { format } from 'date-fns'

export default function LessonCollectionItem ({
  lesson,
}) {
  return (
    <div className="flex flex-grow items-center gap-2">
      <div>{format(lesson.startedAt, 'yyyy/MM/dd HH:mm')}</div>
      <div>~</div>
      <div>{format(lesson.finishedAt, 'yyyy/MM/dd HH:mm')}</div>
    </div>
  )
}
