import PropertySet, {
  PropertyItem,
  PropertyLabel,
  PropertyDateContents,
  PropertyDateTimeContents,
  PropertyContents
} from '@/components/parts/PropertySet'
import ScheduleTypeBadge from '@/components/parts/schedules/ScheduleTypeBadge'

import { REPEAT_TYPE, SCHEDULE_TYPE_LABEL } from '@/constatnts'
import { getRepeatLabel } from '@/services/schedule'

export default function SchedulePropertySet ({
  schedule,
  availableLabel = SCHEDULE_TYPE_LABEL.AVAILABLE,
  disavailableLabel = SCHEDULE_TYPE_LABEL.DISAVAILABLE
}) {
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
      {schedule.isAllDay ? (
        <PropertyItem>
          <PropertyLabel>日付</PropertyLabel>
          <PropertyDateContents value={schedule.startedAt} />
        </PropertyItem>
      ) : (
        <>
          <PropertyItem>
            <PropertyLabel>開始日時</PropertyLabel>
            <PropertyDateTimeContents value={schedule.startedAt} />
          </PropertyItem>
          <PropertyItem>
            <PropertyLabel>終了日時</PropertyLabel>
            <PropertyDateTimeContents value={schedule.finishedAt} />
          </PropertyItem>
        </>
      )}
      <PropertyItem>
        <PropertyLabel>繰り返し</PropertyLabel>
        <PropertyContents>{getRepeatLabel(schedule)}</PropertyContents>
      </PropertyItem>
      {schedule.repeat !== REPEAT_TYPE.NONE && (
        <PropertyItem>
          <PropertyLabel>繰り返し終了日時</PropertyLabel>
          <PropertyDateContents value={schedule.repeatFinishedAt} />
        </PropertyItem>
      )}
    </PropertySet>
  )
}
