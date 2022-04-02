import Head from 'next/head'
import { useRouter } from 'next/router'

import { useSubjectsByStudentId } from '../../../../../hooks/subjects'

import { Button } from '../../../../../components/parts/buttons'
import Card, { CardActions } from '../../../../../components/parts/Card'
import Collection, { CollectionLinkItem, CollectionPlaceholder } from '../../../../../components/parts/Collection'

import RoomDashboard, { RoomDashboardSection} from '../../../../../components/parts/RoomDashboard'
import StudentHeader from '../../../../../components/parts/StudentHeader'
import { useGetRoomLink } from '../../../../../hooks/rooms'

export default function Subjects () {
  const router = useRouter()
  const { query: { roomId, studentId  }} = router

  const getRoomLink = useGetRoomLink(roomId)
  const subjects = useSubjectsByStudentId(studentId)

  return (
    <>
      <Head>
        <title>履修科目 | 生徒</title>
      </Head>
      <RoomDashboard roomId={roomId}>
        <StudentHeader studentId={studentId} />
        <RoomDashboardSection>
          <Card>
            <CardActions>
              <Button sm>履修科目を登録する</Button>
            </CardActions>
            <Collection>
              {subjects?.length > 0 ? subjects.map(subject =>
                <CollectionLinkItem key={subject.id} href={getRoomLink(`/subjects/${subject.id}`)}>
                  {subject.name}
                </CollectionLinkItem>
              ) : (
                <CollectionPlaceholder>
                  履修科目が登録されていません
                </CollectionPlaceholder>
              )}
            </Collection>
          </Card>
        </RoomDashboardSection>
      </RoomDashboard>
    </>
  )
}
