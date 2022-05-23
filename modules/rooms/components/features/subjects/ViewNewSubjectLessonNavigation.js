import { useRouter } from 'next/router'

import { useGetRoomPath } from '@rooms/hooks/router'

import { useSubjectQuery } from '@rooms/hooks/subjects'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'

export default function ViewNewSubjectLessonNavigation () {
  const { query: { roomId, subjectId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)
  const { data: subject } = useSubjectQuery(roomId, subjectId)

  return (
    <>
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>🏠</BLink>
        <BLink href={getRoomPath('/subjects')}>科目の一覧</BLink>
        <BLink href={getRoomPath(`/subjects/${subjectId}`)}>{subject?.name || '科目'}</BLink>
        <BLink href={getRoomPath(`/subjects/${subjectId}/lessons`)}>授業の一覧</BLink>
        <BCurrent>授業の登録</BCurrent>
      </Breadcrumbs>
    </>
  )
}
