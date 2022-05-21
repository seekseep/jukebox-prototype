import { useRouter } from 'next/router'

import { useGetRoomPath } from '@/hooks/router'
import { useParentRefs } from '@/hooks/parents'

import { WithDocRefs } from '@/components/utilities/withDocRefs'

import Card from '@/components/parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Suspension from '@/components/parts/Suspension'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'

export default function ManageParents () {
  const { query:{ roomId } } = useRouter()

  const getRoomPath = useGetRoomPath(roomId)

  const result = useParentRefs(roomId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>保護者の一覧</FeatureTitle>
        <div>
          <LinkButton href={getRoomPath('/parents/new')}>保護者を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Suspension {...result}>
      {({ data: parentRefs }) => (
        <Card>
          <Collection>
            {parentRefs.length > 0 && (
              <WithDocRefs docRefs={parentRefs}>
                {({ data: parent }) => (
                  <CollectionLinkItem href={getRoomPath(`/parents/${parent.id}`)}>
                    {parent.name}
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
