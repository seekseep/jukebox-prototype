import Head from 'next/head'
import { useRouter } from 'next/router'

import { useSchool } from '@/hooks/schools'
import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'

export default function ViewSchoolNavigation () {
  const { query: { schoolId } } = useRouter()
  const { data: school } = useSchool(schoolId)

  return (
    <>
      <Head>
        <title>{school?.name || '学校'}</title>
      </Head>
      <Breadcrumbs>
        <BLink href={'/'}>ホーム</BLink>
        <BLink href={'/schools'}>学校の一覧</BLink>
        <BCurrent>{school?.name || '学校'}</BCurrent>
      </Breadcrumbs>
    </>
  )
}
