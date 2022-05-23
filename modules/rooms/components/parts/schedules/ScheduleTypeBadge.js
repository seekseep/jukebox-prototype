import classNames from 'classnames'

import {
  SCHEDULE_TYPE,
  SCHEDULE_TYPE_LABEL
} from '@/constants'

export default function ScheduleTypeBadge ({
  type,
  availableLabel = SCHEDULE_TYPE_LABEL.AVAILABLE,
  disavailableLabel = SCHEDULE_TYPE_LABEL.DISAVAILABLE
}) {
  return (
    <div className={classNames(
      'rounded w-24 h-6 leading-6 text-center',
      {
        'bg-green-600 text-white border-green-700'  : type === SCHEDULE_TYPE.AVAILABLE,
        'bg-orange-500 text-white border-orange-600': type === SCHEDULE_TYPE.DISAVAILABLE,
      }
    )}>
      {type === SCHEDULE_TYPE.AVAILABLE && availableLabel}
      {type === SCHEDULE_TYPE.DISAVAILABLE && disavailableLabel}
    </div>
  )
}
