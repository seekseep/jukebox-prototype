import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewStudentNavigation from '@rooms/components/features/students/ViewStudentNavigation'
import ManageStudentSchedules from '@rooms/components/features/students/ManageStudentSchedules'

export default function StudentSchedules () {
  return (
    <RoomDashboard title="生徒の予定の一覧">
      <DashboardSection>
        <ViewStudentNavigation />
      </DashboardSection>
      <DashboardSection>
        <ManageStudentSchedules />
      </DashboardSection>
    </RoomDashboard>
  )
}
