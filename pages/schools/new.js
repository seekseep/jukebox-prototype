import Page, { PageContainer, PageSection } from '@/components/parts/Page'

import Authorized from '@/components/features/Authorized'
import ViewAppNavigation from '@/components/features/ViewAppNavigation'
import ViewSchoolsNavigation from '@/modules/schools/components/features/schools/ViewRegisterSchoolNavigation'
import RegisterSchool from '@schools/components/features/schools/RegisterSchool'

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
            <RegisterSchool />
          </PageSection>
        </PageContainer>
      </Page>
    </Authorized>
  )
}
