import { useRouter } from 'next/router'

import { useGetRoomPath } from '@rooms/hooks/router'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'
import TabNavigation, {
  Tab
} from '@/components/parts/TabNavigation'

export default function ViewNewStudentNavigaion () {
  const { query: { roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  return (
    <>
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>🏠</BLink>
        <BLink href={getRoomPath('/students')}>生徒の一覧</BLink>
        <BCurrent>生徒の登録</BCurrent>
      </Breadcrumbs>
      <TabNavigation>
        <Tab href={getRoomPath('/students/new')}>単一登録</Tab>
        <Tab href={getRoomPath('/students/import')}>インポート</Tab>
      </TabNavigation>
    </>
  )
}
