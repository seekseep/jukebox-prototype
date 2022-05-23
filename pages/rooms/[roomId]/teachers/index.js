import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewTeachersNavigaion from '@rooms/components/features/teachers/ViewTeachersNavigation'
import ManageTeachers from '@rooms/components/features/teachers/ManageTeachers'

export default function Teachers () {
  return (
    <RoomDashboard title="講師の一覧">
      <DashboardSection>
        <ViewTeachersNavigaion />
      </DashboardSection>
      <DashboardSection>
        <ManageTeachers />
      </DashboardSection>
    </RoomDashboard>
  )
}
