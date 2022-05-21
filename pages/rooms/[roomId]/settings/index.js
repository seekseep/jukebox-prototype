import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewSettingsNavigation from '@/components/features/rooms/ViewSettingsNavigation'
import ViewSettingItems from '@/components/features/rooms/ViewSettingItems'

export default function Settings () {
  return (
    <RoomDashboard title="教室の設定">
      <DashboardSection>
        <ViewSettingsNavigation />
      </DashboardSection>
      <DashboardSection>
        <ViewSettingItems />
      </DashboardSection>
    </RoomDashboard>
  )
}
