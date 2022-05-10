import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ManageLesson from '@/components/features/lessons/ManageLesson'
import DeleteLesson from '@/components/features/lessons/DeleteLesson'
import ViewLessonNavigation from '@/components/features/lessons/ViewLessonNavigation'

export default function Lesson () {
  return (
    <RoomDashboard title="授業">
      <ViewLessonNavigation />
      <DashboardSection>
        <ManageLesson />
      </DashboardSection>
      <DashboardSection>
        <DeleteLesson />
      </DashboardSection>
    </RoomDashboard>
  )
}
