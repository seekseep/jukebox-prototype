import { useRouter } from 'next/router'

import { useGetRoomPath } from '@/hooks/router'

import { DashboardSection } from '@/components/parts/dashboard'
import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'

import ManageStudents from '@/components/features/students/ManageStudents'
import RoomDashboard from '@/components/features/rooms/RoomDashboard'

export default function Students () {
  const { query: { roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  return (
    <RoomDashboard title="生徒">
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>🏠</BLink>
        <BCurrent>生徒の一覧</BCurrent>
      </Breadcrumbs>
      <DashboardSection>
        <ManageStudents />
      </DashboardSection>
    </RoomDashboard>
  )
}
