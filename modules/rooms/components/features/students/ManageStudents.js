import { useRouter } from 'next/router'

import Card from '@/components/parts/Card'
import Suspension from '@/components/parts/Suspension'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'

import { useGetRoomPath } from '@rooms/hooks/router'
import { useStudentsQuery } from '@rooms/hooks/students'

export default function ManageStudents () {
  const { query:{ roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)
  const result = useStudentsQuery(roomId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>生徒の一覧</FeatureTitle>
        <div>
          <LinkButton href={getRoomPath('/students/new')}>生徒を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Suspension {...result}>
        {({ data: students }) => (
          <Card>
            <Collection>
              {students.map((student) => (
                <CollectionLinkItem key={student.id} href={getRoomPath(`/students/${student.id}`)}>
                  {student.name}
                </CollectionLinkItem>
              ))}
            </Collection>
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
