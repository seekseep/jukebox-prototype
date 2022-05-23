import Page, { PageContainer, PageSection } from '@/components/parts/Page'

import Authorized from '@/components/features/Authorized'
import ViewAppNavigation from '@/components/features/ViewAppNavigation'
import ViewRegisterRoomNavigation from '@schools/components/features/rooms/ViewRegisterRoomNavigation'
import RegisterRoom from '@schools/components/features/rooms/RegisterRoom'

export default function Schools () {
  return (
    <Authorized>
      <Page>
        <ViewAppNavigation />
        <PageContainer>
          <PageSection>
            <ViewRegisterRoomNavigation />
          </PageSection>
          <PageSection>
            <RegisterRoom />
          </PageSection>
        </PageContainer>
      </Page>
    </Authorized>
  )
}
