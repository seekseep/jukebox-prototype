import { useEventLessons } from '../../../hooks/events'

import LessonList from '../../parts/lessons/LessonList'

export default function ViewEventLessons ({ eventId }) {
  const lessons = useEventLessons(eventId)

  return (
    <div className="p-3 flex flex-col gap-3">
      <div className="text-lg">授業一覧</div>
      {lessons && <LessonList lessons={lessons} />}
    </div>
  )
}
