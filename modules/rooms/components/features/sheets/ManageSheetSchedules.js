import { useRouter } from 'next/router'

import { SHEET_SCHEDULE_TYPE_LABEL } from '@/constants'

import { useGetSheetPath } from '@rooms/hooks/router'
import { useSheetScheduleRefsQuery } from '@rooms/hooks/schedules'

import { WithDocRefs } from '@/components/utilities/withDocRefs'

import Card from '@/components/parts/Card'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'
import Suspension from '@/components/parts/Suspension'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import ScheduleCollectionItem from '@rooms/components/parts/schedules/ScheduleCollectionItem'

export default function ManageSheetSchedules () {
  const { query: { roomId, sheetId } } = useRouter()

  const getSheetPath = useGetSheetPath(roomId, sheetId)
  const result = useSheetScheduleRefsQuery(roomId, sheetId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>予定の一覧</FeatureTitle>
        <div>
          <LinkButton href={getSheetPath('/schedules/new')}>予定を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Suspension {...result}>
        {({ data: scheduleRefs }) => (
        <Card>
          <Collection>
            {scheduleRefs.length > 0 && (
              <WithDocRefs docRefs={scheduleRefs}>
                {({ data: schedule }) => (
                  <CollectionLinkItem href={getSheetPath(`/schedules/${schedule.id}`)}>
                    <ScheduleCollectionItem
                      schedule={schedule}
                      availableLabel={SHEET_SCHEDULE_TYPE_LABEL.AVAILABLE}
                      disavailableLabel={SHEET_SCHEDULE_TYPE_LABEL.DISAVAILABLE} />
                  </CollectionLinkItem>
                )}
              </WithDocRefs>
            )}
          </Collection>
        </Card>
        )}
      </Suspension>
    </Feature>
  )
}
