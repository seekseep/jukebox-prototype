import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewStudentNavigation from '@rooms/components/features/students/ViewStudentNavigation'
import ManageStudent from '@rooms/components/features/students/ManageStudent'
import ManagedUserLinkedStudent from '@rooms/components/features/students/ManagedUserLinkedStudent'
import DeleteStudent from '@rooms/components/features/students/DeleteStudent'

export default function Student () {
  return (
    <RoomDashboard title="生徒">
      <DashboardSection>
        <ViewStudentNavigation />
      </DashboardSection>
      <DashboardSection>
        <ManageStudent />
      </DashboardSection>
      <DashboardSection>
        <ManagedUserLinkedStudent />
      </DashboardSection>
      <DashboardSection>
        <DeleteStudent />
      </DashboardSection>
    </RoomDashboard>
  )
}
