import { useRouter } from 'next/router'

import { useGetRoomLink } from '../../../../../../hooks/rooms'
import { useLessonsBySubjectId } from '../../../../../../hooks/lessons'

import Card, { CardActions } from '../../../../../../components/parts/Card'
import { LinkButton } from '../../../../../../components/parts/buttons'
import Collection, { CollectionPlaceholder, CollectionLinkItem } from '../../../../../../components/parts/Collection'
import RoomDashboard, { RoomDashboardSection } from '../../../../../../components/parts/RoomDashboard'
import SubjectHeader from '../../../../../../components/parts/SubjectHeader'

export default function Lessons () {
  const { query: { roomId, subjectId }} = useRouter()
  const getRoomLink = useGetRoomLink(roomId)

  const lessons = useLessonsBySubjectId(subjectId)

  return (
    <RoomDashboard roomId={roomId}>
      <SubjectHeader subjectId={subjectId} />
      <RoomDashboardSection>
        <Card>
          <CardActions>
            <LinkButton sm href={getRoomLink(`/subjects/${subjectId}/lessons/new`)}>授業を登録する</LinkButton>
          </CardActions>
          {lessons && (
            <Collection>
               {lessons.length > 0 ? (
                 lessons.map(lesson => (
                   <CollectionLinkItem key={lesson.id} href={getRoomLink(`/subjects/${subjectId}/lessons/${lesson.id}`)}>
                    {lesson.name}
                   </CollectionLinkItem>
                 ))
               ) : (
                <CollectionPlaceholder>
                  登録されている授業はありません
                </CollectionPlaceholder>
               )}
            </Collection>
          )}
        </Card>
      </RoomDashboardSection>
    </RoomDashboard>
  )
}
