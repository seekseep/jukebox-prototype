import { useRouter } from 'next/router'

import { useGetTeacherPath } from '../../../hooks/router'
import { useTeacherSchedules } from '../../../hooks/teachers'

import Card from '../../parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '../../parts/feature'
import Loading from '../../parts/Loading'
import Collection, { CollectionLinkItem } from '../../parts/Collection'
import { LinkButton } from '../../parts/buttons'

export default function ManageTeacherSchedules () {
  const { query: { schoolId, roomId, teacherId } } = useRouter()

  const getTeacherPath = useGetTeacherPath(schoolId, roomId, teacherId)

  const {
    data: schedules,
    isSuccess,
    isLoading
  } = useTeacherSchedules(schoolId, roomId, teacherId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>予定の一覧</FeatureTitle>
        <div>
          <LinkButton href={getTeacherPath('/relations/new')}>予定を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Card>
        {isLoading && <Loading />}
        {isSuccess && (
          <Collection>
            {schedules.map(schedule => (
              <CollectionLinkItem key={schedule.id} href={getTeacherPath(`/schedules/${schedule.id}`)}>
                {schedule.id}
              </CollectionLinkItem>
            ))}
          </Collection>
        )}
      </Card>
    </Feature>
  )
}
