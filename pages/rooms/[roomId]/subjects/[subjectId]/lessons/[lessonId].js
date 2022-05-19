import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewSubjectLessonNavigation from '@/components/features/subjects/ViewSubjectLessonNavigation'
import ManageLesson from '@/components/features/lessons/ManageLesson'
import DeleteSubjectLesson from '@/components/features/subjects/DeleteSubjectLesson'

export default function SubjectLesson () {
  return (
    <RoomDashboard title="科目の授業">
      <DashboardSection>
        <ViewSubjectLessonNavigation />
      </DashboardSection>
      <DashboardSection>
        <ManageLesson />
      </DashboardSection>
      <DashboardSection>
        <DeleteSubjectLesson />
      </DashboardSection>
    </RoomDashboard>
  )
}
