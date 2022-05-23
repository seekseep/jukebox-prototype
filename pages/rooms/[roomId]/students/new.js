import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewNewStudentNavigation from '@rooms/components/features/students/ViewNewStudentNavigation'
import RegisterStudent from '@rooms/components/features/students/RegisterStudent'

export default function NewStudent () {
  return (
    <RoomDashboard title="生徒の登録">
      <DashboardSection>
        <ViewNewStudentNavigation />
      </DashboardSection>
      <DashboardSection>
        <RegisterStudent />
      </DashboardSection>
    </RoomDashboard>
  )
}
