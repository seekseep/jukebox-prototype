import Page, { PageContainer, PageSection } from '@/components/parts/Page'

import Authorized from '@/components/features/Authorized'
import ViewAppNavigation from '@/components/features/ViewAppNavigation'
import ManageUser from '@users/components/features/ManageUser'
import DeleteUser from '@users/components/features/DeleteUser'

export default function User () {
  return (
    <Authorized>
      <Page>
        <ViewAppNavigation />
        <PageContainer>
          <PageSection>
            <ManageUser />
          </PageSection>
          <PageSection>
            <DeleteUser />
          </PageSection>
        </PageContainer>
      </Page>
    </Authorized>
  )
}
