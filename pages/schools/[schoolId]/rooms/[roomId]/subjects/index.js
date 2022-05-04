import { useRouter } from 'next/router'

import { useGetRoomPath } from '../../../../../../hooks/router'

import { DashboardSection } from '../../../../../../components/parts/dashboard'
import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '../../../../../../components/parts/Breadcrumbs'

import ManageSubjects from '../../../../../../components/features/subjects/ManageSubjects'
import RoomDashboard from '../../../../../../components/features/rooms/RoomDashboard'

export default function Subjects () {
  const { query: { schoolId, roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(schoolId, roomId)

  return (
    <RoomDashboard title="科目">
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>🏠</BLink>
        <BCurrent>科目の一覧</BCurrent>
      </Breadcrumbs>
      <DashboardSection>
        <ManageSubjects />
      </DashboardSection>
    </RoomDashboard>
  )
}
