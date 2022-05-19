import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewNewLessonFrameNavigation from '@/components/features/lessonframes/ViewNewLessonFrameNavigation'
import RegisterLessonFrame from '@/components/features/lessonframes/RegisterLessonFrame'

export default function NewLessonFrame () {
  return (
    <RoomDashboard title="授業枠の登録">
      <DashboardSection>
        <ViewNewLessonFrameNavigation />
      </DashboardSection>
      <DashboardSection>
        <RegisterLessonFrame />
      </DashboardSection>
    </RoomDashboard>
  )
}
