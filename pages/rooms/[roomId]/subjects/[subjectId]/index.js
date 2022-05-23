import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewSubjectNavigation from '@rooms/components/features/subjects/ViewSubjectNavigation'
import ManageSubject from '@rooms/components/features/subjects/ManageSubject'
import DeleteSubject from '@rooms/components/features/subjects/DeleteSubject'

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
