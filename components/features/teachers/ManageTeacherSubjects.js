import { useRouter } from 'next/router'

import { useGetRoomPath,  useGetTeacherPath } from '../../../hooks/router'
import { useTeacherSubjects } from '../../../hooks/teachers'

import Card from '../../parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '../../parts/feature'
import Loading from '../../parts/Loading'
import Collection, { CollectionLinkItem } from '../../parts/Collection'
import { LinkButton } from '../../parts/buttons'

export default function ManageTeacherSubjects () {
  const { query: { schoolId, roomId, teacherId } } = useRouter()

  const getRoomPath = useGetRoomPath(schoolId, roomId)
  const getTeacherPath = useGetTeacherPath(schoolId, roomId, teacherId)

  const {
    data: subjects,
    isSuccess,
    isLoading
  } = useTeacherSubjects(schoolId, roomId, teacherId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>科目の一覧</FeatureTitle>
        <div>
          <LinkButton href={getTeacherPath('/subjects/new')}>科目を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Card>
        {isLoading && <Loading />}
        {isSuccess && (
          <Collection>
            {subjects.map(subject => (
              <CollectionLinkItem key={subject.id} href={getRoomPath(`/subjects/${subject.id}`)}>
                {subject.name}
              </CollectionLinkItem>
            ))}
          </Collection>
        )}
      </Card>
    </Feature>
  )
}
