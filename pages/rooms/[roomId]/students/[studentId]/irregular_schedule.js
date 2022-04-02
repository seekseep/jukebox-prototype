import Head from 'next/head'
import { useRouter } from "next/router";

import {
  useScheduleRulesByStudentId,
} from '../../../../../hooks/scheduleRules';

import { Button } from '../../../../../components/parts/buttons'
import Card, { CardActions } from "../../../../../components/parts/Card";
import Collection, { CollectionItem, CollectionPlaceholder } from "../../../../../components/parts/Collection";
import RoomDashboard, { RoomDashboardSection} from "../../../../../components/parts/RoomDashboard";
import StudentHeader from '../../../../../components/parts/StudentHeader'
import ScheduleRule from '../../../../../components/parts/ScheduleRule';

export default function IrregularSchedule () {
  const router = useRouter()
  const { query: { roomId, studentId  }} = router

  const scheduleRules = useScheduleRulesByStudentId(studentId)

  return (
    <>
      <Head>
        <title>不規則な予定</title>
      </Head>
      <RoomDashboard roomId={roomId}>
        <StudentHeader studentId={studentId} />
        <RoomDashboardSection>
          <Card>
            <CardActions>
              <Button sm>不規則な予定を追加</Button>
            </CardActions>
            <Collection>
              {scheduleRules?.length > 0 ? scheduleRules.filter(rule => rule.repeat.term === null).map(scheduleRule =>
                <CollectionItem key={scheduleRule.id}>
                  <ScheduleRule
                    scheduleRule={scheduleRule}
                    availableLabel="登校可"
                    disavailableLabel="登校不可" />
                </CollectionItem>
              ) : (
                <CollectionPlaceholder>
                  不規則な予定がありません
                </CollectionPlaceholder>
              )}
            </Collection>
          </Card>
        </RoomDashboardSection>
      </RoomDashboard>
    </>
  )
}
