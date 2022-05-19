import { DashboardSection } from '@/components/parts/dashboard'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ManageSheet from '@/components/features/sheets/ManageSheet'
import DeleteSheet from '@/components/features/sheets/DeleteSheet'
import ViewSheetNavigation from '@/components/features/sheets/ViewSheetNavigation'

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
