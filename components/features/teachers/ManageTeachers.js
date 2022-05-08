import { useRouter } from 'next/router'

import { useGetRoomPath } from '@/hooks/router'
import { useTeachers } from '@/hooks/teachers'

import Card from '@/components/parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Loading from '@/components/parts/Loading'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'
import ErrorAlert from '@/components/parts/ErrorAlert'

export default function ManageTeachers () {
  const { query:{ roomId } } = useRouter()

  const getRoomPath = useGetRoomPath(roomId)

  const {
    data: teachers,
    isSuccess,
    isLoading,
    error
  } = useTeachers(roomId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>講師の一覧</FeatureTitle>
        <div>
          <LinkButton href={getRoomPath('/teachers/new')}>講師を登録する</LinkButton>
        </div>
      </FeatureHead>
      {error && <ErrorAlert error={error} />}
      <Card>
        {isLoading && <Loading />}
        {isSuccess && (
          <Collection>
            {teachers.map(teacher => (
              <CollectionLinkItem key={teacher.id} href={getRoomPath(`/teachers/${teacher.id}`)}>
                {teacher.name}
              </CollectionLinkItem>
            ))}
          </Collection>
        )}
      </Card>
    </Feature>
  )
}
