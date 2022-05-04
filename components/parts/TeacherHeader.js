import { useGetRoomPath } from '../../hooks/rooms'
import { useTeacher } from '../../hooks/teachers'

import TabNavigation, { Tab } from './TabNavigation'
import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent
} from './Breadcrumbs'

export default function TeacherHeader ({ schoolId, roomId, teacherId }) {
  const { data: teacher } = useTeacher(schoolId, roomId, teacherId)
  const getRoomPath = useGetRoomPath(schoolId, roomId)

  if (!teacher) return null

  return (
    <>
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>ホーム</BLink>
        <BLink href={getRoomPath('/teachers')}>講師の一覧</BLink>
        <BCurrent>{teacher?.name}</BCurrent>
      </Breadcrumbs>
      <div className="px-4 flex flex-col gap-4">
        <h1 className="text-3xl py-2 text-gray-700">{teacher?.name}</h1>
        <TabNavigation>
          <Tab exact href={getRoomPath(`/teachers/${teacherId}`)}>基本情報</Tab>
          <Tab href={getRoomPath(`/teachers/${teacherId}/subjects`)}>履修科目</Tab>
          <Tab href={getRoomPath(`/teachers/${teacherId}/regular_schedule_rules`)}>基本的な予定</Tab>
          <Tab href={getRoomPath(`/teachers/${teacherId}/irregular_schedule_rules`)}>不規則的な予定</Tab>
          <Tab href={getRoomPath(`/teachers/${teacherId}/relations`)}>関係性</Tab>
        </TabNavigation>
      </div>
    </>
  )
}
