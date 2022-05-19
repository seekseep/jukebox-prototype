import { useRouter } from 'next/router'

import { useGetRoomPath } from '@/hooks/router'

import { useParent } from '@/hooks/parents'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'

export default function ViewParentNavigation () {
  const { query: { roomId, parentId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)
  const { data: parent } = useParent(roomId, parentId)

  return (
    <>
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>🏠</BLink>
        <BLink href={getRoomPath('/parents')}>保護者の一覧</BLink>
        <BCurrent>{parent ? parent.name : '保護者'}</BCurrent>
      </Breadcrumbs>
    </>
  )
}
