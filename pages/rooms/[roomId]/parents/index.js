import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewParentsNavigation from '@/components/features/parents/ViewParentsNavigation'
import ManageParents from '@/components/features/parents/ManageParents'

export default function Parents () {
  return (
    <RoomDashboard title="保護者の一覧">
      <DashboardSection>
        <ViewParentsNavigation />
      </DashboardSection>
      <DashboardSection>
        <ManageParents />
      </DashboardSection>
    </RoomDashboard>
  )
}
