import { DashboardSection  } from '@/components/parts/dashboard'
import Breadcrumbs, {
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'
import Authorized from '@/components/features/Authorized'

import RoomDashboard from '@rooms/components/features/rooms/RoomDashboard'
import ViewFeatures from '@rooms/components/features/rooms/ViewFeatures'

export default function Room () {
  return (
    <Authorized>
      <RoomDashboard title="γγΌγ ">
        <DashboardSection>
          <Breadcrumbs>
            <BCurrent>π </BCurrent>
          </Breadcrumbs>
        </DashboardSection>
        <DashboardSection>
          <ViewFeatures />
        </DashboardSection>
      </RoomDashboard>
    </Authorized>
  )
}
