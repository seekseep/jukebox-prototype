import { useRouter } from 'next/router'

import { useGetSchoolPath } from '@/hooks/router'
import { useSchoolRoomRefs } from '@/hooks/rooms'

import { WithDocRefs } from '@/components/utilities/withDocRefs'

import Card from '@/components/parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'
import { RoomIcon } from '@/components/parts/icons'
import Suspension from '@/components/parts/Suspension'

export default function ManageRooms () {
  const {
    query: { schoolId }
  } = useRouter()

  const getSchoolPath = useGetSchoolPath(schoolId)

  const {
    data: roomRefs,
    ...result
  } = useSchoolRoomRefs(schoolId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>
          <RoomIcon />
          教室の一覧
        </FeatureTitle>
        <div>
          <LinkButton href={getSchoolPath('/rooms/new')}>教室を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Suspension {...result}>
      {()=>(
        <Card>
          <Collection>
            <WithDocRefs docRefs={roomRefs}>
              {({ data: room }) => (
                <CollectionLinkItem href={`/rooms/${room.id}`}>
                  {room.name}
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
