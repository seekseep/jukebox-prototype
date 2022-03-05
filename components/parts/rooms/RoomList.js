import List, { LinkItem } from '../List'

export default function RoomList ({ rooms, urlBase = '/rooms' }) {
  return (
    <List>
      {rooms.map((room) =>
        <LinkItem key={room.id} href={`${urlBase}/${room.id}`}>
          {room.name}
        </LinkItem>
      )}
    </List>
  )
}
