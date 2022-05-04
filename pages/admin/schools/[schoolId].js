import { useRouter } from 'next/router'

import { useGetAdminPath } from '../../../hooks/admin'
import { useSchool } from '../../../hooks/schools'

import ErrorAlert from '../../../components/parts/ErrorAlert'
import Loading from '../../../components/parts/Loading'
import Card, { CardActions } from '../../../components/parts/Card'
import { Button } from '../../../components/parts/buttons'
import PropertySet, {
  PropertyItem,
  PropertyLabel,
  PropertyContents
} from '../../../components/parts/PropertySet'
import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent
} from '../../../components/parts/Breadcrumbs'

import AdminDashboard, { AdminDashboardSection,  AdminDashboardTitle } from '../../../components/parts/AdminDashboard'

export default function School () {
  const { query: { schoolId } } = useRouter()
  const { data: school, error, isLoading } = useSchool(schoolId)

  const getAdminPath = useGetAdminPath()

  const title = school?.name ?? '学校'

  return (
    <AdminDashboard>
      <Breadcrumbs>
        <BLink href={getAdminPath('/')}>ホーム</BLink>
        <BLink href={getAdminPath('/schools')}>学校の一覧</BLink>
        <BCurrent>{title}</BCurrent>
      </Breadcrumbs>
      <AdminDashboardSection>
        <AdminDashboardTitle>{title}</AdminDashboardTitle>
        {error && <ErrorAlert error={error} />}
        <Card>
          {isLoading && <Loading />}
          {school && (
            <>
              <CardActions>
                <Button secondary>編集する</Button>
              </CardActions>
              <PropertySet>
                <PropertyItem>
                  <PropertyLabel>名称</PropertyLabel>
                  <PropertyContents>{school.name}</PropertyContents>
                </PropertyItem>
              </PropertySet>
            </>
          )}
        </Card>
      </AdminDashboardSection>
    </AdminDashboard>
  )
}
