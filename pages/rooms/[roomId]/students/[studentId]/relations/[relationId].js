import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewStudentNavigation from '@rooms/components/features/students/ViewStudentNavigation'
import ManageStudentRelation from '@rooms/components/features/students/ManageStudentRelation'
import DeleteStudentRelation from '@rooms/components/features/students/DeleteStudentRelation'

export default function StudentRelation () {
  return (
    <RoomDashboard title="生徒の関係">
      <DashboardSection>
        <ViewStudentNavigation />
      </DashboardSection>
      <DashboardSection>
        <ManageStudentRelation />
      </DashboardSection>
      <DashboardSection>
        <DeleteStudentRelation />
      </DashboardSection>
    </RoomDashboard>
  )
}
