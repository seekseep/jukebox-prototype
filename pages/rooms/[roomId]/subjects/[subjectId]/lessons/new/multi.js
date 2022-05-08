import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewNewSubjectLessonNavigation from '@/components/features/subjects/ViewNewSubjectLessonNavigation'
import RegisterSubjectMultiLessons from '@/components/features/subjects/RegisterSubjectMultiLessons'

export default function NewMultiLessons () {
  return (
    <RoomDashboard title="授業の登録">
      <ViewNewSubjectLessonNavigation />
      <DashboardSection>
        <RegisterSubjectMultiLessons />
      </DashboardSection>
    </RoomDashboard>
  )
}
