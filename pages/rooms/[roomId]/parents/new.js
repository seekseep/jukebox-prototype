import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewNewParentNavigation from '@/components/features/parents/ViewNewParentNavigation'
import RegisterParent from '@/components/features/parents/RegisterParent'

export default function NewParent () {
  return (
    <RoomDashboard title="保護者の登録">
      <DashboardSection>
        <ViewNewParentNavigation />
      </DashboardSection>
      <DashboardSection>
        <RegisterParent />
      </DashboardSection>
    </RoomDashboard>
  )
}
