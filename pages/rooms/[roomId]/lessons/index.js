import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewLessonsNavigation from '@/components/features/lessons/ViewLessonsNavigation'
import ManageLessons from '@/components/features/lessons/ManageLessons'

export default function Lessons () {
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
