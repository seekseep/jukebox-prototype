import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewSheetsNavigation from '@/components/features/sheets/ViewSheetsNavigation'
import ManageSheets from '@/components/features/sheets/ManageSheets'

export default function Sheets () {
  return (
    <RoomDashboard title="席の一覧">
      <DashboardSection>
        <ViewSheetsNavigation />
      </DashboardSection>
      <DashboardSection>
        <ManageSheets />
      </DashboardSection>
    </RoomDashboard>
  )
}
