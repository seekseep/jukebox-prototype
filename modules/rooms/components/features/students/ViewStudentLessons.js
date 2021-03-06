import { useRouter } from 'next/router'

import { WithDocRef, WithDocRefs } from '@/components/utilities/withDocRefs'

import Card from '@/components/parts/Card'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import Collection, { CollectionLinkItem } from '@/components/parts/Collection'
import Suspension from '@/components/parts/Suspension'

import { getLessonDateTimeLabel } from '@rooms/services/lessons/labels'
import { useGetRoomPath } from '@rooms/hooks/router'
import { useStudentLessonsQuery } from '@rooms/hooks/lessons'

export default function ViewStudentLessons () {
  const { query: { roomId, studentId } } = useRouter()
  const getRoomPath = useGetRoomPath(roomId)
  const result = useStudentLessonsQuery(roomId, studentId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>授業</FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
        {({ data: lessons }) => (
          <Card>
            {lessons.length > 0 ? (
              <div className="w-full overflow-auto">
                <div className="flex p-2 gap-2 border-b-2">
                  <div className="w-32 shrink-0">科目</div>
                  <div className="w-32 shrink-0">講師</div>
                  <div className="grow shrink-0">日時</div>
                </div>
                <Collection>
                  {lessons.map(lesson => (
                    <CollectionLinkItem key={lesson.id} href={getRoomPath(`/lessons/${lesson.id}`)}>
                      <div className="flex">
                        <div className="w-32 shrink-0">
                          <WithDocRef docRef={lesson.subject}>
                            {({ data: subject }) => (
                              <div>{subject.name}</div>
                            )}
                          </WithDocRef>
                        </div>
                        <div className="w-32 shrink-0 flex flex-wrap gap-1">
                          <WithDocRefs docRefs={lesson.teachers}>
                            {({ data: teacher }) => (
                              <div>{teacher.name}</div>
                            )}
                          </WithDocRefs>
                        </div>
                        <div className="grow shrink-0">
                          {getLessonDateTimeLabel(lesson)}
                        </div>
                      </div>
                    </CollectionLinkItem>
                  ))}
                </Collection>
              </div>
            ) : (<Collection />)}
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
