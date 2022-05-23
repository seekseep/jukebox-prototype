import Head from 'next/head'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'

export default function ViewRegisterSchoolNavigation () {
  return (
    <>
      <Head>
        <title>学校の登録</title>
      </Head>
      <Breadcrumbs>
        <BLink href={'/'}>ホーム</BLink>
        <BLink href={'/schools'}>学校の一覧</BLink>
        <BCurrent>学校の登録</BCurrent>
      </Breadcrumbs>
    </>
  )
}
