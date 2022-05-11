import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewStudentNavigation from '@/components/features/students/ViewStudentNavigation'
import RegisterStudentRelation from '@/components/features/students/RegisterStudentRelation'

export default function NewStudentRelation () {
  return (
    <RoomDashboard title="生徒の関係性の登録">
      <ViewStudentNavigation />
      <DashboardSection>
        <RegisterStudentRelation />
      </DashboardSection>
    </RoomDashboard>
  )
}
