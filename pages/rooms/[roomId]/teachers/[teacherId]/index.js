import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ManageTeacher from '@/components/features/teachers/ManageTeacher'
import DeleteTeacher from '@/components/features/teachers/DeleteTeacher'
import ViewTeacherNavigation from '@/components/features/teachers/ViewTeacherNavigation'

export default function Teacher () {
  return (
    <RoomDashboard title="講師">
      <ViewTeacherNavigation />
      <DashboardSection>
        <ManageTeacher />
      </DashboardSection>
      <DashboardSection>
        <DeleteTeacher />
      </DashboardSection>
    </RoomDashboard>
  )
}
