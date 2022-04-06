import { useRouter } from 'next/router'

import { useGetRoomLink } from '../../../../../hooks/rooms'
import { useStudentBySubjectId } from '../../../../../hooks/students'

import Card, { CardActions } from '../../../../../components/parts/Card'
import { LinkButton } from '../../../../../components/parts/buttons'
import Collection, { CollectionPlaceholder, CollectionLinkItem } from '../../../../../components/parts/Collection'
import RoomDashboard, { RoomDashboardSection } from '../../../../../components/parts/RoomDashboard'
import SubjectHeader from '../../../../../components/parts/SubjectHeader'

export default function Students () {
  const { query: { roomId, subjectId } } = useRouter()
  const getRoomLink = useGetRoomLink(roomId)

  const students = useStudentBySubjectId(subjectId)

  return (
    <RoomDashboard roomId={roomId}>
      <SubjectHeader roomId={roomId} subjectId={subjectId} />
      <RoomDashboardSection>
        <Card>
          <CardActions>
            <LinkButton sm href={getRoomLink(`/subjects/${subjectId}/students/new`)}>生徒を登録する</LinkButton>
          </CardActions>
          {students && (
            <Collection>
               {students.length > 0 ? (
                 students.map(student => (
                   <CollectionLinkItem key={student.id} href={getRoomLink(`/students/${student.id}`)}>
                    {student.name}
                   </CollectionLinkItem>
                 ))
               ) : (
                <CollectionPlaceholder>
                  履修している生徒はいません
                </CollectionPlaceholder>
               )}
            </Collection>
          )}
        </Card>
      </RoomDashboardSection>
    </RoomDashboard>
  )
}
