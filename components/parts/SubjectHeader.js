import Head from 'next/head'

import { useGetRoomPath } from '../../hooks/rooms'
import { useSubject } from '../../hooks/subjects'

import TabNavigation, { Tab } from './TabNavigation'
import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent
} from './Breadcrumbs'

export default function SubjectHeader ({ schoolId, roomId, subjectId }) {
  const getRoomPath = useGetRoomPath(schoolId, roomId)
  const { data: subject } = useSubject(schoolId, roomId, subjectId)

  return (
    <>
      <Head>
        <title>{`${subject?.name} | `}科目</title>
      </Head>
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>ホーム</BLink>
        <BLink href={getRoomPath('/subjects')}>科目</BLink>
        {subject && <BCurrent>{subject?.name}</BCurrent>}
      </Breadcrumbs>
      <div className="px-4 flex flex-col gap-4">
        {subject && <h1 className="text-3xl py-2 text-gray-700">{subject?.name}</h1>}
        <TabNavigation>
          <Tab exact href={getRoomPath(`/subjects/${subjectId}`)}>基本情報</Tab>
          <Tab exact href={getRoomPath(`/subjects/${subjectId}/students`)}>履修生徒</Tab>
          <Tab exact href={getRoomPath(`/subjects/${subjectId}/lessons`)}>授業</Tab>
          <Tab exact href={getRoomPath(`/subjects/${subjectId}/tags`)}>科目分類</Tab>
        </TabNavigation>
      </div>
    </>
  )
}
