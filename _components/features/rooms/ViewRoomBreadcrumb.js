import { useRoom } from '../../../hooks/rooms'
import Breadcrumb, { BreadcrumbItem } from '../../parts/Breadcrumb'

export default function ViewRoomBreadcrumb ({ roomId }) {
  const room = useRoom(roomId)
  return (
    <Breadcrumb>
      <BreadcrumbItem>{room?.name || '読込中'}</BreadcrumbItem>
    </Breadcrumb>
  )
}
