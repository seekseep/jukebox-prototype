import { useRouter } from 'next/router'

import { useGetRoomLink } from '../../../../../hooks/rooms'
import { useSubject } from '../../../../../hooks/subjects'

import Card, { CardActions } from '../../../../../components/parts/Card'
import { LinkButton } from '../../../../../components/parts/buttons'
import Collection, { CollectionPlaceholder, CollectionLinkItem } from '../../../../../components/parts/Collection'
import RoomDashboard, { RoomDashboardSection } from '../../../../../components/parts/RoomDashboard'
import SubjectHeader from '../../../../../components/parts/SubjectHeader'

export default function SubejctTags () {
  const { query: { roomId, subjectId } } = useRouter()
  const getRoomLink = useGetRoomLink(roomId)

  const subject = useSubject(subjectId)

  return (
    <RoomDashboard roomId={roomId}>
      <SubjectHeader roomId={roomId} subjectId={subjectId} />
      <RoomDashboardSection>
        <Card>
          <CardActions>
            <LinkButton sm href={getRoomLink(`/subjects/${subjectId}/students/new`)}>科目分類を登録する</LinkButton>
          </CardActions>
          {subject?.tags && (
            <Collection>
               {subject.tags.length > 0 ? (
                 subject.tags.map(subjectTagName => (
                   <CollectionLinkItem key={subjectTagName} href={getRoomLink(`/subjects/tags/${encodeURIComponent(subjectTagName)}`)}>
                    {subjectTagName}
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
