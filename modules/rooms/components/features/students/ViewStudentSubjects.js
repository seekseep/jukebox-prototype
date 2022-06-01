import { useRouter } from 'next/router'

import Card from '@/components/parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import Suspension from '@/components/parts/Suspension'

import { useGetRoomPath } from '@rooms/hooks/router'
import { useStudentSubjectsQuery } from '@rooms/hooks/subjects'

export default function ViewStudentSubjects () {
  const { query: { roomId, studentId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)
  const result = useStudentSubjectsQuery(roomId, studentId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>履修科目</FeatureTitle>
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
