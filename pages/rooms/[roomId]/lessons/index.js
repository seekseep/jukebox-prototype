import { useRouter } from 'next/router'

import { useGetRoomPath } from '@/hooks/router'

import { DashboardSection } from '@/components/parts/dashboard'
import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'

import ManageLessons from '@/components/features/lessons/ManageLessons'
import RoomDashboard from '@/components/features/rooms/RoomDashboard'

export default function Lessons () {
  const { query: { roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  return (
    <RoomDashboard title="授業">
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>🏠</BLink>
        <BCurrent>授業の一覧</BCurrent>
      </Breadcrumbs>
      <DashboardSection>
        <ManageLessons />
      </DashboardSection>
    </RoomDashboard>
  )
}
