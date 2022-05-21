import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ManageSheetSchedules from '@/components/features/sheets/ManageSheetSchedules'
import ViewSheetNavigation from '@/components/features/sheets/ViewSheetNavigation'

export default function SheetSchedules () {
  return (
    <RoomDashboard title="席の予定の一覧">
      <DashboardSection>
        <ViewSheetNavigation />
      </DashboardSection>
      <DashboardSection>
        <ManageSheetSchedules />
      </DashboardSection>
    </RoomDashboard>
  )
}
