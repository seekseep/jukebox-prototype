import { useRouter } from 'next/router'

import { useGetTeacherPath } from '@/hooks/router'
import { useTeacherRelations } from '@/hooks/teachers'

import Card from '@/components/parts/Card'
import { LinkButton } from '@/components/parts/buttons'
import Loading from '@/components/parts/Loading'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'

export default function ManageTeacherRelations () {
  const { query: { schoolId, roomId, teacherId } } = useRouter()

  const getTeacherPath = useGetTeacherPath(schoolId, roomId, teacherId)

  const {
    data: relations,
    isSuccess,
    isLoading
  } = useTeacherRelations(schoolId, roomId, teacherId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>関係の一覧</FeatureTitle>
        <div>
          <LinkButton href={getTeacherPath('/relations/new')}>関係を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Card>
        {isLoading && <Loading />}
        {isSuccess && (
          <Collection>
            {relations.map(relation => (
              <CollectionLinkItem key={relation.id} href={getTeacherPath(`/relations/${relation.id}`)}>
                {relation.id}
              </CollectionLinkItem>
            ))}
          </Collection>
        )}
      </Card>
    </Feature>
  )
}
