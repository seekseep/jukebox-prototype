import { useRouter } from 'next/router'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'
import TabNavigation, {
  Tab
} from '@/components/parts/TabNavigation'

import { useGetRoomPath, useGetSubjectPath } from '@rooms/hooks/router'
import { useSubjectQuery } from '@rooms/hooks/subjects'

export default function ViewSubjectLessonsNavigation () {
  const { query: { roomId, subjectId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)
  const getSubjectPath = useGetSubjectPath(roomId, subjectId)
  const { data: subject } = useSubjectQuery(roomId, subjectId)

  return (
    <>
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>🏠</BLink>
        <BLink href={getRoomPath('/subjects')}>科目の一覧</BLink>
        <BLink href={getRoomPath(`/subjects/${subjectId}`)}>{subject ? subject.name : '科目'}</BLink>
        <BCurrent>授業の一覧</BCurrent>
      </Breadcrumbs>
      <TabNavigation>
        <Tab href={getSubjectPath('/')} exact>基本情報</Tab>
        <Tab href={getSubjectPath('/lessons')}>授業</Tab>
      </TabNavigation>
    </>
  )
}
