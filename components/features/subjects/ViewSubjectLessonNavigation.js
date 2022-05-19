import { useRouter } from 'next/router'

import { useGetRoomPath } from '@/hooks/router'
import { useSubject } from '@/hooks/subjects'
import { useLesson } from '@/hooks/lessons'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'

export default function ViewLessonNavigation () {
  const { query: { roomId, subjectId, lessonId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)
  const { data: subject } = useSubject(roomId, subjectId)
  const { data: lesson } = useLesson(roomId, lessonId)

  return (
    <>
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>🏠</BLink>
        <BLink href={getRoomPath('/subjects')}>科目の一覧</BLink>
        <BLink href={getRoomPath(`/subjects/${subjectId}`)}>{subject?.name || '科目'}</BLink>
        <BLink href={getRoomPath(`/subjects/${subjectId}/lessons`)}>授業の一覧</BLink>
        <BCurrent>{lesson?.name || '授業'}</BCurrent>
      </Breadcrumbs>
    </>
  )
}
