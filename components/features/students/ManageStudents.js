import { useRouter } from 'next/router'

import { useGetRoomPath } from '@/hooks/router'
import { useStudents } from '@/hooks/students'

import Card from '@/components/parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Loading from '@/components/parts/Loading'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'
import ErrorAlert from '@/components/parts/ErrorAlert'

export default function ManageStudents () {
  const { query:{ roomId } } = useRouter()

  const getRoomPath = useGetRoomPath(roomId)

  const {
    data: students,
    isSuccess,
    isLoading,
    error
  } = useStudents(roomId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>生徒の一覧</FeatureTitle>
        <div>
          <LinkButton href={getRoomPath('/students/new')}>生徒を登録する</LinkButton>
        </div>
      </FeatureHead>
      {error && <ErrorAlert error={error} />}
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
