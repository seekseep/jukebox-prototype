import { DashboardSection  } from '@/components/parts/dashboard'
import Breadcrumbs, {
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'

import RoomDashboard from '@/components/features/rooms/RoomDashboard'
import ViewFeatures from '@/components/features/rooms/ViewFeatures'

export default function Room () {
  return (
    <RoomDashboard title="ホーム">
      <Breadcrumbs>
        <BCurrent>🏠</BCurrent>
      </Breadcrumbs>
      <DashboardSection>
        <ViewFeatures />
      </DashboardSection>
    </RoomDashboard>
  )
}
