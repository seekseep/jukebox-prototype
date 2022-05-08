import { useRouter } from 'next/router'

import { useGetRoomPath } from '@/hooks/router'

import { DashboardSection } from '@/components/parts/dashboard'
import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'

import ManageSheets from '@/components/features/sheets/ManageSheets'
import RoomDashboard from '@/components/features/rooms/RoomDashboard'

export default function Sheets () {
  const { query: { roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  return (
    <RoomDashboard title="席">
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>🏠</BLink>
        <BCurrent>席の一覧</BCurrent>
      </Breadcrumbs>
      <DashboardSection>
        <ManageSheets />
      </DashboardSection>
    </RoomDashboard>
  )
}
