import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewParentNavigation from '@rooms/components/features/parents/ViewParentNavigation'
import ManageParent from '@rooms/components/features/parents/ManageParent'
import DeleteParent from '@rooms/components/features/parents/DeleteParent'

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
