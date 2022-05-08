import { useRouter } from 'next/router'

import { useGetSchoolPath } from '@/hooks/router'
import { useRoomsBySchool } from '@/hooks/rooms'

import Card from '@/components/parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Loading from '@/components/parts/Loading'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'

export default function ManageRooms () {
  const {
    query:{ schoolId }
  } = useRouter()

  const getSchoolPath = useGetSchoolPath(schoolId)

  const {
    data: rooms,
    isSuccess,
    isLoading
  } = useRoomsBySchool(schoolId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>教室の一覧</FeatureTitle>
        <div>
          <LinkButton href={getSchoolPath('/rooms/new')}>教室を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Card>
        {isLoading && <Loading />}
        {isSuccess && (
          <Collection>
            {rooms.map(room => (
              <CollectionLinkItem key={room.id} href={`/rooms/${room.id}`}>
                {room.name}
              </CollectionLinkItem>
            ))}
          </Collection>
        )}
      </Card>
    </Feature>
  )
}
