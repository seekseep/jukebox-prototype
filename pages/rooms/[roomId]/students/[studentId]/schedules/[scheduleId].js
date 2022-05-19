import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewStudentNavigation from '@/components/features/students/ViewStudentNavigation'
import ManageStudentSchedule from '@/components/features/students/ManageStudentSchedule'
import DeleteStudentSchedule from '@/components/features/students/DeleteStudentSchedule'

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
