import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewNewSubjectLessonNavigation from '@/components/features/subjects/ViewNewSubjectLessonNavigation'
import RegisterSubjectLesson from '@/components/features/subjects/RegisterSubjectLesson'

export default function NewSingleSubjectLesson () {
  return (
    <RoomDashboard title="科目への授業の登録">
      <DashboardSection>
        <ViewNewSubjectLessonNavigation />
      </DashboardSection>
      <DashboardSection>
        <RegisterSubjectLesson />
      </DashboardSection>
    </RoomDashboard>
  )
}
