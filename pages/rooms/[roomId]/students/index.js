import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewStudentsNavigation from '@rooms/components/features/students/ViewStudentsNavigation'
import ManageStudents from '@rooms/components/features/students/ManageStudents'

export default function Students () {
  return (
    <RoomDashboard title="生徒の一覧">
      <DashboardSection>
        <ViewStudentsNavigation />
      </DashboardSection>
      <DashboardSection>
        <ManageStudents />
      </DashboardSection>
    </RoomDashboard>
  )
}
