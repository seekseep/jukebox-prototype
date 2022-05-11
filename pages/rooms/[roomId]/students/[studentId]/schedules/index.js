import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ManageStudentSchedules from '@/components/features/students/ManageStudentSchedules'
import ViewStudentNavigation from '@/components/features/students/ViewStudentNavigation'

export default function StudentSchedules () {
  return (
    <RoomDashboard title="生徒の予定の一覧">
      <ViewStudentNavigation />
      <DashboardSection>
        <ManageStudentSchedules />
      </DashboardSection>
    </RoomDashboard>
  )
}
