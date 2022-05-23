import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewNewSubjectNavigation from '@rooms/components/features/subjects/ViewNewSubjectNavigation'
import RegisterSubject from '@rooms/components/features/subjects/RegisterSubject'

export default function NewSubject () {
  return (
    <RoomDashboard title="科目の登録">
      <DashboardSection>
        <ViewNewSubjectNavigation />
      </DashboardSection>
      <DashboardSection>
        <RegisterSubject />
      </DashboardSection>
    </RoomDashboard>
  )
}
