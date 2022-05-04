import { DashboardSection } from '../../../../../../../../components/parts/dashboard'

import ManageLessons from '../../../../../../../../components/features/lessons/ManageLessons'
import ViewSubjectNavigation from '../../../../../../../../components/features/subjects/ViewSubjectNavigation'
import RoomDashboard from '../../../../../../../../components/features/rooms/RoomDashboard'

export default function Lessons () {
  return (
    <RoomDashboard title="授業の一覧">
      <ViewSubjectNavigation />
      <DashboardSection>
        <ManageLessons />
      </DashboardSection>
    </RoomDashboard>
  )
}
