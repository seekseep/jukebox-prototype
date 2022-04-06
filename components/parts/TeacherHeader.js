import { useGetRoomLink } from '../../hooks/rooms'
import { useTeacher } from '../../hooks/teachers'

import TabNavigation, { Tab } from './TabNavigation'
import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent
} from './Breadcrumbs'

export default function TeacherHeader ({ roomId, teacherId }) {
  const teacher = useTeacher(teacherId)
  const getRoomLink = useGetRoomLink(roomId)

  if (!teacher) return null

  return (
    <>
      <Breadcrumbs>
        <BLink href={getRoomLink('/')}>ホーム</BLink>
        <BLink href={getRoomLink('/teachers')}>講師の一覧</BLink>
        <BCurrent>{teacher?.name}</BCurrent>
      </Breadcrumbs>
      <div className="px-4 flex flex-col gap-4">
        <h1 className="text-3xl py-2 text-gray-700">講師: {teacher?.name}</h1>
        <TabNavigation>
          <Tab exact href={getRoomLink(`/teachers/${teacherId}`)}>基本情報</Tab>
          <Tab href={getRoomLink(`/teachers/${teacherId}/subjects`)}>指導可能科目</Tab>
          <Tab href={getRoomLink(`/teachers/${teacherId}/schedule_rules`)}>基本的な予定</Tab>
          <Tab href={getRoomLink(`/teachers/${teacherId}/irregular_schedule`)}>不規則的な予定</Tab>
          <Tab href={getRoomLink(`/teachers/${teacherId}/relations`)}>関係性</Tab>
        </TabNavigation>
      </div>
    </>
  )
}
