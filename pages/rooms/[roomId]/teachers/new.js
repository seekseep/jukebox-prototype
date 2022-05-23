import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewNewTeacherNavigaion from '@rooms/components/features/teachers/ViewNewTeacherNavigation'
import RegisterTeacher from '@rooms/components/features/teachers/RegisterTeacher'

import { DashboardSection } from '@/components/parts/dashboard'

export default function Teachers () {
  return (
    <RoomDashboard title="講師の登録">
      <DashboardSection>
        <ViewNewTeacherNavigaion />
      </DashboardSection>
      <DashboardSection>
        <RegisterTeacher />
      </DashboardSection>
    </RoomDashboard>
  )
}
