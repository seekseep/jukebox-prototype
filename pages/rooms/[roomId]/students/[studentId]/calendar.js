import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewStudentNavigation from '@rooms/components/features/students/ViewStudentNavigation'
import ViewStudentCalendar from '@rooms/components/features/students/ViewStudentCalendar'

export default function StudentCalendar () {
  return (
    <RoomDashboard title="生徒のカレンダー">
      <DashboardSection>
        <ViewStudentNavigation />
      </DashboardSection>
      <DashboardSection size="full">
        <ViewStudentCalendar />
      </DashboardSection>
    </RoomDashboard>
  )
}
