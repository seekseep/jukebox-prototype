import { useRouter } from 'next/router'

import { useGetRoomPath } from '@/hooks/router'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'

export default function ViewLessonFrameNavigation () {
  const { query: { roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  return (
    <>
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>🏠</BLink>
        <BLink href={getRoomPath('/settings')}>教室の設定</BLink>
        <BLink href={getRoomPath('/settings/lessonFrames')}>授業枠の一覧</BLink>
        <BCurrent>授業枠</BCurrent>
      </Breadcrumbs>
    </>
  )
}
