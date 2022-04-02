import { useRouter } from 'next/router'

import { useGetRoomLink } from '../../../../../hooks/rooms'
import { useSubjectGroupsBySubjectId } from '../../../../../hooks/subjectGroups'

import Card, { CardActions } from '../../../../../components/parts/Card'
import { LinkButton } from '../../../../../components/parts/buttons'
import Collection, { CollectionPlaceholder, CollectionLinkItem } from '../../../../../components/parts/Collection'
import RoomDashboard, { RoomDashboardSection } from '../../../../../components/parts/RoomDashboard'
import SubjectHeader from '../../../../../components/parts/SubjectHeader'

export default function SubejctGroups () {
  const { query: { roomId, subjectId }} = useRouter()
  const getRoomLink = useGetRoomLink(roomId)

  const subjectGroups = useSubjectGroupsBySubjectId(subjectId)

  return (
    <RoomDashboard roomId={roomId}>
      <SubjectHeader subjectId={subjectId} />
      <RoomDashboardSection>
        <Card>
          <CardActions>
            <LinkButton sm href={getRoomLink(`/subjects/${subjectId}/students/new`)}>科目分類を登録する</LinkButton>
          </CardActions>
          {subjectGroups && (
            <Collection>
               {subjectGroups.length > 0 ? (
                 subjectGroups.map(subjectGroup => (
                   <CollectionLinkItem key={subjectGroup.id} href={getRoomLink(`/subjectGroups/${subjectGroup.id}`)}>
                    {subjectGroup.name}
                   </CollectionLinkItem>
                 ))
               ) : (
                <CollectionPlaceholder>
                  登録している科目分類はありません
                </CollectionPlaceholder>
               )}
            </Collection>
          )}
        </Card>
      </RoomDashboardSection>
    </RoomDashboard>
  )
}
