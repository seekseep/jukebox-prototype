import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ManageTeacherSchedules from '@rooms/components/features/teachers/ManageTeacherSchedules'
import ViewTeacherNavigation from '@rooms/components/features/teachers/ViewTeacherNavigation'

export default function TeacherSchedules () {
  return (
    <RoomDashboard title="講師の予定の一覧">
      <DashboardSection>
        <ViewTeacherNavigation />
      </DashboardSection>
      <DashboardSection>
        <ManageTeacherSchedules />
      </DashboardSection>
    </RoomDashboard>
  )
}
