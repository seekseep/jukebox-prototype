import { useRouter } from 'next/router'

import { useGetRoomPath } from '@/hooks/router'
import { useLessonFrameRefs } from '@/hooks/lessonFrames'

import { WithDocRefs } from '@/components/utilities/withDocRefs'

import Card from '@/components/parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Suspension from '@/components/parts/Suspension'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'
import { getDayCountLabel } from '@/services/lessonFrames'

export default function ManageLessonFrames () {
  const { query:{ roomId } } = useRouter()

  const getRoomPath = useGetRoomPath(roomId)

  const result = useLessonFrameRefs(roomId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>授業枠の一覧</FeatureTitle>
        <div>
          <LinkButton href={getRoomPath('/settings/lessonFrames/new')}>授業枠を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Suspension {...result}>
      {({ data: lessonframeRefs }) => (
        <Card>
          <Collection>
            {lessonframeRefs.length > 0 && (
              <WithDocRefs docRefs={lessonframeRefs}>
                {({ data: lessonFrame }) => (
                  <CollectionLinkItem href={getRoomPath(`/settings/lessonFrames/${lessonFrame.id}`)}>
                    <div className="flex gap-2">
                      <div>{lessonFrame.tags.join(',')}</div>
                      <div>
                        {getDayCountLabel(lessonFrame.dayCount, lessonFrame.repeat)}
                      </div>
                      <div>
                        {lessonFrame.startTime} ~ {lessonFrame.finishTime}
                      </div>
                    </div>
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
