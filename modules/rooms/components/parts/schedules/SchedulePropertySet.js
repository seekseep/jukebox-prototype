import { SCHEDULE_TYPE_LABEL } from '@/constants'
import PropertySet, {
  PropertyItem,
  PropertyLabel,
  PropertyDateContents,
  PropertyDateTimeContents,
  PropertyContents
} from '@/components/parts/PropertySet'

import ScheduleTypeBadge from '@rooms/components/parts/schedules/ScheduleTypeBadge'
import RepeatLabel from '@rooms/components/parts/RepeatLabel'

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
        <PropertyContents>
          <RepeatLabel schedule={schedule} />
        </PropertyContents>
      </PropertyItem>
    </PropertySet>
  )
}
