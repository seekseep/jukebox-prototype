import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewLessonFrameNavigation from '@/modules/rooms/components/features/lessonFrames/ViewLessonFrameNavigation'
import ManageLessonFrame from '@/modules/rooms/components/features/lessonFrames/ManageLessonFrame'
import DeleteLessonFrame from '@/modules/rooms/components/features/lessonFrames/DeleteLessonFrame'

export default function LessonFrame () {
  return (
    <RoomDashboard title="授業枠">
      <DashboardSection>
        <ViewLessonFrameNavigation />
      </DashboardSection>
      <DashboardSection>
        <ManageLessonFrame />
      </DashboardSection>
      <DashboardSection>
        <DeleteLessonFrame />
      </DashboardSection>
    </RoomDashboard>
  )
}
