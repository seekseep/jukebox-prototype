import { useRouter } from 'next/router'

import { useGetStudentPath, useGetRoomPath } from '@/hooks/router'

import { useStudent } from '@/hooks/students'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'
import TabNavigation, {
  Tab
} from '@/components/parts/TabNavigation'

export default function ViewStudentNavigation () {
  const { query: { roomId, studentId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)
  const getStudentPath = useGetStudentPath(roomId, studentId)
  const { data: student } = useStudent(roomId, studentId)

  return (
    <>
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>🏠</BLink>
        <BLink href={getRoomPath('/students')}>生徒の一覧</BLink>
        <BCurrent>{student ? student.name : '生徒'}</BCurrent>
      </Breadcrumbs>
      <TabNavigation>
        <Tab href={getStudentPath('/')} exact>基本情報</Tab>
        <Tab href={getStudentPath('/schedules')}>予定</Tab>
        <Tab href={getStudentPath('/subjects')}>科目</Tab>
        <Tab href={getStudentPath('/relations')}>関係性</Tab>
      </TabNavigation>
    </>
  )
}
