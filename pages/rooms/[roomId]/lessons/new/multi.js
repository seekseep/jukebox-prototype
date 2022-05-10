import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewNewLessonNavigation from '@/components/features/lessons/ViewNewLessonNavigation'
import RegisterMultiLessons from '@/components/features/lessons/RegisterMultiLessons'

export default function NewMultiLessons () {
  return (
    <RoomDashboard title="授業の登録">
      <ViewNewLessonNavigation />
      <DashboardSection>
        <RegisterMultiLessons />
      </DashboardSection>
    </RoomDashboard>
  )
}
