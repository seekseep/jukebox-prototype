import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewTeachersNavigaion from '@/components/features/teachers/ViewTeachersNavigation'
import ManageTeachers from '@/components/features/teachers/ManageTeachers'

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
