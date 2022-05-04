import { useRouter } from 'next/router'

import { useGetRoomPath } from '../../../hooks/router'
import { useTeachers } from '../../../hooks/teachers'

import Card from '../../parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '../../parts/feature'
import Loading from '../../parts/Loading'
import Collection, { CollectionLinkItem } from '../../parts/Collection'
import { LinkButton } from '../../parts/buttons'

export default function ManageTeachers () {
  const { query:{ schoolId, roomId } } = useRouter()

  const getRoomPath = useGetRoomPath(schoolId, roomId)

  const {
    data: teachers,
    isSuccess,
    isLoading
  } = useTeachers(schoolId, roomId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>講師の一覧</FeatureTitle>
        <div>
          <LinkButton href={getRoomPath('/teachers/new')}>講師を登録する</LinkButton>
        </div>
      </FeatureHead>
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
