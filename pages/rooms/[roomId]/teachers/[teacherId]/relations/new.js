import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewTeacherNavigation from '@/components/features/teachers/ViewTeacherNavigation'
import RegisterTeacherRelation from '@/components/features/teachers/RegisterTeacherRelation'

export default function NewTeacherRelation () {
  return (
    <RoomDashboard title="講師の関係の登録">
      <DashboardSection>
        <ViewTeacherNavigation />
      </DashboardSection>
      <DashboardSection>
        <RegisterTeacherRelation />
      </DashboardSection>
    </RoomDashboard>
  )
}
