import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewNewSubjectNavigation from '@/components/features/subjects/ViewNewSubjectNavigation'
import RegisterSubject from '@/components/features/subjects/RegisterSubject'

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
