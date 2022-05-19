import { useRouter } from 'next/router'

import { useGetRoomPath } from '@/hooks/router'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent,
} from '@/components/parts/Breadcrumbs'

export default function ViewNewSubjectNavigaion () {
  const { query: { roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)

  return (
    <Breadcrumbs>
      <BLink href={getRoomPath('/')}>🏠</BLink>
      <BLink href={getRoomPath('/subjects')}>科目の一覧</BLink>
      <BCurrent>科目の登録</BCurrent>
    </Breadcrumbs>
  )
}
