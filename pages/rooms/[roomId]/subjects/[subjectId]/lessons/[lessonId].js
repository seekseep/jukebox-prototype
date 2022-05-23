import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewSubjectLessonNavigation from '@rooms/components/features/subjects/ViewSubjectLessonNavigation'
import ManageLesson from '@rooms/components/features/lessons/ManageLesson'
import DeleteSubjectLesson from '@rooms/components/features/subjects/DeleteSubjectLesson'

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
