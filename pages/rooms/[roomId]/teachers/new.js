import { useRouter } from 'next/router'

import { useGetRoomPath } from '@/hooks/router'

import { DashboardSection } from '@/components/parts/dashboard'
import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'

import RegisterTeacher from '@/components/features/teachers/RegisterTeacher'
import RoomDashboard from '@/components/features/rooms/RoomDashboard'

export default function Teachers () {
  const { query: { roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  return (
    <RoomDashboard title="講師">
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>🏠</BLink>
        <BLink href={getRoomPath('/teachers')}>講師の一覧</BLink>
        <BCurrent>講師の登録</BCurrent>
      </Breadcrumbs>
      <DashboardSection>
        <RegisterTeacher />
      </DashboardSection>
    </RoomDashboard>
  )
}
