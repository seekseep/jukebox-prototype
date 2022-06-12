import PropertySet, {
  PropertyItem,
  PropertyLabel,
  PropertyContents
} from '@/components/parts/PropertySet'

import { REPEAT_TYPE, SCHEDULE_TYPE_LABEL } from '@rooms/constants'
import ScheduleTypeBadge from '@rooms/components/parts/schedules/ScheduleTypeBadge'
import RepeatTypeLabel from '../RepeatTypeLabel'
import { getDayLabel, getEventDateDurationLabel, getEventDurationLabel } from '@rooms/services/lessons/labels'

export default function SchedulePropertySet ({
  schedule,
  availableLabel = SCHEDULE_TYPE_LABEL.AVAILABLE,
  disavailableLabel = SCHEDULE_TYPE_LABEL.DISAVAILABLE
}) {
  const { repeat } = schedule


  return (
    <PropertySet>
      <PropertyItem>
        <PropertyLabel>種別</PropertyLabel>
        <PropertyContents>
          <ScheduleTypeBadge
            type={schedule.type}
            availableLabel={availableLabel}
            disavailableLabel={disavailableLabel} />
        </PropertyContents>
      </PropertyItem>
      <PropertyItem>
        <PropertyLabel>繰り返し</PropertyLabel>
        <PropertyContents>
          <RepeatTypeLabel repeat={schedule.repeat}/>
        </PropertyContents>
      </PropertyItem>
      {repeat === REPEAT_TYPE.WEEKLY && (
        <PropertyItem>
          <PropertyLabel>曜日</PropertyLabel>
          <PropertyContents>
            <div className="flex gap-1">
              {schedule.repeatIndexes.map(day => (
                <div key={day}>{getDayLabel(day)}</div>
              ))}
            </div>
          </PropertyContents>
        </PropertyItem>
      )}
      {repeat === REPEAT_TYPE.MONTHLY && (
        <PropertyItem>
          <PropertyLabel>日付</PropertyLabel>
          <PropertyContents>
            {`毎月 ${schedule.repeatIndexes[0] + 1} 日`}
          </PropertyContents>
        </PropertyItem>
      )}
      {repeat !== REPEAT_TYPE.NONE && (
        <>
          <PropertyItem>
            <PropertyLabel>時間</PropertyLabel>
            <PropertyContents>
              {schedule.repeatStartTime} ~ {schedule.repeatFinishTime}
            </PropertyContents>
          </PropertyItem>
          <PropertyItem>
            <PropertyLabel>繰り返し期間</PropertyLabel>
            <PropertyContents>
              {getEventDateDurationLabel(schedule.repeatStartDate, schedule.repeatFinishDate)}
            </PropertyContents>
          </PropertyItem>
        </>
      )}
      {repeat === REPEAT_TYPE.NONE && (
        <PropertyItem>
          <PropertyLabel>日時</PropertyLabel>
          <PropertyContents>
            {getEventDurationLabel(schedule.startedAt, schedule.finishedAt, schedule.isAllDay)}
          </PropertyContents>
        </PropertyItem>
      )}
      <PropertyItem>
        <PropertyLabel>備考</PropertyLabel>
        <PropertyContents>{schedule.comment}</PropertyContents>
      </PropertyItem>
    </PropertySet>
  )
}
