import { useGetRoomLink } from '../../hooks/rooms'
import { useSubject } from '../../hooks/subjects'

import TabNavigation, { Tab } from './TabNavigation'
import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent
} from './Breadcrumbs'

export default function SubjectHeader ({ subjectId }) {
  const subject = useSubject(subjectId)
  const getRoomLink = useGetRoomLink(subject?.room?.id)

  return (
    <>
      <Breadcrumbs>
        <BLink href={getRoomLink('/')}>ホーム</BLink>
        <BLink href={getRoomLink('/subjects')}>科目</BLink>
        {subject && <BCurrent>{subject?.name}</BCurrent>}
      </Breadcrumbs>
      <div className="px-4 flex flex-col gap-4">
        {subject && <h1 className="text-3xl py-2 text-gray-700">{subject?.name}</h1>}
        <TabNavigation>
          <Tab exact href={getRoomLink(`/subjects/${subjectId}`)}>基本情報</Tab>
          <Tab exact href={getRoomLink(`/subjects/${subjectId}/students`)}>履修生徒</Tab>
          <Tab exact href={getRoomLink(`/subjects/${subjectId}/lessons`)}>授業</Tab>
          <Tab exact href={getRoomLink(`/subjects/${subjectId}/subject_groups`)}>科目分類</Tab>
        </TabNavigation>
      </div>
    </>
  )
}
