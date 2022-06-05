import { useRouter } from 'next/router'

import Card from '@/components/parts/Card'
import Suspension from '@/components/parts/Suspension'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'

import { useGetRoomPath } from '@rooms/hooks/router'
import { useTeachersQuery } from '@rooms/hooks/teachers'

export default function ManageTeachers () {
  const { query:{ roomId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)
  const result = useTeachersQuery(roomId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>講師の一覧</FeatureTitle>
        <div>
          <LinkButton href={getRoomPath('/teachers/new')}>講師を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Suspension {...result}>
        {({ data: teachers }) => (
          <Card>
            <Collection>
              {teachers.map(teacher => (
                <CollectionLinkItem key={teacher.id} href={getRoomPath(`/teachers/${teacher.id}`)}>
                  {teacher.name}
                </CollectionLinkItem>
              ))}
            </Collection>
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
