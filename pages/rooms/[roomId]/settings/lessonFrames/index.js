import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewLessonFramesNavigation from '@/modules/rooms/components/features/lessonFrames/ViewLessonFramesNavigation'
import ManageLessonFrames from '@/modules/rooms/components/features/lessonFrames/ManageLessonFrames'

export default function LessonFrames () {
  return (
    <RoomDashboard title="授業枠の一覧">
      <DashboardSection>
        <ViewLessonFramesNavigation />
      </DashboardSection>
      <DashboardSection>
        <ManageLessonFrames />
      </DashboardSection>
    </RoomDashboard>
  )
}
