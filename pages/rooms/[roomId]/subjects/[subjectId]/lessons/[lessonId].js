import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewSubjectLessonNavigation from '@/components/features/subjects/ViewSubjectLessonNavigation'
import ManageLesson from '@/components/features/lessons/ManageLesson'
import DeleteSubjectLesson from '@/components/features/subjects/DeleteSubjectLesson'

export default function Lesson () {
  return (
    <RoomDashboard title="授業">
      <ViewSubjectLessonNavigation />
      <DashboardSection>
        <ManageLesson />
      </DashboardSection>
      <DashboardSection>
        <DeleteSubjectLesson />
      </DashboardSection>
    </RoomDashboard>
  )
}
