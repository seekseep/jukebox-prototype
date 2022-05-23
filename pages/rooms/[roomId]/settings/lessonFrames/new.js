import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewNewLessonFrameNavigation from '@/modules/rooms/components/features/lessonFrames/ViewNewLessonFrameNavigation'
import RegisterLessonFrame from '@/modules/rooms/components/features/lessonFrames/RegisterLessonFrame'

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
