import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewTeacherLessons from '@rooms/components/features/teachers/ViewTeacherLessons'
import ViewTeacherNavigation from '@rooms/components/features/teachers/ViewTeacherNavigation'

export default function TeacherLessons () {
  return (
    <RoomDashboard title="授業">
      <DashboardSection>
        <ViewTeacherNavigation />
      </DashboardSection>
      <DashboardSection>
        <ViewTeacherLessons />
      </DashboardSection>
    </RoomDashboard>
  )
}
