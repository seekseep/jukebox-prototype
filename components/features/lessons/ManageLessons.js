import { useRouter } from 'next/router'
import { format } from 'date-fns'

import { useGetRoomPath } from '@/hooks/router'
import { useLessonRefs } from '@/hooks/lessons'

import { WithDocRef, WithDocRefs } from '@/components/utilities/withDocRefs'

import Card from '@/components/parts/Card'
import Suspension from '@/components/parts/Suspension'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import { LinkButton } from '@/components/parts/buttons'

export default function ManageLessons () {
  const { query:{ roomId } } = useRouter()

  const getRoomPath = useGetRoomPath(roomId)

  const {
    data: lessonRefs,
    ...result
  } = useLessonRefs(roomId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>授業の一覧</FeatureTitle>
        <div>
          <LinkButton href={getRoomPath('/lessons/new')}>授業を登録する</LinkButton>
        </div>
      </FeatureHead>
      <Suspension {...result}>
        {() => (
          <Card>
            <Collection>
              <WithDocRefs docRefs={lessonRefs}>
                {({ data: lesson }) => (
                  <CollectionLinkItem href={getRoomPath(`/lessons/${lesson.id}`)}>
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-grow items-center gap-2">
                        <div>{format(lesson.startedAt, 'yyyy/MM/dd HH:mm')}</div>
                        <div>~</div>
                        <div>{format(lesson.finishedAt, 'yyyy/MM/dd HH:mm')}</div>
                      </div>
                      <div className="flex gap-3 text-sm">
                        <div className="flex">
                          <div>科目: </div>
                          <WithDocRef docRef={lesson.subject}>
                            {({ data: subject }) => (<div>{subject.name}</div>)}
                          </WithDocRef>
                        </div>
                        <div className="flex">
                          <div>生徒: </div>
                          <div className="flex">
                            <WithDocRefs docRefs={lesson.students}>
                              {({ data: student }) => (
                                <div>{student.name}</div>
                              )}
                            </WithDocRefs>
                          </div>
                        </div>
                        <div className="flex">
                          <div>講師: </div>
                          <div className="flex">
                            <WithDocRefs docRefs={lesson.teachers}>
                              {({ data: teacher }) => (
                                <div>{teacher.name}</div>
                              )}
                            </WithDocRefs>
                          </div>
                        </div>
                      </div>
                    </div>
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
