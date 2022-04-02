import Head from 'next/head'
import { useRouter } from "next/router";

import { Button } from '../../../../../components/parts/buttons'
import Card, { CardActions } from "../../../../../components/parts/Card";
import Collection, { CollectionPlaceholder } from "../../../../../components/parts/Collection";
import RoomDashboard, { RoomDashboardSection} from "../../../../../components/parts/RoomDashboard";
import TeacherHeader from '../../../../../components/parts/TeacherHeader'

export default function Relations () {
  const router = useRouter()
  const { query: { roomId, teacherId  }} = router

  return (
    <>
      <Head>
        <title>関係性</title>
      </Head>
      <RoomDashboard roomId={roomId}>
        <TeacherHeader teacherId={teacherId} />
        <RoomDashboardSection>
          <Card>
            <CardActions>
              <Button sm>関係性を登録する</Button>
            </CardActions>
            <Collection>
              <CollectionPlaceholder>
                関係性が登録されていません
              </CollectionPlaceholder>
            </Collection>
          </Card>
        </RoomDashboardSection>
      </RoomDashboard>
    </>
  )
}
