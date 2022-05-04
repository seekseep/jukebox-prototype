import { useRouter } from 'next/router'

import { useGetRoomPath,  useGetStudentPath } from '../../../hooks/router'
import { useStudentSubjects } from '../../../hooks/students'

import Card from '../../parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '../../parts/feature'
import Loading from '../../parts/Loading'
import Collection, { CollectionLinkItem } from '../../parts/Collection'
import { LinkButton } from '../../parts/buttons'

export default function ManageStudentSubjects () {
  const { query: { schoolId, roomId, studentId } } = useRouter()

  const getRoomPath = useGetRoomPath(schoolId, roomId)
  const getStudentPath = useGetStudentPath(schoolId, roomId, studentId)

  const {
    data: subjects,
    isSuccess,
    isLoading
  } = useStudentSubjects(schoolId, roomId, studentId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>科目の一覧</FeatureTitle>
        <div>
          <LinkButton href={getStudentPath('/subjects/new')}>科目を登録する</LinkButton>
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
