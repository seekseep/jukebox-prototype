import { useRouter } from 'next/router'

import { useGetRoomLink } from '../../../../../hooks/rooms'
import { useSubjectsByRoomIdAndSubjectTagName } from '../../../../../hooks/subjects'

import Card, { CardActions } from '../../../../../components/parts/Card'
import { Button } from '../../../../../components/parts/buttons'
import Collection, { CollectionLinkItem, CollectionPlaceholder } from '../../../../../components/parts/Collection'
import RoomDashboard, {
  RoomDashboardSectionTitle,
  RoomDashboardSection
} from '../../../../../components/parts/RoomDashboard'
import Breadcrumbs, {
  BreadcrumbsLinkItem as BLink,
  BreadcrumbsCurrentItem as BCurrent
} from '../../../../../components/parts/Breadcrumbs'


export default function SubjectTag () {
  const { query: { roomId, tagName } } = useRouter()
  const getRoomLink = useGetRoomLink(roomId)

  const subjects = useSubjectsByRoomIdAndSubjectTagName(roomId, tagName)

  return (
    <RoomDashboard title={tagName} roomId={roomId}>
      <Breadcrumbs>
        <BLink href={getRoomLink('/')}>ホーム</BLink>
        <BLink href={getRoomLink('/subjects')}>科目</BLink>
        <BLink href={getRoomLink('/subjects/tags')}>科目分類</BLink>
        <BCurrent>{tagName}</BCurrent>
      </Breadcrumbs>
      <RoomDashboardSection>
        <RoomDashboardSectionTitle>科目</RoomDashboardSectionTitle>
        <Card>
          <CardActions>
            <Button sm>登録する</Button>
          </CardActions>
          {subjects && (
            <Collection>
              {subjects.length > 0 ? (
                subjects.map(subject => (
                  <CollectionLinkItem key={subject.id} href={getRoomLink(`/subjects/${subject.id}`)}>
                    <div className="flex">
                      <div className="flex-grow">{subject.name}</div>
                      <div className="w-32"></div>
                    </div>
                  </CollectionLinkItem>
                ))
              ) : (
                <CollectionPlaceholder>科目が登録されていません</CollectionPlaceholder>
              )}
            </Collection>
          )}
        </Card>
      </RoomDashboardSection>
    </RoomDashboard>
  )
}
