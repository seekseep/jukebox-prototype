import { useRouter } from 'next/router'

import { useGetTeacherPath, useGetRoomPath } from '../../../hooks/router'

import { useTeacher } from '../../../hooks/teachers'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '../../parts/Breadcrumbs'
import TabNavigation, {
  Tab
} from '../../parts/TabNavigation'

export default function ViewTeacherNavigation () {
  const { query: { schoolId, roomId, teacherId } } = useRouter()
  const getRoomPath = useGetRoomPath(schoolId, roomId)
  const getTeacherPath = useGetTeacherPath(schoolId, roomId, teacherId)
  const { data: teacher } = useTeacher(schoolId, roomId, teacherId)

  return (
    <>
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>🏠</BLink>
        <BLink href={getRoomPath('/teachers')}>講師の一覧</BLink>
        <BCurrent>{teacher ? teacher.name : '講師'}</BCurrent>
      </Breadcrumbs>
      <TabNavigation>
        <Tab href={getTeacherPath('/')} exact>基本情報</Tab>
        <Tab href={getTeacherPath('/schedules')}>予定</Tab>
        <Tab href={getTeacherPath('/subjects')}>科目</Tab>
        <Tab href={getTeacherPath('/relations')}>関係性</Tab>
      </TabNavigation>
    </>
  )
}
