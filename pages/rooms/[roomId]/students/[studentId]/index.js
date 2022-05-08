import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ManageStudent from '@/components/features/students/ManageStudent'
import ViewStudentNavigation from '@/components/features/students/ViewStudentNavigation'
import DeleteStudent from '@/components/features/students/DeleteStudent'

export default function Student () {
  return (
    <RoomDashboard title="生徒">
      <ViewStudentNavigation />
      <DashboardSection>
        <ManageStudent />
      </DashboardSection>
      <DashboardSection>
        <DeleteStudent />
      </DashboardSection>
    </RoomDashboard>
  )
}
