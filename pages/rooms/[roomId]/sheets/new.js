import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewNewSheetNavigation from '@/components/features/sheets/ViewNewSheetNavigation'
import RegisterSheet from '@/components/features/sheets/RegisterSheet'

export default function NewSheet () {
  return (
    <RoomDashboard title="席の登録">
      <DashboardSection>
        <ViewNewSheetNavigation />
      </DashboardSection>
      <DashboardSection>
        <RegisterSheet />
      </DashboardSection>
    </RoomDashboard>
  )
}
