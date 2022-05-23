import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewStudentNavigation from '@rooms/components/features/students/ViewStudentNavigation'
import ManageStudentSubjects from '@rooms/components/features/students/ManageStudentSubjects'

export default function StudentSubjects () {
  return (
    <RoomDashboard title="生徒の履修科目の一覧">
      <DashboardSection>
        <ViewStudentNavigation />
      </DashboardSection>
      <DashboardSection>
        <ManageStudentSubjects />
      </DashboardSection>
    </RoomDashboard>
  )
}
