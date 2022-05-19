import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewTeacherNavigation from '@/components/features/teachers/ViewTeacherNavigation'
import RegisterTeacherSchedule from '@/components/features/teachers/RegisterTeacherSchedule'

export default function NewTeacherSchedule () {
  return (
    <RoomDashboard title="講師の予定の登録">
      <DashboardSection>
        <ViewTeacherNavigation />
      </DashboardSection>
      <DashboardSection>
        <RegisterTeacherSchedule />
      </DashboardSection>
    </RoomDashboard>
  )
}
