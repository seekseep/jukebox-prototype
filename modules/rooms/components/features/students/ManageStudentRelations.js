import { useRouter } from 'next/router'

import Card from '@/components/parts/Card'
import { LinkButton } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import Suspension from '@/components/parts/Suspension'

import { useGetStudentPath } from '@rooms/hooks/router'
import { useStudentRelationsQuery } from '@rooms/hooks/relations'
import RelationCollectionItem from '@rooms/components/parts/relations/RelationCollectionItem'

export default function ManageStudentRelations () {
  const { query: { roomId, studentId } } = useRouter()
  const getStudentPath = useGetStudentPath(roomId, studentId)
  const result = useStudentRelationsQuery(roomId, studentId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>関係の一覧</FeatureTitle>
        <div>
          <LinkButton href={getStudentPath('/relations/new')}>関係を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Suspension {...result}>
        {({ data: relations }) => (
          <Card>
            <Collection>
              {relations.map(relation => (
                <CollectionLinkItem key={relation.id} href={getStudentPath(`/relations/${relation.id}`)}>
                  <RelationCollectionItem relation={relation} />
                </CollectionLinkItem>
              ))}
            </Collection>
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
