import { useRoom } from '../../../hooks/rooms'

import Card from '../../parts/Card'
import RoomPropertyList from '../../parts/rooms/RoomPropertyList'

export default function ViewRoomProperties ({ roomId }) {
  const room = useRoom(roomId)
  return room && (
    <Card>
      <RoomPropertyList room={room} />
    </Card>
  )
}
