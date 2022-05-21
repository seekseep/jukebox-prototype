import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewTeacherNavigation from '@/components/features/teachers/ViewTeacherNavigation'
import ManageTeacherRelation from '@/components/features/teachers/ManageTeacherRelation'
import DeleteTeacherRelation from '@/components/features/teachers/DeleteTeacherRelation'

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
