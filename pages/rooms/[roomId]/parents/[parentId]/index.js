import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewParentNavigation from '@/components/features/parents/ViewParentNavigation'
import ManageParent from '@/components/features/parents/ManageParent'
import DeleteParent from '@/components/features/parents/DeleteParent'

export default function Parent () {
  return (
    <RoomDashboard title="保護者">
      <DashboardSection>
        <ViewParentNavigation />
      </DashboardSection>
      <DashboardSection>
        <ManageParent />
      </DashboardSection>
      <DashboardSection>
        <DeleteParent />
      </DashboardSection>
    </RoomDashboard>
  )
}
