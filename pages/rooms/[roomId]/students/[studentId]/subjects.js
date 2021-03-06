import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewStudentNavigation from '@rooms/components/features/students/ViewStudentNavigation'
import ViewStudentSubjects from '@rooms/components/features/students/ViewStudentSubjects'

export default function StudentSubjects () {
  return (
    <RoomDashboard title="生徒の履修科目の一覧">
      <DashboardSection>
        <ViewStudentNavigation />
      </DashboardSection>
      <DashboardSection>
        <ViewStudentSubjects />
      </DashboardSection>
    </RoomDashboard>
  )
}
