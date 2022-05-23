import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewRoomBasicNavigation from '@/modules/rooms/components/features/rooms/ViewRoomBasicNavigation'
import ManageRoom from '@/modules/rooms/components/features/rooms/ManageRoom'
import DeleteRoom from '@/modules/rooms/components/features/rooms/DeleteRoom'

export default function RoomBasic () {
  return (
    <RoomDashboard title="教室の基本情報">
      <DashboardSection>
        <ViewRoomBasicNavigation />
      </DashboardSection>
      <DashboardSection>
        <ManageRoom />
      </DashboardSection>
      <DashboardSection>
        <DeleteRoom />
      </DashboardSection>
    </RoomDashboard>
  )
}
