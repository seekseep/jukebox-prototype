import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewStudentNavigation from '@rooms/components/features/students/ViewStudentNavigation'
import RegisterStudentRelation from '@rooms/components/features/students/RegisterStudentRelation'

export default function NewStudentRelation () {
  return (
    <RoomDashboard title="生徒の関係の登録">
      <DashboardSection>
        <ViewStudentNavigation />
      </DashboardSection>
      <DashboardSection>
        <RegisterStudentRelation />
      </DashboardSection>
    </RoomDashboard>
  )
}
