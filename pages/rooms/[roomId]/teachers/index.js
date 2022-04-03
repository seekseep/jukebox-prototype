import Link from 'next/link'
import { useRouter } from 'next/router'

import { useGetRoomLink } from '../../../../hooks/rooms'
import { useTeachersByRoomId } from '../../../../hooks/teachers'

import Card, { CardActions } from '../../../../components/parts/Card'
import Collection, { CollectionLinkItem, CollectionPlaceholder } from '../../../../components/parts/Collection'
import RoomDashboard,{ RoomDashboardSection,  RoomDashboardTitle } from '../../../../components/parts/RoomDashboard'

import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent
} from '../../../../components/parts/Breadcrumbs'

export default function Teachers () {
  const { query: { roomId } } = useRouter()

  const teachers = useTeachersByRoomId(roomId)
  const getRoomLink = useGetRoomLink(roomId)

  return (
    <>
    <RoomDashboard roomId={roomId}>
      <Breadcrumbs>
        <BLink href={getRoomLink('/')}>ホーム</BLink>
        <BCurrent>講師一覧</BCurrent>
      </Breadcrumbs>
      <RoomDashboardSection>
        <RoomDashboardTitle>講師の一覧</RoomDashboardTitle>
        <Card>
          <CardActions>
            <Link href={getRoomLink('/teachers/new')}>
                <a className="bg-blue-500 text-white rounded p-2 text-sm">講師を登録する</a>
              </Link>
          </CardActions>
          <Collection>
            {teachers?.length > 0 ? teachers.map(teacher => (
              <CollectionLinkItem key={teacher.id} href={getRoomLink(`/teachers/${teacher.id}`)}>
                {teacher.name}
              </CollectionLinkItem>
            )) : (
              <CollectionPlaceholder>
                講師が登録されていません
              </CollectionPlaceholder>
            )}
          </Collection>
        </Card>
      </RoomDashboardSection>
    </RoomDashboard>
    </>
  )
}
