import { useLessonEvents } from '../../../hooks/lessons'

import EventList from '../../parts/events/EventList'

export default function ViewLessonEvents ({ lessonId }) {
  const events = useLessonEvents(lessonId)

  return (
    <div className="p-3 flex flex-col gap-3">
      <div className="text-lg">予定</div>
      {events && <EventList events={events} />}
    </div>
  )
}
