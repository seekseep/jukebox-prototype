import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ManageTeacherSchedules from '@/components/features/teachers/ManageTeacherSchedules'
import ViewTeacherNavigation from '@/components/features/teachers/ViewTeacherNavigation'

export default function Teacher () {
  return (
    <RoomDashboard title="講師の予定">
      <ViewTeacherNavigation />
      <DashboardSection>
        <ManageTeacherSchedules />
      </DashboardSection>
    </RoomDashboard>
  )
}
