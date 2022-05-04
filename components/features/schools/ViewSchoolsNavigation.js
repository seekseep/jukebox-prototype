import Head from 'next/head'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '../../parts/Breadcrumbs'

export default function ViewSchoolsNavigation () {
  return (
    <>
      <Head>
        <title>学校の一覧</title>
      </Head>
      <Breadcrumbs>
        <BLink href={'/'}>ホーム</BLink>
        <BCurrent>学校の一覧</BCurrent>
      </Breadcrumbs>
    </>
  )
}
