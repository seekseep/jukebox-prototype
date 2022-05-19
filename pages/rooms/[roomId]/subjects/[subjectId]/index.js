import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewSubjectNavigation from '@/components/features/subjects/ViewSubjectNavigation'
import ManageSubject from '@/components/features/subjects/ManageSubject'
import DeleteSubject from '@/components/features/subjects/DeleteSubject'

export default function Subject () {
  return (
    <RoomDashboard title="科目">
      <DashboardSection>
        <ViewSubjectNavigation />
      </DashboardSection>
      <DashboardSection>
        <ManageSubject />
      </DashboardSection>
      <DashboardSection>
        <DeleteSubject />
      </DashboardSection>
    </RoomDashboard>
  )
}
