import { useRouter } from 'next/router'

import { useGetRoomPath } from '@rooms/hooks/router'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'
import TabNavigation, {
  Tab
} from '@/components/parts/TabNavigation'

export default function ViewSubjectLessonsNavigation () {
  const { query: { roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  return (
    <>
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>🏠</BLink>
        <BCurrent>授業の一覧</BCurrent>
      </Breadcrumbs>
      <TabNavigation>
        <Tab href={getRoomPath('/lessons')} exact>カレンダー</Tab>
        <Tab href={getRoomPath('/lessons/list')}>一覧</Tab>
      </TabNavigation>
    </>
  )
}
