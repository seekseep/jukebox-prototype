import { DashboardSection, DASHBOARD_SECTION_SIZE } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewLessonsNavigation from '@rooms/components/features/lessons/ViewLessonsNavigation'
import ViewLessonsCalendar from '@rooms/components/features/lessons/ViewLessonsCalendar'

export default function LessonsCalendar () {
  return (
    <RoomDashboard title="授業">
      <DashboardSection>
        <ViewLessonsNavigation />
      </DashboardSection>
      <DashboardSection size={DASHBOARD_SECTION_SIZE.FULL}>
        <ViewLessonsCalendar />
      </DashboardSection>
    </RoomDashboard>
  )
}
