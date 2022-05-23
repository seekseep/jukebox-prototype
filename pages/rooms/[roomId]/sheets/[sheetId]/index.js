import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ManageSheet from '@/modules/rooms/components/features/sheets/ManageSheet'
import DeleteSheet from '@/modules/rooms/components/features/sheets/DeleteSheet'
import ViewSheetNavigation from '@/modules/rooms/components/features/sheets/ViewSheetNavigation'

export default function Sheet () {
  return (
    <RoomDashboard title="席">
      <DashboardSection>
        <ViewSheetNavigation />
      </DashboardSection>
      <DashboardSection>
        <ManageSheet />
      </DashboardSection>
      <DashboardSection>
        <DeleteSheet />
      </DashboardSection>
    </RoomDashboard>
  )
}
