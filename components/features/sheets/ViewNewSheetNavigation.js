import { useRouter } from 'next/router'

import { useGetRoomPath } from '@/hooks/router'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'

export default function ViewNewSheetNavigation () {
  const { query: { roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  return (
    <>
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>🏠</BLink>
        <BLink href={getRoomPath('/sheets')}>席の一覧</BLink>
        <BCurrent>席の登録</BCurrent>
      </Breadcrumbs>
    </>
  )
}
