import { useRouter } from 'next/router'
import {  useGetRoomPath } from '@rooms/hooks/router'
import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'

export default function ViewSheetNavigation () {
  const { query: { roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  return (
    <>
      <Breadcrumbs>
        <BLink href={getRoomPath('/')}>🏠</BLink>
        <BCurrent>席の一覧</BCurrent>
      </Breadcrumbs>
    </>
  )
}
