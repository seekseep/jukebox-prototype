import { useRouter } from 'next/router'

import { useGetSheetPath, useGetRoomPath } from '../../../hooks/router'

import { useSheet } from '../../../hooks/sheets'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '../../parts/Breadcrumbs'
import TabNavigation, {
  Tab
} from '../../parts/TabNavigation'

export default function ViewSheetNavigation () {
  const { query: { schoolId, roomId, sheetId } } = useRouter()
  const getRoomPath = useGetRoomPath(schoolId, roomId)
  const getSheetPath = useGetSheetPath(schoolId, roomId, sheetId)
  const { data: sheet } = useSheet(schoolId, roomId, sheetId)

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
