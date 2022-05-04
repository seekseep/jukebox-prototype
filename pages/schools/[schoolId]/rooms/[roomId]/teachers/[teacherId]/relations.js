import { DashboardSection } from '../../../../../../../components/parts/dashboard'

import RoomDashboard from '../../../../../../../components/features/rooms/RoomDashboard'
import ManageTeacherRelations from '../../../../../../../components/features/teachers/ManageTeacherRelations'
import ViewTeacherNavigation from '../../../../../../../components/features/teachers/ViewTeacherNavigation'

export default function TeacherRelations () {
  return (
    <RoomDashboard title="講師の関係">
      <ViewTeacherNavigation />
      <DashboardSection>
        <ManageTeacherRelations />
      </DashboardSection>
    </RoomDashboard>
  )
}
