import { useRouter } from 'next/router'

import { useGetRoomPath } from '@/hooks/router'

import { DashboardSection } from '@/components/parts/dashboard'
import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'

import RegisterSubject from '@/components/features/subjects/RegisterSubject'
import RoomDashboard from '@/components/features/rooms/RoomDashboard'

export default function Subjects () {
  const { query: { roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  return (
    <RoomDashboard title="科目">
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>🏠</BLink>
        <BLink href={getRoomPath('/subjects')}>科目の一覧</BLink>
        <BCurrent>科目の登録</BCurrent>
      </Breadcrumbs>
      <DashboardSection>
        <RegisterSubject />
      </DashboardSection>
    </RoomDashboard>
  )
}
