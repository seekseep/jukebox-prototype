import { useRouter } from 'next/router'

import { useGetRoomPath } from '../../../../../../hooks/router'

import { DashboardSection } from '../../../../../../components/parts/dashboard'
import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '../../../../../../components/parts/Breadcrumbs'

import RegisterSheet from '../../../../../../components/features/sheets/RegisterSheet'
import RoomDashboard from '../../../../../../components/features/rooms/RoomDashboard'

export default function Sheets () {
  const { query: { schoolId, roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(schoolId, roomId)

  return (
    <RoomDashboard title="席">
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>🏠</BLink>
        <BLink href={getRoomPath('/sheets')}>席の一覧</BLink>
        <BCurrent>席の登録</BCurrent>
      </Breadcrumbs>
      <DashboardSection>
        <RegisterSheet />
      </DashboardSection>
    </RoomDashboard>
  )
}
