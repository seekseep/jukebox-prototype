import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewSubjectsNavigation from '@rooms/components/features/subjects/ViewSubjectsNavigation'
import ManageSubjects from '@rooms/components/features/subjects/ManageSubjects'

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
