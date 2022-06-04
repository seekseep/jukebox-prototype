import { useRouter } from 'next/router'

import Card from '@/components/parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Suspension from '@/components/parts/Suspension'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'

import { useGetRoomPath } from '@rooms/hooks/router'
import { useLessonFramesQuery } from '@rooms/hooks/lessonFrames'
import LessonFrameCollectionItem from '@rooms/components/parts/lessonFrames/LessonFrameCollectionItem'

export default function ManageLessonFrames () {
  const { query:{ roomId } } = useRouter()

  const getRoomPath = useGetRoomPath(roomId)

  const result = useLessonFramesQuery(roomId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>授業枠の一覧</FeatureTitle>
        <div>
          <LinkButton href={getRoomPath('/settings/lessonFrames/new')}>授業枠を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Suspension {...result}>
      {({ data: lessonFrames }) => (
        <Card>
          <Collection>
            {lessonFrames.map(lessonFrame => (
              <CollectionLinkItem key={lessonFrame.id} href={getRoomPath(`/settings/lessonFrames/${lessonFrame.id}`)}>
                <LessonFrameCollectionItem lessonFrame={lessonFrame} />
              </CollectionLinkItem>
            ))}
          </Collection>
        </Card>
        )}
      </Suspension>
    </Feature>
  )
}
