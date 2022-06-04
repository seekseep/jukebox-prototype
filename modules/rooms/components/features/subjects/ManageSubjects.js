import { useRouter } from 'next/router'

import { useGetRoomPath } from '@rooms/hooks/router'
import { useSubjectsQuery } from '@rooms/hooks/subjects'

import Card from '@/components/parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'
import Suspension from '@/components/parts/Suspension'

export default function ManageSubjects () {
  const { query:{ roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)
  const result = useSubjectsQuery(roomId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>科目の一覧</FeatureTitle>
        <div>
          <LinkButton href={getRoomPath('/subjects/new')}>科目を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Suspension {...result}>
        {({ data: subjects }) => (
          <Card>
            <Collection>
              {subjects.map(subject => (
                <CollectionLinkItem key={subject.id} href={getRoomPath(`/subjects/${subject.id}`)}>
                  {subject.name}
                </CollectionLinkItem>
              ))}
            </Collection>
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
