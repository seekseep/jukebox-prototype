import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewStudentNavigation from '@/components/features/students/ViewStudentNavigation'
import ManageStudentRelation from '@/components/features/students/ManageStudentRelation'
import DeleteStudentRelation from '@/components/features/students/DeleteStudentRelation'

export default function StudentRelation () {
  return (
    <RoomDashboard title="生徒の関係性">
      <ViewStudentNavigation />
      <DashboardSection>
        <ManageStudentRelation />
      </DashboardSection>
      <DashboardSection>
        <DeleteStudentRelation />
      </DashboardSection>
    </RoomDashboard>
  )
}
