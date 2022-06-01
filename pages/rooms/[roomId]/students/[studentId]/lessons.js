import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewStudentNavigation from '@rooms/components/features/students/ViewStudentNavigation'
import ViewStudentLessons from '@rooms/components/features/students/ViewStudentLessons'

export default function StudentLessons () {
  return (
    <RoomDashboard title="生徒の授業の一覧">
      <DashboardSection>
        <ViewStudentNavigation />
      </DashboardSection>
      <DashboardSection>
        <ViewStudentLessons />
      </DashboardSection>
    </RoomDashboard>
  )
}
