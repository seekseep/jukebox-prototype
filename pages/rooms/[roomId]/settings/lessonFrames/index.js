import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewLessonFramesNavigation from '@/components/features/lessonframes/ViewLessonFramesNavigation'
import ManageLessonFrames from '@/components/features/lessonframes/ManageLessonFrames'

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
