import { useCurrentEventId } from '../../hooks/events'

import ViewEventHead from '../../components/features/events/ViewEventHead'
import ViewEventBreadcrumb from '../../components/features/events/ViewEventBreadcrumb'
import ViewEvent from '../../components/features/events/ViewEvent'
import ViewEventTeachers from '../../components/features/events/ViewEventTeachers'
import ViewEventStudents from '../../components/features/events/ViewEventStudents'

export default function Event () {
  const currentEventId = useCurrentEventId()

  return (
    <>
      <ViewEventHead eventId={currentEventId} />
      <ViewEventBreadcrumb eventId={currentEventId} />
      <ViewEvent eventId={currentEventId} />
      <ViewEventTeachers eventId={currentEventId} />
      <ViewEventStudents eventId={currentEventId} />
    </>
  )
}
