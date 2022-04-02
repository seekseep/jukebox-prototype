import Head from 'next/head'
import { useRouter } from 'next/router'

import {
  useScheduleRulesByRoomId,
} from '../../../../hooks/scheduleRules'

import { Button } from '../../../../components/parts/buttons'
import Card, { CardActions } from '../../../../components/parts/Card'
import Collection, { CollectionItem, CollectionPlaceholder } from '../../../../components/parts/Collection'
import RoomDashboard, { RoomDashboardSection} from '../../../../components/parts/RoomDashboard'
import ScheduleRule from '../../../../components/parts/ScheduleRule'
import SettingsHeader from '../../../../components/parts/SettingsHeader'

export default function IrregularSchedule () {
  const router = useRouter()
  const { query: { roomId  }} = router

  const scheduleRules = useScheduleRulesByRoomId(roomId)

  return (
    <>
      <Head>
        <title>不規則な予定</title>
      </Head>
      <RoomDashboard roomId={roomId}>
        <SettingsHeader roomId={roomId} />
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
                    availableLabel="営業"
                    disavailableLabel="休業" />
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
