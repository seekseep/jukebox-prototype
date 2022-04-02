import { useRouter } from 'next/router'

import { useGetRoomLink } from '../../../../../hooks/rooms'
import { useSubjectGroupsByRoomId } from '../../../../../hooks/subjectGroups'

import Card, { CardActions } from '../../../../../components/parts/Card'
import { LinkButton } from '../../../../../components/parts/buttons'
import Collection, { CollectionLinkItem, CollectionPlaceholder } from '../../../../../components/parts/Collection'
import RoomDashboard, { RoomDashboardSection } from '../../../../../components/parts/RoomDashboard'
import SubjectsHeader from '../../../../../components/parts/SubjectsHeader'

export default function SubejctGroups () {
  const { query: { roomId }} = useRouter()
  const getRoomLink = useGetRoomLink(roomId)

  const subjectGroups = useSubjectGroupsByRoomId(roomId)

  return (
    <RoomDashboard roomId={roomId}>
      <SubjectsHeader roomId={roomId} />
      <RoomDashboardSection>
        <Card>
          <CardActions>
            <LinkButton sm href={getRoomLink('/subjects/new')}>科目分類を登録する</LinkButton>
          </CardActions>
          {subjectGroups && (
            <Collection>
              {subjectGroups.length > 0 ? (
                subjectGroups.map(subjectGroup => (
                  <CollectionLinkItem key={subjectGroup.id} href={getRoomLink(`/subject/subject_groups/${subjectGroup.id}`)}>
                    <div className="flex">
                      <div className="flex-grow">{subjectGroup.name}</div>
                      <div className="w-32"></div>
                    </div>
                  </CollectionLinkItem>
                ))
              ) : (
                <CollectionPlaceholder>科目分類が登録されていません</CollectionPlaceholder>
              )}
            </Collection>
          )}
        </Card>
      </RoomDashboardSection>
    </RoomDashboard>
  )
}
