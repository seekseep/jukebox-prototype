import { useRouter } from 'next/router'

import { useGetRoomPath } from '@/hooks/router'

import { useSubject } from '@/hooks/subjects'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'
import TabNavigation, {
  Tab
} from '@/components/parts/TabNavigation'

export default function ViewNewSubjectLessonNavigation () {
  const { query: { roomId, subjectId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)
  const { data: subject } = useSubject(roomId, subjectId)

  return (
    <>
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>🏠</BLink>
        <BLink href={getRoomPath('/subjects')}>科目の一覧</BLink>
        <BLink href={getRoomPath(`/subjects/${subjectId}`)}>{subject?.name || '科目'}</BLink>
        <BLink href={getRoomPath(`/subjects/${subjectId}/lessons`)}>授業の一覧</BLink>
        <BCurrent>授業の登録</BCurrent>
      </Breadcrumbs>
      <TabNavigation>
        <Tab href={getRoomPath(`/subjects/${subjectId}/lessons/new`)} exact>単一</Tab>
        <Tab href={getRoomPath(`/subjects/${subjectId}/lessons/new/multi`)}>複数</Tab>
      </TabNavigation>
    </>
  )
}
