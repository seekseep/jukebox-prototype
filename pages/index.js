import Authorized from '@/components/features/Authorized'

import Page, { PageContainer, PageSection } from '@/components/parts/Page'

import ViewAppNavigation from '@/components/features/ViewAppNavigation'
import ViewCurrentUser from '@users/components/features/ViewCurrentUser'
import ViewFeatures from '@users/components/features/ViewFeatures'

export default function Home () {
  return (
    <Authorized>
      <Page title="JUKEBOX">
        <ViewAppNavigation />
        <ViewCurrentUser />
        <PageContainer>
          <PageSection>
            <ViewFeatures />
          </PageSection>
        </PageContainer>
      </Page>
    </Authorized>
  )
}
