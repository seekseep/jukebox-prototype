import { useRouter } from 'next/router'

import { TEACHER_SCHEDULE_TYPE_LABEL } from '@/constatnts'

import { useGetTeacherPath } from '@/hooks/router'
import { useTeacherScheduleRefs } from '@/hooks/schedules'

import { WithDocRefs } from '@/components/utilities/withDocRefs'

import Card from '@/components/parts/Card'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'
import Suspension from '@/components/parts/Suspension'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import ScheduleCollectionItem from '@/components/parts/schedules/ScheduleCollectionItem'

export default function ManageTeacherSchedules () {
  const { query: { roomId, teacherId } } = useRouter()

  const getTeacherPath = useGetTeacherPath(roomId, teacherId)
  const result = useTeacherScheduleRefs(roomId, teacherId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>予定の一覧</FeatureTitle>
        <div>
          <LinkButton href={getTeacherPath('/schedules/new')}>予定を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Suspension {...result}>
        {({ data: scheduleRefs }) => (
          <Card>
            <Collection>
              {scheduleRefs.length > 0 && (
                <WithDocRefs docRefs={scheduleRefs}>
                  {({ data: schedule }) => (
                    <CollectionLinkItem href={getTeacherPath(`/schedules/${schedule.id}`)}>
                      <ScheduleCollectionItem
                        schedule={schedule}
                        availableLabel={TEACHER_SCHEDULE_TYPE_LABEL.AVAILABLE}
                        disavailableLabel={TEACHER_SCHEDULE_TYPE_LABEL.DISAVAILABLE} />
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
