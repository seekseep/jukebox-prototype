import { useRouter } from 'next/router'

import { STUDENT_SCHEDULE_TYPE_LABEL } from '@rooms/constants'

import Card from '@/components/parts/Card'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'
import Suspension from '@/components/parts/Suspension'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

import { useGetStudentPath } from '@rooms/hooks/router'
import { useStudentSchedulesQuery } from '@rooms/hooks/schedules'
import ScheduleCollectionItem from '@rooms/components/parts/schedules/ScheduleCollectionItem'

export default function ManageStudentSchedules () {
  const { query: { roomId, studentId } } = useRouter()

  const getStudentPath = useGetStudentPath(roomId, studentId)
  const result = useStudentSchedulesQuery(roomId, studentId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>予定の一覧</FeatureTitle>
        <div>
          <LinkButton href={getStudentPath('/schedules/new')}>予定を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Suspension {...result}>
        {({ data: schedules }) => (
          <Card>
            <Collection>
              {schedules.map((schedule) => (
                <CollectionLinkItem key={schedule.id} href={getStudentPath(`/schedules/${schedule.id}`)}>
                  <ScheduleCollectionItem
                    schedule={schedule}
                    availableLabel={STUDENT_SCHEDULE_TYPE_LABEL.AVAILABLE}
                    disavailableLabel={STUDENT_SCHEDULE_TYPE_LABEL.DISAVAILABLE} />
                </CollectionLinkItem>
              ))}
            </Collection>
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
