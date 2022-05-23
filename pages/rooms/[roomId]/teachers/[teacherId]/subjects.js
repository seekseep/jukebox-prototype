import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ManageTeacherSubjects from '@rooms/components/features/teachers/ManageTeacherSubjects'
import ViewTeacherNavigation from '@rooms/components/features/teachers/ViewTeacherNavigation'

export default function TeacherSubjects () {
  return (
    <RoomDashboard title="講師の科目">
      <DashboardSection>
        <ViewTeacherNavigation />
      </DashboardSection>
      <DashboardSection>
        <ManageTeacherSubjects />
      </DashboardSection>
    </RoomDashboard>
  )
}
