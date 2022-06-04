import { useRouter } from 'next/router'

import { TEACHER_SCHEDULE_TYPE_LABEL } from '@rooms/constants'

import Card from '@/components/parts/Card'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'
import Suspension from '@/components/parts/Suspension'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

import { useGetTeacherPath } from '@rooms/hooks/router'
import { useTeacherSchedulesQuery } from '@rooms/hooks/schedules'
import ScheduleCollectionItem from '@rooms/components/parts/schedules/ScheduleCollectionItem'

export default function ManageTeacherSchedules () {
  const { query: { roomId, teacherId } } = useRouter()

  const getTeacherPath = useGetTeacherPath(roomId, teacherId)
  const result = useTeacherSchedulesQuery(roomId, teacherId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>予定の一覧</FeatureTitle>
        <div>
          <LinkButton href={getTeacherPath('/schedules/new')}>予定を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Suspension {...result}>
        {({ data: schedules }) => (
          <Card>
            <Collection>
              {schedules.map((schedule) => (
                <CollectionLinkItem key={schedule.id} href={getTeacherPath(`/schedules/${schedule.id}`)}>
                  <ScheduleCollectionItem
                    schedule={schedule}
                    availableLabel={TEACHER_SCHEDULE_TYPE_LABEL.AVAILABLE}
                    disavailableLabel={TEACHER_SCHEDULE_TYPE_LABEL.DISAVAILABLE} />
                </CollectionLinkItem>
              ))}
            </Collection>
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
