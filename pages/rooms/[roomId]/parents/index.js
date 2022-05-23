import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewParentsNavigation from '@rooms/components/features/parents/ViewParentsNavigation'
import ManageParents from '@rooms/components/features/parents/ManageParents'

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
