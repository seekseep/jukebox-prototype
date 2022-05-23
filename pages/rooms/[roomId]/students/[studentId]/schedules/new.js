import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewStudentNavigation from '@rooms/components/features/students/ViewStudentNavigation'
import RegisterStudentSchedule from '@rooms/components/features/students/RegisterStudentSchedule'

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
