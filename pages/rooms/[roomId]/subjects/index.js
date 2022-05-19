import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewSubjectsNavigation from '@/components/features/subjects/ViewSubjectsNavigation'
import ManageSubjects from '@/components/features/subjects/ManageSubjects'

export default function Subjects () {
  return (
    <RoomDashboard title="科目の一覧">
      <DashboardSection>
        <ViewSubjectsNavigation />
      </DashboardSection>
      <DashboardSection>
        <ManageSubjects />
      </DashboardSection>
    </RoomDashboard>
  )
}
