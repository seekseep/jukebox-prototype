import { useRouter } from 'next/router'


import { WithDocRefs } from '@/components/utilities/withDocRefs'

import Card from '@/components/parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'
import { RoomIcon } from '@/components/parts/icons'
import Suspension from '@/components/parts/Suspension'

import { useGetSchoolPath } from '@schools/hooks/router'
import { useSchoolRoomRefs } from '@schools/hooks/rooms'

export default function ManageSchoolRooms () {
  const {
    query:{ schoolId }
  } = useRouter()

  const getSchoolPath = useGetSchoolPath(schoolId)

  const result = useSchoolRoomRefs(schoolId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>
          <RoomIcon />教室の一覧
        </FeatureTitle>
        <div>
          <LinkButton href={getSchoolPath('/rooms/new')}>教室を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Suspension {...result}>
      {({ data: roomRefs })=>(
        <Card>
          <Collection>
            {roomRefs.length > 0 && (
              <WithDocRefs docRefs={roomRefs}>
                {({ data: room }) => (
                  <CollectionLinkItem href={`/rooms/${room.id}`}>
                    {room.name}
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
