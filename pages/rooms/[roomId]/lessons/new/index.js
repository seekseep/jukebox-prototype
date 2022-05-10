import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewNewLessonNavigation from '@/components/features/lessons/ViewNewLessonNavigation'
import RegisterSingleLesson from '@/components/features/lessons/RegisterSingleLesson'

export default function NewSingleLesson () {
  return (
    <RoomDashboard title="授業の登録">
      <ViewNewLessonNavigation />
      <DashboardSection>
        <RegisterSingleLesson />
      </DashboardSection>
    </RoomDashboard>
  )
}
