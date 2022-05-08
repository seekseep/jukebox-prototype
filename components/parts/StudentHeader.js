import { useGetRoomPath } from '@/hooks/rooms'
import { useStudent } from '@/hooks/students'

import TabNavigation, { Tab } from './TabNavigation'
import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent
} from './Breadcrumbs'

export default function StudentHeader ({ schoolId, roomId, studentId }) {
  const { data: student } = useStudent(schoolId, roomId, studentId)
  const getRoomPath = useGetRoomPath(schoolId, roomId)

  if (!student) return null

  return (
    <>
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>ホーム</BLink>
        <BLink href={getRoomPath('/students')}>生徒の一覧</BLink>
        <BCurrent>{student?.name}</BCurrent>
      </Breadcrumbs>
      <div className="px-4 flex flex-col gap-4">
        <h1 className="text-3xl py-2 text-gray-700">{student?.name}</h1>
        <TabNavigation>
          <Tab exact href={getRoomPath(`/students/${studentId}`)}>基本情報</Tab>
          <Tab href={getRoomPath(`/students/${studentId}/subjects`)}>履修科目</Tab>
          <Tab href={getRoomPath(`/students/${studentId}/regular_schedule_rules`)}>基本的な予定</Tab>
          <Tab href={getRoomPath(`/students/${studentId}/irregular_schedule_rules`)}>不規則的な予定</Tab>
          <Tab href={getRoomPath(`/students/${studentId}/relations`)}>関係性</Tab>
        </TabNavigation>
      </div>
    </>
  )
}
