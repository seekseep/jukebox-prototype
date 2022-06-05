import { useRouter } from 'next/router'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'
import TabNavigation, {
  Tab
} from '@/components/parts/TabNavigation'

import { useGetSheetPath, useGetRoomPath } from '@rooms/hooks/router'
import { useSheetQuery } from '@rooms/hooks/sheets'

export default function ViewSheetNavigation () {
  const { query: { roomId, sheetId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)
  const getSheetPath = useGetSheetPath(roomId, sheetId)
  const { data: sheet } = useSheetQuery(roomId, sheetId)

  return (
    <>
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>🏠</BLink>
        <BLink href={getRoomPath('/sheets')}>席の一覧</BLink>
        <BCurrent>{sheet ? sheet.name : '席'}</BCurrent>
      </Breadcrumbs>
      <TabNavigation>
        <Tab href={getSheetPath('/')} exact>基本情報</Tab>
        <Tab href={getSheetPath('/schedules')}>予定</Tab>
      </TabNavigation>
    </>
  )
}
