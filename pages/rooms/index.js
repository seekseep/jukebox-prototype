import Page, { PageContainer, PageSection } from '@/components/parts/Page'

import Authorized from '@/components/features/Authorized'
import ViewAppNavigation from '@/components/features/ViewAppNavigation'
import ViewRoomsNavigation from '@rooms/components/features/rooms/ViewRoomsNavigation'
import ManageRooms from '@rooms/components/features/rooms/ManageRooms'

export default function Rooms () {
  return (
    <Authorized>
      <Page>
        <ViewAppNavigation />
        <PageContainer>
          <PageSection>
            <ViewRoomsNavigation />
          </PageSection>
          <PageSection>
            <ManageRooms />
          </PageSection>
        </PageContainer>
      </Page>
    </Authorized>
  )
}
