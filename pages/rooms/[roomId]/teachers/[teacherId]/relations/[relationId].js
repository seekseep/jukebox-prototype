import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewTeacherNavigation from '@rooms/components/features/teachers/ViewTeacherNavigation'
import ManageTeacherRelation from '@rooms/components/features/teachers/ManageTeacherRelation'
import DeleteTeacherRelation from '@rooms/components/features/teachers/DeleteTeacherRelation'

export default function TeacherRelation () {
  return (
    <RoomDashboard title="講師の関係">
      <DashboardSection>
        <ViewTeacherNavigation />
      </DashboardSection>
      <DashboardSection>
        <ManageTeacherRelation />
      </DashboardSection>
      <DashboardSection>
        <DeleteTeacherRelation />
      </DashboardSection>
    </RoomDashboard>
  )
}
