import { useRouter } from 'next/router'

import { useGetRoomPath } from '@rooms/hooks/router'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'

export default function ViewNewTeacherNavigaion () {
  const { query: { roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  return (
    <Breadcrumbs>
      <BLink href={getRoomPath('/')}>🏠</BLink>
      <BLink href={getRoomPath('/teachers')}>講師の一覧</BLink>
      <BCurrent>講師の登録</BCurrent>
    </Breadcrumbs>
  )
}
