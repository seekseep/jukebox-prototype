import { useRouter } from 'next/router'

import { useGetTeacherPath } from '@/hooks/router'
import { useTeacherRelationRefs } from '@/hooks/relations'

import { WithDocRefs } from '@/components/utilities/withDocRefs'

import Card from '@/components/parts/Card'
import { LinkButton } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import Suspension from '@/components/parts/Suspension'

export default function ManageTeacherRelations () {
  const { query: { roomId, teacherId } } = useRouter()
  const getTeacherPath = useGetTeacherPath(roomId, teacherId)
  const result = useTeacherRelationRefs(roomId, teacherId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>関係の一覧</FeatureTitle>
        <div>
          <LinkButton href={getTeacherPath('/relations/new')}>関係を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Suspension {...result}>
        {({ data: relationRefs }) => (
          <Card>
            <Collection>
              {relationRefs.length > 0 && (
                <WithDocRefs docRefs={relationRefs}>
                  {({ data: relation }) => (
                    <CollectionLinkItem href={getTeacherPath(`/relations/${relation.id}`)}>
                      {relation.id}
                    </CollectionLinkItem>
                  )}
                </WithDocRefs>
              )}
            </Collection>
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
