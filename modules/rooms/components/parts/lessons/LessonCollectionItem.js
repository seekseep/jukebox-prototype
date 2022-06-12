import { useMemo } from 'react'

import { WithDocRefs, WithDocRef  } from '@/components/utilities/withDocRefs'
import { useLessonValidity } from '@rooms/hooks/lessons/validity'
import LessonValidityBadge from './LessonValidityBadge'
import { getEventDurationLabel } from '@rooms/services/lessons/labels'

export default function LessonCollectionItem ({
  lesson, roomId
}) {
  const { validity } = useLessonValidity(roomId, lesson.id)
  const label = useMemo(() => {
    return getEventDurationLabel(lesson.startedAt, lesson.finishedAt)
  }, [lesson.finishedAt, lesson.startedAt])

  return (
    <div className="flex flex-col gap-1">
    <div className="flex grow items-center gap-2">{label}</div>
    <div className="flex gap-3 text-sm">
      {lesson.subject && (
        <div className="flex">
          <div>科目: </div>
          <WithDocRef docRef={lesson.subject}>
            {({ data: subject }) => (<div>{subject.name}</div>)}
          </WithDocRef>
        </div>
      )}
      {lesson.students && (
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
      )}
      {lesson.teachers && (
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
      )}
      {lesson.sheets && (
        <div className="flex">
          <div>席: </div>
          <div className="flex">
            <WithDocRefs docRefs={lesson.sheets}>
              {({ data: sheet }) => (
                <div>{sheet.name}</div>
              )}
            </WithDocRefs>
          </div>
        </div>
      )}
      {roomId && (
        <div className="flex">
          <LessonValidityBadge validity={validity} />
        </div>
      )}
    </div>
  </div>
  )
}
