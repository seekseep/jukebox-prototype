import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ManageTeacher from '@rooms/components/features/teachers/ManageTeacher'
import DeleteTeacher from '@rooms/components/features/teachers/DeleteTeacher'
import ViewTeacherNavigation from '@rooms/components/features/teachers/ViewTeacherNavigation'

export default function Teacher () {
  return (
    <RoomDashboard title="講師">
      <DashboardSection>
        <ViewTeacherNavigation />
      </DashboardSection>
      <DashboardSection>
        <ManageTeacher />
      </DashboardSection>
      <DashboardSection>
        <DeleteTeacher />
      </DashboardSection>
    </RoomDashboard>
  )
}
