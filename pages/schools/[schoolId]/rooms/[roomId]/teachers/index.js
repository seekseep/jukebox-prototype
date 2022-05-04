import { useRouter } from 'next/router'

import { useGetRoomPath } from '../../../../../../hooks/router'

import { DashboardSection } from '../../../../../../components/parts/dashboard'
import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '../../../../../../components/parts/Breadcrumbs'

import ManageTeachers from '../../../../../../components/features/teachers/ManageTeachers'
import RoomDashboard from '../../../../../../components/features/rooms/RoomDashboard'

export default function Teachers () {
  const { query: { schoolId, roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(schoolId, roomId)

  return (
    <RoomDashboard title="講師">
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>🏠</BLink>
        <BCurrent>講師の一覧</BCurrent>
      </Breadcrumbs>
      <DashboardSection>
        <ManageTeachers />
      </DashboardSection>
    </RoomDashboard>
  )
}
