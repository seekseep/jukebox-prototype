import classNames from 'classnames'
import { useMemo } from 'react'
import { format } from 'date-fns'
import locale from 'date-fns/locale/ja'

import { SCHEDULE_RULE_TERM_TYPE, SCHEDULE_RULE_TYPE } from '../../constatnts'

export default function ScheduleRule ({ scheduleRule, availableLabel = '可用', disavailableLabel = '不可用' }) {
  const isRepeat = useMemo(() => scheduleRule.repeat.term !== null, [scheduleRule.repeat])
  const isAvailable = useMemo(() => scheduleRule.type === SCHEDULE_RULE_TYPE.AVAILABLE, [scheduleRule.type])
  const isDisavailable = useMemo(() => scheduleRule.type === SCHEDULE_RULE_TYPE.DISAVAILABLE, [scheduleRule.type])

  const scheduleDateLabel = useMemo(() => {
    const { startedAt, repeat: {term} } = scheduleRule
    if (term === null) {
      return format(scheduleRule.startedAt, 'yyyy年MM月dd日')
    }
    switch (term) {
      case SCHEDULE_RULE_TERM_TYPE.DAILY:
        return '毎日'
      case SCHEDULE_RULE_TERM_TYPE.WEEKLY:
        return `毎週 ${format(startedAt, 'EEEE', { locale })}`
      case SCHEDULE_RULE_TERM_TYPE.MONTHLY:
        return `毎月 ${format(startedAt,'d日')}`
      default:
        return `予期せぬ繰り返し種別: ${term}`
    }
  }, [scheduleRule])
  const scheduleStartTimeLabel = useMemo(() => format(scheduleRule.startedAt, 'HH:mm'), [scheduleRule.startedAt])
  const scheduleFinishTimeLabel = useMemo(() => format(scheduleRule.finishedAt, 'HH:mm'), [scheduleRule.finishedAt])
  const repeatStartedAtLabel = useMemo(() => format(scheduleRule.startedAt, 'yyyy年MM月dd日', { locale }), [scheduleRule.startedAt])
  const repeatFinishedAtLabel = useMemo(() => scheduleRule.repeat?.finishedAt && format(scheduleRule.repeat.finishedAt, 'yyyy年MM月dd日', { locale }), [scheduleRule.repeat.finishedAt])

  return (
    <div className="flex flex-col py-1 gap-1">
      <div className="flex gap-2 items-center leading-none">
        <div className={classNames('p-1 rounded text-sm w-20 text-center', {
          'bg-green-500 text-white' : isAvailable,
          'bg-orange-500 text-white': isDisavailable
        })}>
          {isAvailable && availableLabel}
          {isDisavailable && disavailableLabel}
        </div>
        <div className="text-lg">{scheduleDateLabel}</div>
        <div className="text-lg flex gap-2">
          <div>{scheduleStartTimeLabel}</div>
          <div>〜</div>
          <div>{scheduleFinishTimeLabel}</div>
        </div>
      </div>
      {isRepeat && (
        <div className="text-xs text-gray-800 flex gap-2">
          <div>繰り返し期間</div>
          <div className="flex-grow flex gap-2">
            <div>{repeatStartedAtLabel}</div>
            <div>〜</div>
            <div>{repeatFinishedAtLabel}</div>
          </div>
        </div>
      )}
    </div>
  )
}
