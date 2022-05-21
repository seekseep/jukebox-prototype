import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewSubjectLessonsNavigation from '@/components/features/subjects/ViewSubjectLessonsNavigation'
import ManageSubjectLessons from '@/components/features/subjects/ManageSubjectLessons'

export default function SubjectLessons () {
  return (
    <RoomDashboard title="科目の授業の一覧">
      <DashboardSection>
        <ViewSubjectLessonsNavigation />
      </DashboardSection>
      <DashboardSection>
        <ManageSubjectLessons />
      </DashboardSection>
    </RoomDashboard>
  )
}
