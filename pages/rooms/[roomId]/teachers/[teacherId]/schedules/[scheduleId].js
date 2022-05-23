import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewTeacherNavigation from '@rooms/components/features/teachers/ViewTeacherNavigation'
import ManageTeacherSchedule from '@rooms/components/features/teachers/ManageTeacherSchedule'
import DeleteTeacherSchedule from '@rooms/components/features/teachers/DeleteTeacherSchedule'

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
