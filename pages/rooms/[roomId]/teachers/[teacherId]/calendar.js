import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewTeacherNavigation from '@rooms/components/features/teachers/ViewTeacherNavigation'
import ViewTeacherCalendar from '@rooms/components/features/teachers/ViewTeacherCalendar'

export default function TeacherCalendar () {
  return (
    <RoomDashboard title="講師のカレンダー">
      <DashboardSection>
        <ViewTeacherNavigation />
      </DashboardSection>
      <DashboardSection size="full">
        <ViewTeacherCalendar />
      </DashboardSection>
    </RoomDashboard>
  )
}
