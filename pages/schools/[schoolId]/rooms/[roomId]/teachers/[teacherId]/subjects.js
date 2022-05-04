import { DashboardSection } from '../../../../../../../components/parts/dashboard'

import RoomDashboard from '../../../../../../../components/features/rooms/RoomDashboard'
import ManageTeacherSubjects from '../../../../../../../components/features/teachers/ManageTeacherSubjects'
import ViewTeacherNavigation from '../../../../../../../components/features/teachers/ViewTeacherNavigation'

export default function TeacherSubjects () {
  return (
    <RoomDashboard title="講師の科目">
      <ViewTeacherNavigation />
      <DashboardSection>
        <ManageTeacherSubjects />
      </DashboardSection>
    </RoomDashboard>
  )
}
