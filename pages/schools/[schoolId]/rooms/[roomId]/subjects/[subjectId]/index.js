import { DashboardSection } from '../../../../../../../components/parts/dashboard'

import RoomDashboard from '../../../../../../../components/features/rooms/RoomDashboard'
import ManageSubject from '../../../../../../../components/features/subjects/ManageSubject'
import ViewSubjectNavigation from '../../../../../../../components/features/subjects/ViewSubjectNavigation'

export default function Subject () {
  return (
    <RoomDashboard title="科目">
      <ViewSubjectNavigation />
      <DashboardSection>
        <ManageSubject />
      </DashboardSection>
    </RoomDashboard>
  )
}
