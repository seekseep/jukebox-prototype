import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewTeacherNavigation from '@/components/features/teachers/ViewTeacherNavigation'
import ManageTeacherSchedule from '@/components/features/teachers/ManageTeacherSchedule'
import DeleteTeacherSchedule from '@/components/features/teachers/DeleteTeacherSchedule'

export default function TeacherSchedule () {
  return (
    <RoomDashboard title="講師の予定">
      <DashboardSection>
        <ViewTeacherNavigation />
      </DashboardSection>
      <DashboardSection>
        <ManageTeacherSchedule />
      </DashboardSection>
      <DashboardSection>
        <DeleteTeacherSchedule />
      </DashboardSection>
    </RoomDashboard>
  )
}
