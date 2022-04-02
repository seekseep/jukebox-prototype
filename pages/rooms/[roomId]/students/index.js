import Link from 'next/link'
import { useRouter } from 'next/router'

import { useGetRoomLink } from '../../../../hooks/rooms'
import { useStudentsByRoomId } from '../../../../hooks/students'

import Card, { CardActions } from '../../../../components/parts/Card'
import Collection, { CollectionLinkItem, CollectionPlaceholder } from '../../../../components/parts/Collection'
import RoomDashboard,{ RoomDashboardSection,  RoomDashboardTitle } from '../../../../components/parts/RoomDashboard'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent
} from '../../../../components/parts/Breadcrumbs'

export default function Students () {
  const { query: { roomId }} = useRouter()

  const students = useStudentsByRoomId(roomId)
  const getRoomLink = useGetRoomLink(roomId)

  return (
    <>
    <RoomDashboard roomId={roomId}>
      <Breadcrumbs>
        <BLink href={getRoomLink('/')}>ホーム</BLink>
        <BCurrent>生徒一覧</BCurrent>
      </Breadcrumbs>
      <RoomDashboardSection>
        <RoomDashboardTitle>生徒の一覧</RoomDashboardTitle>
        <Card>
          <CardActions>
            <Link href={getRoomLink('/students/new')}>
                <a className="bg-blue-500 text-white rounded p-2 text-sm">生徒を登録する</a>
              </Link>
          </CardActions>
          <Collection>
            {students?.length > 0 ? students.map(student => (
              <CollectionLinkItem key={student.id} href={getRoomLink(`/students/${student.id}`)}>
                {student.name}
              </CollectionLinkItem>
            )) : (
              <CollectionPlaceholder>
                生徒が登録されていません
              </CollectionPlaceholder>
            )}
          </Collection>
        </Card>
      </RoomDashboardSection>
    </RoomDashboard>
    </>
  )
}
