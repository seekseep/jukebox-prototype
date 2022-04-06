import { useRouter } from 'next/router'

import { useGetRoomLink } from '../../../../../hooks/rooms'
import { useSubjectTagsByRoomId } from '../../../../../hooks/subjects'

import Card, { CardActions } from '../../../../../components/parts/Card'
import { LinkButton } from '../../../../../components/parts/buttons'
import Collection, { CollectionLinkItem, CollectionPlaceholder } from '../../../../../components/parts/Collection'
import RoomDashboard, { RoomDashboardSection } from '../../../../../components/parts/RoomDashboard'
import SubjectsHeader from '../../../../../components/parts/SubjectsHeader'

export default function SubejctTags () {
  const { query: { roomId } } = useRouter()
  const getRoomLink = useGetRoomLink(roomId)

  const useSubjectTags = useSubjectTagsByRoomId(roomId)

  return (
    <RoomDashboard roomId={roomId}>
      <SubjectsHeader roomId={roomId} />
      <RoomDashboardSection>
        <Card>
          <CardActions>
            <LinkButton sm href={getRoomLink('/subjects/new')}>科目分類を登録する</LinkButton>
          </CardActions>
          {useSubjectTags && (
            <Collection>
              {useSubjectTags.length > 0 ? (
                useSubjectTags.map(subjectTag => (
                  <CollectionLinkItem key={subjectTag} href={getRoomLink(`/subjects/tags/${encodeURIComponent(subjectTag)}`)}>
                    <div className="flex">
                      <div className="flex-grow">{subjectTag}</div>
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
