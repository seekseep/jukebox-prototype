import { format } from 'date-fns'
import List, { LinkItem } from '../List'

export default function EventList ({ events, urlBase = '/events' }) {
  return (
    <List>
      {events.map(event => (
        <LinkItem key={event.id} href={`${urlBase}/${event.id}`}>
          <div className="flex flex-col gap-1 py-2">
            <div>{event.name}</div>
            <div className="text-gray-800 text-sm flex gap-2">
              <div>{format(new Date(event.startedAt), 'yyyy/MM/dd HH:mm')}</div>
              <div>~</div>
              <div>{format(new Date(event.finishedAt), 'HH:mm')}</div>
            </div>
          </div>
        </LinkItem>
      ))}
    </List>
  )
}
