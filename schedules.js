import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ManageSheetSchedules from '@/modules/rooms/components/features/sheets/ManageSheetSchedules'
import ViewSheetNavigation from '@/modules/rooms/components/features/sheets/ViewSheetNavigation'

export default function Sheet () {
  return (
    <RoomDashboard title="席の予定">
      <ViewSheetNavigation />
      <DashboardSection>
        <ManageSheetSchedules />
      </DashboardSection>
    </RoomDashboard>
  )
}
