import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ManageStudentSubjects from '@/components/features/students/ManageStudentSubjects'
import ViewStudentNavigation from '@/components/features/students/ViewStudentNavigation'

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
