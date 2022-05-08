import { useRouter } from 'next/router'

import { useGetSheetPath } from '@/hooks/router'
import { useSheetSchedules } from '@/hooks/sheets'

import Card from '@/components/parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Loading from '@/components/parts/Loading'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'

export default function ManageSheetSchedules () {
  const { query: { schoolId, roomId, sheetId } } = useRouter()

  const getSheetPath = useGetSheetPath(schoolId, roomId, sheetId)

  const {
    data: schedules,
    isSuccess,
    isLoading
  } = useSheetSchedules(schoolId, roomId, sheetId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>予定の一覧</FeatureTitle>
        <div>
          <LinkButton href={getSheetPath('/relations/new')}>予定を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Card>
        {isLoading && <Loading />}
        {isSuccess && (
          <Collection>
            {schedules.map(schedule => (
              <CollectionLinkItem key={schedule.id} href={getSheetPath(`/schedules/${schedule.id}`)}>
                {schedule.id}
              </CollectionLinkItem>
            ))}
          </Collection>
        )}
      </Card>
    </Feature>
  )
}
