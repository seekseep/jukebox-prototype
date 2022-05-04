import { DashboardSection } from '../../../../../../../components/parts/dashboard'

import RoomDashboard from '../../../../../../../components/features/rooms/RoomDashboard'
import ManageStudentSchedules from '../../../../../../../components/features/students/ManageStudentSchedules'
import ViewStudentNavigation from '../../../../../../../components/features/students/ViewStudentNavigation'

export default function Student () {
  return (
    <RoomDashboard title="生徒の予定">
      <ViewStudentNavigation />
      <DashboardSection>
        <ManageStudentSchedules />
      </DashboardSection>
    </RoomDashboard>
  )
}
