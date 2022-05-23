import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewSheetNavigation from '@/modules/rooms/components/features/sheets/ViewSheetNavigation'
import ManageSheetSchedule from '@/modules/rooms/components/features/sheets/ManageSheetSchedule'
import DeleteSheetSchedule from '@/modules/rooms/components/features/sheets/DeleteSheetSchedule'

export default function SheetSchedule () {
  return (
    <RoomDashboard title="席の予定">
      <DashboardSection>
        <ViewSheetNavigation />
      </DashboardSection>
      <DashboardSection>
        <ManageSheetSchedule />
      </DashboardSection>
      <DashboardSection>
        <DeleteSheetSchedule />
      </DashboardSection>
    </RoomDashboard>
  )
}
