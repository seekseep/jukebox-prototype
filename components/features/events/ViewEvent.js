import { useEvent } from '../../../hooks/events'

import Card from '../../parts/Card'
import EventPropertyList from '../../parts/events/EventPropertyList'

export default function ViewEventProperties ({ eventId }) {
  const event = useEvent(eventId)
  return event && (
    <Card>
      <EventPropertyList event={event} />
    </Card>
  )
}
