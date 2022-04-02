import Head from 'next/head'
import { useRouter } from 'next/router'

import {
  useScheduleRulesByRoomId,
} from '../../../../hooks/scheduleRules'

import { Button } from '../../../../components/parts/buttons'
import Card, { CardActions } from '../../../../components/parts/Card'
import Collection, { CollectionItem, CollectionPlaceholder } from '../../../../components/parts/Collection'
import RoomDashboard, { RoomDashboardSection} from '../../../../components/parts/RoomDashboard'
import SettingsHeader from '../../../../components/parts/SettingsHeader'
import ScheduleRule from '../../../../components/parts/ScheduleRule'

export default function ScheduleRules () {
  const router = useRouter()
  const { query: { roomId  }} = router

  const scheduleRules = useScheduleRulesByRoomId(roomId)

  return (
    <>
      <Head>
        <title>基本的な予定</title>
      </Head>
      <RoomDashboard roomId={roomId}>
        <SettingsHeader roomId={roomId} />
        <RoomDashboardSection>
          <Card>
            <CardActions>
              <Button sm>登校日条件を登録する</Button>
            </CardActions>
            <Collection>
              {scheduleRules?.length > 0 ? scheduleRules.filter(rule => rule.repeat.term !== null).map(scheduleRule =>
                <CollectionItem key={scheduleRule.id}>
                  <ScheduleRule
                    scheduleRule={scheduleRule}
                    availableLabel="営業"
                    disavailableLabel="休業" />
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
