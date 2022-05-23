import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSchool } from '@schools/hooks/schools'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'

export default function ViewRegisterSchoolNavigation () {
  const { query: { schoolId } } = useRouter()
  const { data: school } = useSchool(schoolId)
  return (
    <>
      <Head>
        <title>教室の登録</title>
      </Head>
      <Breadcrumbs>
        <BLink href={'/'}>ホーム</BLink>
        <BLink href={'/schools'}>学校の一覧</BLink>
        <BLink href={`/schools/${schoolId}`}>{school?.name || '学校'}</BLink>
        <BCurrent>教室の登録</BCurrent>
      </Breadcrumbs>
    </>
  )
}
