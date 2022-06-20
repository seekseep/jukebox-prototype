import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewNewTeacherNavigation from '@rooms/components/features/teachers/ViewNewTeacherNavigation'
import ImportTeachers from '@rooms/components/features/teachers/ImportTeachers'

export default function NewTeacher () {
  return (
    <RoomDashboard title="講師のインポート">
      <DashboardSection>
        <ViewNewTeacherNavigation />
      </DashboardSection>
      <DashboardSection>
        <ImportTeachers />
      </DashboardSection>
    </RoomDashboard>
  )
}
