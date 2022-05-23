import { DashboardSection  } from '@/components/parts/dashboard'
import Breadcrumbs, {
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewFeatures from '@rooms/components/features/rooms/ViewFeatures'

export default function Room () {
  return (
    <RoomDashboard title="ホーム">
      <DashboardSection>
        <Breadcrumbs>
          <BCurrent>🏠</BCurrent>
        </Breadcrumbs>
      </DashboardSection>
      <DashboardSection>
        <ViewFeatures />
      </DashboardSection>
    </RoomDashboard>
  )
}
