import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewNewLessonNavigation from '@rooms/components/features/lessons/ViewNewLessonNavigation'
import RegisterLesson from '@rooms/components/features/lessons/RegisterLesson'

export default function NewMultiLessons () {
  return (
    <RoomDashboard title="授業の一括登録">
      <DashboardSection>
        <ViewNewLessonNavigation />
      </DashboardSection>
      <DashboardSection>
        <RegisterLesson />
      </DashboardSection>
    </RoomDashboard>
  )
}
