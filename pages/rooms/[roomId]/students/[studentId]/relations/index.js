import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ManageStudentRelations from '@/components/features/students/ManageStudentRelations'
import ViewStudentNavigation from '@/components/features/students/ViewStudentNavigation'

export default function StudentRelations () {
  return (
    <RoomDashboard title="生徒の関係">
      <ViewStudentNavigation />
      <DashboardSection>
        <ManageStudentRelations />
      </DashboardSection>
    </RoomDashboard>
  )
}
