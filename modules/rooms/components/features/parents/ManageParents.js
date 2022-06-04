import { useRouter } from 'next/router'

import Card from '@/components/parts/Card'
import Suspension from '@/components/parts/Suspension'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'

import { useGetRoomPath } from '@rooms/hooks/router'
import { useParentsQuery } from '@rooms/hooks/parents'

export default function ManageParents () {
  const { query:{ roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)
  const result = useParentsQuery(roomId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>保護者の一覧</FeatureTitle>
        <div>
          <LinkButton href={getRoomPath('/parents/new')}>保護者を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Suspension {...result}>
        {({ data: parents }) => (
          <Card>
            <Collection>
              {parents.map(parent => (
                <CollectionLinkItem key={parent.id} href={getRoomPath(`/parents/${parent.id}`)}>
                  {parent.name}
                </CollectionLinkItem>
              ))}
            </Collection>
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
