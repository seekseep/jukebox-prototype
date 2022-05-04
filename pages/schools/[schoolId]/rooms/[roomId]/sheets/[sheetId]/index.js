import { DashboardSection } from '../../../../../../../components/parts/dashboard'

import RoomDashboard from '../../../../../../../components/features/rooms/RoomDashboard'
import ManageSheet from '../../../../../../../components/features/sheets/ManageSheet'
import ViewSheetNavigation from '../../../../../../../components/features/sheets/ViewSheetNavigation'

export default function Sheet () {
  return (
    <RoomDashboard title="席">
      <ViewSheetNavigation />
      <DashboardSection>
        <ManageSheet />
      </DashboardSection>
    </RoomDashboard>
  )
}
