import { useRouter } from 'next/router'

import { useGetSchoolPath } from '../../../hooks/router'
import { useRooms } from '../../../hooks/rooms'

import Card from '../../parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '../../parts/feature'
import Loading from '../../parts/Loading'
import Collection, { CollectionLinkItem } from '../../parts/Collection'
import { LinkButton } from '../../parts/buttons'

export default function ManageRooms () {
  const {
    query:{ schoolId }
  } = useRouter()

  const getSchoolPath = useGetSchoolPath(schoolId)

  const {
    data: rooms,
    isSuccess,
    isLoading
  } = useRooms(schoolId)

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
              <CollectionLinkItem key={room.id} href={getSchoolPath(`/rooms/${room.id}`)}>
                {room.name}
              </CollectionLinkItem>
            ))}
          </Collection>
        )}
      </Card>
    </Feature>
  )
}
