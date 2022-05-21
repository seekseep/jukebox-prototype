import { useRouter } from 'next/router'

import { useGetRoomPath } from '@/hooks/router'

import { useTeacherSubjectRefs } from '@/hooks/subjects'

import { WithDocRefs } from '@/components/utilities/withDocRefs'

import Card from '@/components/parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Suspension from '@/components/parts/Suspension'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'

export default function ManageTeacherSubjects () {
  const { query: { roomId, teacherId } } = useRouter()

  const getRoomPath = useGetRoomPath(roomId)

  const {
    data: subjectRefs,
    ...result
  } = useTeacherSubjectRefs(roomId, teacherId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>科目の一覧</FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
      {()=>(
        <Card>
          <Collection>
            <WithDocRefs docRefs={subjectRefs}>
              {({ data: subject }) => (
                <CollectionLinkItem href={getRoomPath(`/subjects/${subject.id}`)}>
                  {subject.name}
                </CollectionLinkItem>
              )}
            </WithDocRefs>
          </Collection>
        </Card>
        )}
      </Suspension>
    </Feature>
  )
}
