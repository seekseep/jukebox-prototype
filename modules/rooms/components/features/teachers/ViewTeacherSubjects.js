import { useRouter } from 'next/router'

import Card from '@/components/parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import Suspension from '@/components/parts/Suspension'

import { useGetRoomPath } from '@rooms/hooks/router'
import { useTeacherSubjectsQuery } from '@rooms/hooks/subjects'

export default function ViewTeacherSubjects () {
  const { query: { roomId, teacherId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)
  const result = useTeacherSubjectsQuery(roomId, teacherId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>担当科目</FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
        {({ data: subjects }) => (
          <Card>
            <Collection>
              {subjects.map(subject => (
                <CollectionLinkItem key={subject.id} href={getRoomPath(`/subjects/${subject.id}`)}>
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
