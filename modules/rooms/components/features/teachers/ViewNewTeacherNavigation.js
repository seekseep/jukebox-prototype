import { useRouter } from 'next/router'

import { useGetRoomPath } from '@rooms/hooks/router'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'
import TabNavigation, {
  Tab
} from '@/components/parts/TabNavigation'

export default function ViewNewTeacherNavigaion () {
  const { query: { roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  return (
    <>
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>🏠</BLink>
        <BLink href={getRoomPath('/teachers')}>講師の一覧</BLink>
        <BCurrent>講師の登録</BCurrent>
      </Breadcrumbs>
      <TabNavigation>
        <Tab href={getRoomPath('/teachers/new')}>単一登録</Tab>
        <Tab href={getRoomPath('/teachers/import')}>インポート</Tab>
      </TabNavigation>
    </>
  )
}
