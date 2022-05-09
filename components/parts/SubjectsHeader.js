import { useGetRoomPath } from '@/hooks/rooms'
import { useStudent } from '@/hooks/students'

import TabNavigation, { Tab } from './TabNavigation'
import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent
} from './Breadcrumbs'

export default function SubjectsHeader ({ schoolId, roomId }) {
  const getRoomPath = useGetRoomPath(schoolId, roomId)

  return (
    <>
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>ホーム</BLink>
        <BCurrent>科目</BCurrent>
      </Breadcrumbs>
      <div className="px-4 flex flex-col gap-4">
        <h1 className="text-3xl py-2 text-gray-700">科目</h1>
        <TabNavigation>
          <Tab exact href={getRoomPath('/subjects')}>科目の一覧</Tab>
          <Tab href={getRoomPath('/subjects/tags')}>科目分類の一覧</Tab>
        </TabNavigation>
      </div>
    </>
  )
}