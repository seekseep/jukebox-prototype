import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewLessonsNavigation from '@rooms/components/features/lessons/ViewLessonsNavigation'
import ManageLessons from '@rooms/components/features/lessons/ManageLessons'

export default function LessonsList () {
  return (
    <RoomDashboard title="授業の一覧">
      <DashboardSection>
        <ViewLessonsNavigation />
      </DashboardSection>
      <DashboardSection>
        <ManageLessons />
      </DashboardSection>
    </RoomDashboard>
  )
}
