import { useRouter } from 'next/router'

import { useGetSubjectPath } from '../../../hooks/router'
import { useLessons } from '../../../hooks/lessons'

import Card from '../../parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '../../parts/feature'
import Loading from '../../parts/Loading'
import Collection, { CollectionLinkItem } from '../../parts/Collection'
import { LinkButton } from '../../parts/buttons'

export default function ManageLessons () {
  const { query:{ schoolId, roomId, subjectId } } = useRouter()

  const getSubjectPath = useGetSubjectPath(schoolId, roomId, subjectId)

  const {
    data: lessons,
    isSuccess,
    isLoading
  } = useLessons(schoolId, roomId, subjectId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>授業の一覧</FeatureTitle>
        <div>
          <LinkButton href={getSubjectPath('/lessons/new')}>科目を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Card>
        {isLoading && <Loading />}
        {isSuccess && (
          <Collection>
            {lessons.map(lesson => (
              <CollectionLinkItem key={lesson.id} href={getSubjectPath(`/lessons/${lesson.id}`)}>
                {lesson.name}
              </CollectionLinkItem>
            ))}
          </Collection>
        )}
      </Card>
    </Feature>
  )
}
