import { useRouter } from 'next/router'

import { useGetRoomPath } from '../../../hooks/router'
import { useStudents } from '../../../hooks/students'

import Card from '../../parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '../../parts/feature'
import Loading from '../../parts/Loading'
import Collection, { CollectionLinkItem } from '../../parts/Collection'
import { LinkButton } from '../../parts/buttons'

export default function ManageStudents () {
  const { query:{ schoolId, roomId } } = useRouter()

  const getRoomPath = useGetRoomPath(schoolId, roomId)

  const {
    data: students,
    isSuccess,
    isLoading
  } = useStudents(schoolId, roomId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>生徒の一覧</FeatureTitle>
        <div>
          <LinkButton href={getRoomPath('/students/new')}>生徒を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Card>
        {isLoading && <Loading />}
        {isSuccess && (
          <Collection>
            {students.map(student => (
              <CollectionLinkItem key={student.id} href={getRoomPath(`/students/${student.id}`)}>
                {student.name}
              </CollectionLinkItem>
            ))}
          </Collection>
        )}
      </Card>
    </Feature>
  )
}
