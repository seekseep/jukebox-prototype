import { useRouter } from 'next/router'

import { useGetRoomLink } from '../../../../hooks/rooms'
import { useSubjectsByRoomId } from '../../../../hooks/subjects'

import Card, { CardActions } from '../../../../components/parts/Card'
import { LinkButton } from '../../../../components/parts/buttons'
import Collection, { CollectionLinkItem, CollectionPlaceholder } from '../../../../components/parts/Collection'
import RoomDashboard, { RoomDashboardSection } from '../../../../components/parts/RoomDashboard'
import SubjectsHeader from '../../../../components/parts/SubjectsHeader'


export default function Subejcts () {
  const { query: { roomId } } = useRouter()
  const getRoomLink = useGetRoomLink(roomId)

  const subjects = useSubjectsByRoomId(roomId)

  return (
    <RoomDashboard roomId={roomId}>
      <SubjectsHeader roomId={roomId} />
      <RoomDashboardSection>
        <Card>
          <CardActions>
            <LinkButton sm href={getRoomLink('/subjects/new')}>科目を登録する</LinkButton>
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
