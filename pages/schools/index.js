import Page, { PageContainer, PageSection } from '@/components/parts/Page'

import Authorized from '@/components/features/Authorized'
import ViewAppNavigation from '@/components/features/ViewAppNavigation'
import ViewSchoolsNavigation from '@/modules/schools/components/features/schools/ViewSchoolsNavigation'
import ManageSchools from '@/modules/schools/components/features/schools/ManageSchools'

export default function Schools () {
  return (
    <Authorized>
      <Page>
        <ViewAppNavigation />
        <PageContainer>
          <PageSection>
            <ViewSchoolsNavigation />
          </PageSection>
          <PageSection>
            <ManageSchools />
          </PageSection>
        </PageContainer>
      </Page>
    </Authorized>
  )
}
