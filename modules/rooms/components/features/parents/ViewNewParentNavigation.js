import { useRouter } from 'next/router'

import { useGetRoomPath } from '@rooms/hooks/router'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'

export default function ViewNewParentNavigation () {
  const { query: { roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  return (
    <>
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>🏠</BLink>
        <BLink href={getRoomPath('/parents')}>保護者の一覧</BLink>
        <BCurrent>保護者の登録</BCurrent>
      </Breadcrumbs>
    </>
  )
}
