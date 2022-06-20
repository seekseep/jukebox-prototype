import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewNewStudentNavigation from '@rooms/components/features/students/ViewNewStudentNavigation'
import ImportStudents from '@rooms/components/features/students/ImportStudents'

export default function NewStudent () {
  return (
    <RoomDashboard title="生徒のインポート">
      <DashboardSection>
        <ViewNewStudentNavigation />
      </DashboardSection>
      <DashboardSection>
        <ImportStudents />
      </DashboardSection>
    </RoomDashboard>
  )
}
