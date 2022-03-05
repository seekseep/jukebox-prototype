import { useEvent } from '../../../hooks/events'
import Breadcrumb, { BreadcrumbItem } from '../../parts/Breadcrumb'

export default function ViewEventBreadcrumb ({ eventId }) {
  const event = useEvent(eventId)
  return (
    <Breadcrumb>
      <BreadcrumbItem>{event?.name || '読込中'}</BreadcrumbItem>
    </Breadcrumb>
  )
}
