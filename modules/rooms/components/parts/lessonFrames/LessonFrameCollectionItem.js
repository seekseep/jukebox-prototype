import { useMemo } from 'react'
import { getLessonFrameDateLabel, getLessonFrameTimeLabel } from '@rooms/services/lessonFrames'

export default function LessonFrameCollectionItem ({
  lessonFrame
}) {
  const tagsLabel = useMemo(() => lessonFrame.tags.join(' '), [lessonFrame.tags])
  const dateLabel = useMemo(() => getLessonFrameDateLabel(lessonFrame), [lessonFrame])
  const timeLabel = useMemo(() => getLessonFrameTimeLabel(lessonFrame), [lessonFrame])
  return (
    <div className="flex gap-2">
      <div className="shrink-0">{tagsLabel}</div>
      <div className="shrink-0 grow">{dateLabel}</div>
      <div className="shrink-0">{timeLabel}</div>
  </div>
  )
}
