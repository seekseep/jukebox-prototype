import { WithDocRef, WithDocRefs } from '@/components/utilities/withDocRefs'

import { useRoomRoleRefs } from '@schools/hooks/roles'

import Card from '@/components/parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { RoomIcon } from '@/components/parts/icons'
import Suspension from '@/components/parts/Suspension'


export default function ManageRooms () {
  const result = useRoomRoleRefs()
  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>
          <RoomIcon />
          教室の一覧
        </FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
        {({ data: roomRoleRefs })=>(
          <Card>
            <Collection>
              {roomRoleRefs.length > 0 && (
                <WithDocRefs docRefs={roomRoleRefs}>
                  {({ data: roomRole }) => (
                    <WithDocRef docRef={roomRole.resource}>
                      {({ data: room }) => (
                        <CollectionLinkItem href={`/rooms/${room.id}`}>
                          {room.name}
                        </CollectionLinkItem>
                      )}
                    </WithDocRef>
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
