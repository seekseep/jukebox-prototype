import { useGetRoomLink } from '../../hooks/rooms'
import { useSubject } from '../../hooks/subjects'

import TabNavigation, { Tab } from './TabNavigation'
import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent
} from './Breadcrumbs'

export default function SettingsHeader ({ roomId }) {
  const getRoomLink = useGetRoomLink(roomId)

  return (
    <>
      <Breadcrumbs>
        <BLink href={getRoomLink('/')}>ホーム</BLink>
        <BCurrent>設定</BCurrent>
      </Breadcrumbs>
      <div className="px-4 flex flex-col gap-4">
        <h1 className="text-3xl py-2 text-gray-700">設定</h1>
        <TabNavigation>
          <Tab exact href={getRoomLink('/settings')}>基本情報</Tab>
          <Tab href={getRoomLink('/settings/schedule_rules')}>基本的な予定</Tab>
          <Tab href={getRoomLink('/settings/irregular_schedule')}>不規則な予定</Tab>
        </TabNavigation>
      </div>
    </>
  )
}
