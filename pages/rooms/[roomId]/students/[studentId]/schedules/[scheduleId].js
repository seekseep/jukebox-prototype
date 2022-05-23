import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewStudentNavigation from '@rooms/components/features/students/ViewStudentNavigation'
import ManageStudentSchedule from '@rooms/components/features/students/ManageStudentSchedule'
import DeleteStudentSchedule from '@rooms/components/features/students/DeleteStudentSchedule'

export default function StudentSchedule () {
  return (
    <RoomDashboard title="生徒の予定">
      <DashboardSection>
        <ViewStudentNavigation />
      </DashboardSection>
      <DashboardSection>
        <ManageStudentSchedule />
      </DashboardSection>
      <DashboardSection>
        <DeleteStudentSchedule />
      </DashboardSection>
    </RoomDashboard>
  )
}
