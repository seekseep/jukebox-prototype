import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ManageSheetSchedules from '@/components/features/sheets/ManageSheetSchedules'
import ViewSheetNavigation from '@/components/features/sheets/ViewSheetNavigation'

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
