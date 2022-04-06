import Head from 'next/head'
import { useRouter } from 'next/router'

import {
  useScheduleRulesByTeacherId,
} from '../../../../../hooks/scheduleRules'

import { Button } from '../../../../../components/parts/buttons'
import Card, { CardActions } from '../../../../../components/parts/Card'
import Collection, { CollectionItem, CollectionPlaceholder } from '../../../../../components/parts/Collection'
import RoomDashboard, { RoomDashboardSection } from '../../../../../components/parts/RoomDashboard'
import TeacherHeader from '../../../../../components/parts/TeacherHeader'
import ScheduleRule from '../../../../../components/parts/ScheduleRule'

export default function ScheduleRules () {
  const router = useRouter()
  const { query: { roomId, teacherId  } } = router

  const scheduleRules = useScheduleRulesByTeacherId(teacherId)

  return (
    <>
      <Head>
        <title>基本的な予定</title>
      </Head>
      <RoomDashboard roomId={roomId}>
        <TeacherHeader roomId={roomId} teacherId={teacherId} />
        <RoomDashboardSection>
          <Card>
            <CardActions>
              <Button sm>登校日条件を登録する</Button>
            </CardActions>
            <Collection>
              {scheduleRules?.length > 0 ? scheduleRules.filter(rule => rule.repeat.term !== null).map((scheduleRule, index) =>
                <CollectionItem key={index}>
                  <ScheduleRule
                    scheduleRule={scheduleRule}
                    availableLabel="出勤可"
                    disavailableLabel="出勤不可" />
                </CollectionItem>
              ) : (
                <CollectionPlaceholder>
                  登校日条件が登録されていません
                </CollectionPlaceholder>
              )}
            </Collection>
          </Card>
        </RoomDashboardSection>
      </RoomDashboard>
    </>
  )
}
