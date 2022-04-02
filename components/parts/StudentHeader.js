import { useGetRoomLink } from "../../hooks/rooms";
import { useStudent } from "../../hooks/students";

import TabNavigation, { Tab } from './TabNavigation'
import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent
} from "./Breadcrumbs";

export default function StudentHeader ({ studentId }) {
  const student = useStudent(studentId)
  const roomId = student?.room.id
  const getRoomLink = useGetRoomLink(roomId)

  if (!student) return null

  return (
    <>
      <Breadcrumbs>
        <BLink href={getRoomLink("/")}>ホーム</BLink>
        <BLink href={getRoomLink("/students")}>生徒の一覧</BLink>
        <BCurrent>{student?.name}</BCurrent>
      </Breadcrumbs>
      <div className="px-4 flex flex-col gap-4">
        <h1 className="text-3xl py-2 text-gray-700">{student?.name}</h1>
        <TabNavigation>
          <Tab exact href={getRoomLink(`/students/${studentId}`)}>基本情報</Tab>
          <Tab href={getRoomLink(`/students/${studentId}/subjects`)}>履修科目</Tab>
          <Tab href={getRoomLink(`/students/${studentId}/schedule_rules`)}>基本的な予定</Tab>
          <Tab href={getRoomLink(`/students/${studentId}/irregular_schedule`)}>不規則的な予定</Tab>
          <Tab href={getRoomLink(`/students/${studentId}/relations`)}>関係性</Tab>
        </TabNavigation>
      </div>
    </>
  )
}
