import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ManageLesson from '@rooms/components/features/lessons/ManageLesson'
import DeleteLesson from '@rooms/components/features/lessons/DeleteLesson'
import ViewLessonNavigation from '@rooms/components/features/lessons/ViewLessonNavigation'

export default function Lesson () {
  return (
    <RoomDashboard title="授業">
      <DashboardSection>
        <ViewLessonNavigation />
      </DashboardSection>
      <DashboardSection>
        <ManageLesson />
      </DashboardSection>
      <DashboardSection>
        <DeleteLesson />
      </DashboardSection>
    </RoomDashboard>
  )
}
