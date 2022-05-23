import Head from 'next/head'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'

export default function ViewRoomsNavigation () {
  return (
    <>
      <Head>
        <title>教室の一覧</title>
      </Head>
      <Breadcrumbs>
        <BLink href={'/'}>ホーム</BLink>
        <BCurrent>教室の一覧</BCurrent>
      </Breadcrumbs>
    </>
  )
}
