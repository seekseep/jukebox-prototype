import { useRouter } from 'next/router'

import { useGetRoomLink } from '../../../../../hooks/rooms'
import { useSubject } from '../../../../../hooks/subjects'

import Card, { CardActions } from '../../../../../components/parts/Card'
import { LinkButton } from '../../../../../components/parts/buttons'
import PropertySet, { PropertyItem, PropertyLabel, PropertyContents } from '../../../../../components/parts/PropertySet'
import RoomDashboard, { RoomDashboardSection } from '../../../../../components/parts/RoomDashboard'
import SubjectHeader from '../../../../../components/parts/SubjectHeader'

export default function Subject () {
  const { query: { roomId, subjectId } } = useRouter()
  const getRoomLink = useGetRoomLink(roomId)

  const subject = useSubject(subjectId)

  return (
    <RoomDashboard roomId={roomId}>
      <SubjectHeader subjectId={subjectId} />
      <RoomDashboardSection>
        <Card>
          <CardActions>
            <LinkButton secondary sm href={getRoomLink('/subjects/new')}>編集する</LinkButton>
          </CardActions>
          {subject && (
            <PropertySet>
              <PropertyItem>
                <PropertyLabel>名称</PropertyLabel>
                <PropertyContents>{subject.name}</PropertyContents>
              </PropertyItem>
            </PropertySet>
          )}
        </Card>
      </RoomDashboardSection>
    </RoomDashboard>
  )
}
