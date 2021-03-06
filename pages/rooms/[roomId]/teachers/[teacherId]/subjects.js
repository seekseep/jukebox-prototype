import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewTeacherSubjects from '@rooms/components/features/teachers/ViewTeacherSubjects'
import ViewTeacherNavigation from '@rooms/components/features/teachers/ViewTeacherNavigation'

export default function TeacherSubjects () {
  return (
    <RoomDashboard title="講師の科目">
      <DashboardSection>
        <ViewTeacherNavigation />
      </DashboardSection>
      <DashboardSection>
        <ViewTeacherSubjects />
      </DashboardSection>
    </RoomDashboard>
  )
}
