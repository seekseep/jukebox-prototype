import { useRouter } from 'next/router'

import { useGetRoomPath } from '@/hooks/router'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'
import TabNavigation, {
  Tab
} from '@/components/parts/TabNavigation'

export default function ViewNewLessonNavigation () {
  const { query: { roomId, subjectId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  return (
    <>
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>🏠</BLink>
        <BLink href={getRoomPath('/lessons')}>授業の一覧</BLink>
        <BCurrent>授業の登録</BCurrent>
      </Breadcrumbs>
      <TabNavigation>
        <Tab href={getRoomPath('/lessons/new')} exact>単一</Tab>
        <Tab href={getRoomPath('/lessons/new/multi')}>複数</Tab>
      </TabNavigation>
    </>
  )
}
