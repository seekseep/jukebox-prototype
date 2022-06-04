import {
  REPEAT_TYPE,
  SCHEDULE_TYPE_LABEL,
} from '@rooms/constants'

import ScheduleTypeBadge from '@rooms/components/parts/schedules/ScheduleTypeBadge'
import { format } from 'date-fns'
import { useMemo } from 'react'
import { getScheduleDateLabel, getScheduleTimeLabel } from '@rooms/services/schedules'

export default function ScheduleCollectionItem ({
  schedule,
  availableLabel = SCHEDULE_TYPE_LABEL.AVAILABLE,
  disavailableLabel = SCHEDULE_TYPE_LABEL.DISAVAILABLE
}) {
  const scheduleDateLabel = useMemo(() => getScheduleDateLabel(schedule), [schedule])
  const scheduleTimeLabel = useMemo(() => getScheduleTimeLabel(schedule), [schedule])
  return (
    <div className="flex gap-3 p-1">
      <div className="w-24 shrink-0">
        <ScheduleTypeBadge
          type={schedule.type}
          availableLabel={availableLabel}
          disavailableLabel={disavailableLabel} />
      </div>
      <div className="grow shrink-0">
        {scheduleDateLabel}
      </div>
      <div className="w-32 shrink-0">
        {scheduleTimeLabel}
      </div>
      <div className="shrink-0 flex gap-1 text-sm items-center w-64">
        {schedule.repeat !== REPEAT_TYPE.NONE && (
          <>
            <div className="w-28">{schedule.repeatStartDate && format(schedule.repeatStartDate, 'yyyy年MM月dd日')}</div>
            <div className="w-4 text-center text-xs">〜</div>
            <div className="w-28">{schedule.repeatFinishDate && format(schedule.repeatFinishDate, 'yyyy年MM月dd日')}</div>
          </>
        )}
      </div>
    </div>
  )
}
