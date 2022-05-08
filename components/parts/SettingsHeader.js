import { useGetRoomPath } from '@/hooks/rooms'
import { useSubject } from '@/hooks/subjects'

import TabNavigation, { Tab } from './TabNavigation'
import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent
} from './Breadcrumbs'

export default function SettingsHeader ({ schoolId, roomId }) {
  const getRoomPath = useGetRoomPath(schoolId, roomId)

  return (
    <>
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>ホーム</BLink>
        <BCurrent>設定</BCurrent>
      </Breadcrumbs>
      <div className="px-4 flex flex-col gap-4">
        <h1 className="text-3xl py-2 text-gray-700">設定</h1>
        <TabNavigation>
          <Tab exact href={getRoomPath('/settings')}>基本情報</Tab>
          <Tab href={getRoomPath('/settings/frame_rules_sets')}>枠条件</Tab>
          <Tab href={getRoomPath('/settings/regular_schedule_rules')}>基本的な予定</Tab>
          <Tab href={getRoomPath('/settings/irregular_schedule_rules')}>不規則な予定</Tab>
        </TabNavigation>
      </div>
    </>
  )
}
