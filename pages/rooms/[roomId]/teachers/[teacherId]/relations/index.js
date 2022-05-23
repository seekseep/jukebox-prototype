import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ManageTeacherRelations from '@rooms/components/features/teachers/ManageTeacherRelations'
import ViewTeacherNavigation from '@rooms/components/features/teachers/ViewTeacherNavigation'

export default function TeacherRelations () {
  return (
    <RoomDashboard title="生徒の関係の一覧">
      <DashboardSection>
        <ViewTeacherNavigation />
      </DashboardSection>
      <DashboardSection>
        <ManageTeacherRelations />
      </DashboardSection>
    </RoomDashboard>
  )
}
