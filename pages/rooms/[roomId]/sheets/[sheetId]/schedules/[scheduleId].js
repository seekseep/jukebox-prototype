import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewSheetNavigation from '@/components/features/sheets/ViewSheetNavigation'
import ManageSheetSchedule from '@/components/features/sheets/ManageSheetSchedule'
import DeleteSheetSchedule from '@/components/features/sheets/DeleteSheetSchedule'

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
