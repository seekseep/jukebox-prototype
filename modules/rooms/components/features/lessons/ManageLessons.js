import { useRouter } from 'next/router'

import {  WithDocRefs } from '@/components/utilities/withDocRefs'

import Card from '@/components/parts/Card'
import Suspension from '@/components/parts/Suspension'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'

import { useGetRoomPath } from '@rooms/hooks/router'
import { useLessonRefsQuery } from '@rooms/hooks/lessons'
import LessonCollectionItem from '@rooms/components/parts/lessons/LessonCollectionItem'

export default function ManageLessons () {
  const { query:{ roomId } } = useRouter()

  const getRoomPath = useGetRoomPath(roomId)

  const result = useLessonRefsQuery(roomId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>授業の一覧</FeatureTitle>
        <div>
          <LinkButton href={getRoomPath('/lessons/new')}>授業を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Suspension {...result}>
        {({ data: lessonRefs }) => (
          <Card>
            <Collection>
              {lessonRefs.length > 0 && (
                <WithDocRefs docRefs={lessonRefs}>
                  {({ data: lesson }) => (
                    <CollectionLinkItem href={getRoomPath(`/lessons/${lesson.id}`)}>
                      <LessonCollectionItem lesson={lesson} />
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
