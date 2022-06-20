import { useRouter } from 'next/router'

import { useGetTeacherPath, useGetRoomPath } from '@rooms/hooks/router'

import { useTeacherQuery } from '@rooms/hooks/teachers'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'
import TabNavigation, {
  Tab
} from '@/components/parts/TabNavigation'

export default function ViewTeacherNavigation () {
  const { query: { roomId, teacherId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)
  const getTeacherPath = useGetTeacherPath(roomId, teacherId)
  const { data: teacher } = useTeacherQuery(roomId, teacherId)

  return (
    <>
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>🏠</BLink>
        <BLink href={getRoomPath('/teachers')}>講師の一覧</BLink>
        <BCurrent>{teacher ? teacher.name : '講師'}</BCurrent>
      </Breadcrumbs>
      <TabNavigation>
        <Tab href={getTeacherPath('/')} exact>基本情報</Tab>
        <Tab href={getTeacherPath('/calendar')}>カレンダー</Tab>
        <Tab href={getTeacherPath('/lessons')}>授業</Tab>
        <Tab href={getTeacherPath('/subjects')}>科目</Tab>
        <Tab href={getTeacherPath('/schedules')}>予定</Tab>
        <Tab href={getTeacherPath('/relations')}>関係性</Tab>
      </TabNavigation>
    </>
  )
}
