import { useRouter } from 'next/router'

import { useGetRoomPath } from '@/hooks/router'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'

export default function ViewNewStudentNavigaion () {
  const { query: { roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  return (
    <Breadcrumbs>
      <BLink href={getRoomPath('/')}>🏠</BLink>
      <BLink href={getRoomPath('/students')}>生徒の一覧</BLink>
      <BCurrent>生徒の登録</BCurrent>
    </Breadcrumbs>
  )
}
