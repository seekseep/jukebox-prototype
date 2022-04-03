import { useRouter } from 'next/router'
import { useGetRoomLink } from '../../../../hooks/rooms'

import RoomDashboard from '../../../../components/parts/RoomDashboard'
import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent
} from '../../../../components/parts/Breadcrumbs'

export default function CreateSchedule () {
  const { query: { roomId } } = useRouter()
  const getRoomLink = useGetRoomLink(roomId)
  return (
    <RoomDashboard roomId={roomId}>
      <Breadcrumbs>
        <BLink href={getRoomLink('/')}>ホーム</BLink>
        <BLink href={getRoomLink('/schedules')}>予定の一覧</BLink>
        <BCurrent>予定の作成</BCurrent>
      </Breadcrumbs>
    </RoomDashboard>
  )
}
