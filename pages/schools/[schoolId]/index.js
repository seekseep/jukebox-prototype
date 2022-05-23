import Page, { PageContainer, PageSection } from '@/components/parts/Page'

import Authorized from '@/components/features/Authorized'
import ViewAppNavigation from '@/components/features/ViewAppNavigation'
import ViewSchoolNavigation from '@schools/components/features/schools/ViewSchoolNavigation'
import ManageSchool from '@schools/components/features/schools/ManageSchool'
import ManageSchoolRooms from '@schools/components/features/rooms/ManageSchoolRooms'

export default function Schools () {
  return (
    <Authorized>
      <Page>
        <ViewAppNavigation />
        <PageContainer>
          <PageSection>
            <ViewSchoolNavigation />
          </PageSection>
          <PageSection>
            <ManageSchool />
          </PageSection>
          <PageSection>
            <ManageSchoolRooms />
          </PageSection>
        </PageContainer>
      </Page>
    </Authorized>
  )
}
