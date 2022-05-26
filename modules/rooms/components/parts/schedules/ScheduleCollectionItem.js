import { useMemo } from 'react'
import locale from 'date-fns/locale/ja'
import { format } from 'date-fns'

import { REPEAT_TYPE, SCHEDULE_TYPE_LABEL } from '@/constants'
import ScheduleTypeBadge from '@rooms/components/parts/schedules/ScheduleTypeBadge'

export default function ScheduleCollectionItem ({
  schedule,
  availableLabel = SCHEDULE_TYPE_LABEL.AVAILABLE,
  disavailableLabel = SCHEDULE_TYPE_LABEL.DISAVAILABLE
}) {
  const { label, helper } = useMemo(() => {
    const { repeat, repeatFinishedAt, startedAt, finishedAt, isAllDay } = schedule

    if (repeat === REPEAT_TYPE.NONE) {
      const helper = null
      return isAllDay ? {
        label: format(startedAt, 'yyyy年MM月dd日'),
        helper
      } : {
        label: `${format(startedAt, 'yyyy年MM月dd日 HH:mm')} ~ ${format(finishedAt, 'yyyy年MM月dd日 HH:mm')}`,
        helper
      }
    }

    const helper = repeat && repeatFinishedAt ? `${format(startedAt, 'yyyy年MM月dd日')} ~ ${format(repeatFinishedAt, 'yyyy年MM月dd日')}` : null
    const timeLabel = isAllDay ? '' : ` ${format(startedAt, 'HH:mm')} ~ ${format(finishedAt, 'HH:mm')}`

    switch(schedule.repeat) {
      case REPEAT_TYPE.DAILY: {
        const dateLabel = '毎日'
        return { label: `${dateLabel} ${timeLabel}`.trim(), helper }
      }
      case REPEAT_TYPE.WEEKLY: {
        const dateLabel = `毎週 ${format(startedAt, 'EE曜日', { locale })}`
        return { label: `${dateLabel} ${timeLabel}`.trim(), helper }
      }
      case REPEAT_TYPE.MONTHLY: {
        const dateLabel = `毎月 ${format(startedAt, 'dd日')}`
        return { label: `${dateLabel} ${timeLabel}`.trim(), helper }
      }

      case REPEAT_TYPE.YEARLY: {
        const dateLabel = `毎年 ${format(startedAt, 'MM月dd日')}`
        return { label: `${dateLabel} ${timeLabel}`.trim(), helper }
      }
      default:
        return { label: '不明', helper: null }
    }
  }, [schedule])

  return (
    <div className="flex gap-3 p-1">
      <ScheduleTypeBadge
        type={schedule.type}
        availableLabel={availableLabel}
        disavailableLabel={disavailableLabel} />
      <div className="grow flex-col gap-2">
        <div>{label}</div>
        {helper && <div className="text-gray-700 text-sm">{helper}</div>}
      </div>
    </div>
  )
}
