import { useRouter } from 'next/router'

import { WithDocRefs } from '@/components/utilities/withDocRefs'

import Card from '@/components/parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import Suspension from '@/components/parts/Suspension'

import { useGetRoomPath } from '@rooms/hooks/router'
import { useTeacherSubjectRefsQuery } from '@rooms/hooks/subjects'

export default function ManageTeacherSubjects () {
  const { query: { roomId, teacherId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)
  const result = useTeacherSubjectRefsQuery(roomId, teacherId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>科目の一覧</FeatureTitle>
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
