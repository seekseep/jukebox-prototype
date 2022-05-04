import Link from 'next/link'

import { useGetAdminPath } from '../../../hooks/admin'
import { useSchools } from '../../../hooks/schools'

import ErrorAlert from '../../../components/parts/ErrorAlert'
import Loading from '../../../components/parts/Loading'
import Card, { CardActions } from '../../../components/parts/Card'
import Collection, { CollectionLinkItem, CollectionPlaceholder } from '../../../components/parts/Collection'
import { LinkButton } from '../../../components/parts/buttons'
import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent
} from '../../../components/parts/Breadcrumbs'

import AdminDashboard, { AdminDashboardSection,  AdminDashboardTitle } from '../../../components/parts/AdminDashboard'

export default function Schools () {
  const { data: schools, error } = useSchools()
  const getAdminPath = useGetAdminPath()

  return (
    <AdminDashboard title="学校の一覧">
      <Breadcrumbs>
        <BLink href={getAdminPath('/')}>ホーム</BLink>
        <BCurrent>学校の一覧</BCurrent>
      </Breadcrumbs>
      <AdminDashboardSection>
        <AdminDashboardTitle>学校の一覧</AdminDashboardTitle>
        {error && <ErrorAlert error={error} />}
        <Card>
          <CardActions>
            <LinkButton sm href={getAdminPath('/schools/new')}>学校を登録する</LinkButton>
          </CardActions>
          {schools ? (
            <Collection>
              {schools.length === 0 && (
                <CollectionPlaceholder>
                  学校が登録されていません
                </CollectionPlaceholder>
              )}
              {schools.map(school => (
                <CollectionLinkItem key={school.id} href={getAdminPath(`/schools/${school.id}`)}>
                  {school.name}
                </CollectionLinkItem>
              ))}
            </Collection>
          ) : (<Loading />)}
        </Card>
      </AdminDashboardSection>
    </AdminDashboard>
  )
}
