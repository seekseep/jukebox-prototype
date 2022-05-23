import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewSheetNavigation from '@/modules/rooms/components/features/sheets/ViewSheetNavigation'
import RegisterSheetSchedule from '@/modules/rooms/components/features/sheets/RegisterSheetSchedule'

export default function NewSheetSchedule () {
  return (
    <RoomDashboard title="席の予定の登録">
      <DashboardSection>
        <ViewSheetNavigation />
      </DashboardSection>
      <DashboardSection>
        <RegisterSheetSchedule />
      </DashboardSection>
    </RoomDashboard>
  )
}
