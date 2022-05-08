import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewNewSubjectLessonNavigation from '@/components/features/subjects/ViewNewSubjectLessonNavigation'
import RegisterSubjectSingleLesson from '@/components/features/subjects/RegisterSubjectSingleLesson'

export default function NewSingleLesson () {
  return (
    <RoomDashboard title="授業の登録">
      <ViewNewSubjectLessonNavigation />
      <DashboardSection>
        <RegisterSubjectSingleLesson />
      </DashboardSection>
    </RoomDashboard>
  )
}
