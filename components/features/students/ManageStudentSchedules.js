import { useRouter } from 'next/router'
import { format } from 'date-fns'

import { useGetStudentPath } from '@/hooks/router'
import { useStudentSchedules } from '@/hooks/students'

import Card from '@/components/parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Loading from '@/components/parts/Loading'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'

export default function ManageStudentSchedules () {
  const { query: { roomId, studentId } } = useRouter()

  const getStudentPath = useGetStudentPath(roomId, studentId)

  const {
    data: schedules,
    isSuccess,
    isLoading
  } = useStudentSchedules(roomId, studentId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>予定の一覧</FeatureTitle>
        <div>
          <LinkButton href={getStudentPath('/schedules/new')}>予定を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Card>
        {isLoading && <Loading />}
        {isSuccess && (
          <Collection>
            {schedules.map(schedule => (
              <CollectionLinkItem key={schedule.id} href={getStudentPath(`/schedules/${schedule.id}`)}>
                <div className="flex gap-2">
                  <div>
                    {schedule.type === 'DISABLED' && '休み'}
                    {schedule.type === 'ENABLED' && '登校可能'}
                  </div>
                  <div>{format(schedule.startedAt.toDate(), 'yyyy/MM/dd HH:mm')}</div>
                  <div>~</div>
                  <div>{format(schedule.finishedAt.toDate(), 'yyyy/MM/dd HH:mm')}</div>
                </div>
              </CollectionLinkItem>
            ))}
          </Collection>
        )}
      </Card>
    </Feature>
  )
}
