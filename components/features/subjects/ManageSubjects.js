import { useRouter } from 'next/router'

import { useGetRoomPath } from '@/hooks/router'
import { useSubjectRefs } from '@/hooks/subjects'

import { WithDocRefs } from '@/components/utilities/withDocRefs'

import Card from '@/components/parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'
import Suspension from '@/components/parts/Suspension'

export default function ManageSubjects () {
  const { query:{ roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)
  const result = useSubjectRefs(roomId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>科目の一覧</FeatureTitle>
        <div>
          <LinkButton href={getRoomPath('/subjects/new')}>科目を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Suspension {...result}>
        {({ data: subjectRefs }) => (
          <Card>
            <Collection>
              {subjectRefs.length > 0 && (
                <WithDocRefs docRefs={subjectRefs}>
                  {({ data: subject }) => (
                    <CollectionLinkItem href={getRoomPath(`/subjects/${subject.id}`)}>
                      {subject.name}
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
