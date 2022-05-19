import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewLessonFrameNavigation from '@/components/features/lessonframes/ViewLessonFrameNavigation'
import ManageLessonFrame from '@/components/features/lessonframes/ManageLessonFrame'
import DeleteLessonFrame from '@/components/features/lessonframes/DeleteLessonFrame'

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
