import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewNewStudentNavigation from '@/components/features/students/ViewNewStudentNavigation'
import RegisterStudent from '@/components/features/students/RegisterStudent'

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
