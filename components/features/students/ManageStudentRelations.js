import { useRouter } from 'next/router'

import { useGetStudentPath } from '@/hooks/router'
import { useStudentRelations } from '@/hooks/students'

import Card from '@/components/parts/Card'
import { LinkButton } from '@/components/parts/buttons'
import Loading from '@/components/parts/Loading'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'

export default function ManageStudentRelations () {
  const { query: { schoolId, roomId, studentId } } = useRouter()

  const getStudentPath = useGetStudentPath(schoolId, roomId, studentId)

  const {
    data: relations,
    isSuccess,
    isLoading
  } = useStudentRelations(schoolId, roomId, studentId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>関係の一覧</FeatureTitle>
        <div>
          <LinkButton href={getStudentPath('/relations/new')}>関係を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Card>
        {isLoading && <Loading />}
        {isSuccess && (
          <Collection>
            {relations.map(relation => (
              <CollectionLinkItem key={relation.id} href={getStudentPath(`/relations/${relation.id}`)}>
                {relation.id}
              </CollectionLinkItem>
            ))}
          </Collection>
        )}
      </Card>
    </Feature>
  )
}
