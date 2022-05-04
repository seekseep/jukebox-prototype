import { useRouter } from 'next/router'

import { useGetStudentPath } from '../../../hooks/router'
import { useStudentSchedules } from '../../../hooks/students'

import Card from '../../parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '../../parts/feature'
import Loading from '../../parts/Loading'
import Collection, { CollectionLinkItem } from '../../parts/Collection'
import { LinkButton } from '../../parts/buttons'

export default function ManageStudentSchedules () {
  const { query: { schoolId, roomId, studentId } } = useRouter()

  const getStudentPath = useGetStudentPath(schoolId, roomId, studentId)

  const {
    data: schedules,
    isSuccess,
    isLoading
  } = useStudentSchedules(schoolId, roomId, studentId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>予定の一覧</FeatureTitle>
        <div>
          <LinkButton href={getStudentPath('/relations/new')}>予定を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Card>
        {isLoading && <Loading />}
        {isSuccess && (
          <Collection>
            {schedules.map(schedule => (
              <CollectionLinkItem key={schedule.id} href={getStudentPath(`/schedules/${schedule.id}`)}>
                {schedule.id}
              </CollectionLinkItem>
            ))}
          </Collection>
        )}
      </Card>
    </Feature>
  )
}
