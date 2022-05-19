import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewStudentNavigation from '@/components/features/students/ViewStudentNavigation'
import RegisterStudentSchedule from '@/components/features/students/RegisterStudentSchedule'

export default function NewStudentSchedule () {
  return (
    <RoomDashboard title="生徒の予定の登録">
      <DashboardSection>
        <ViewStudentNavigation />
      </DashboardSection>
      <DashboardSection>
        <RegisterStudentSchedule />
      </DashboardSection>
    </RoomDashboard>
  )
}
