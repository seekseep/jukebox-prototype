import { useMemo } from 'react'
import { format, add } from 'date-fns'
import locale from 'date-fns/locale/ja'

import { Field } from '@/components/parts/forms'
import { REPEAT_TYPE } from '@/constatnts'

const WEEKLY_OPTIONS = new Array(7).fill(null).map((_, i) => {
  const date = add(new Date(1970, 0, 4), { days: i })
  return {
    value: i,
    label: format(date, 'EEE', { locale })
  }
})

const MONTHLY_OPTIONS = new Array(31).fill(null).map((_, i) => {
  const date = add(new Date(1970, 0, 1), { days: i })
  return {
    value: i,
    label: format(date, 'd日')
  }
})

const YEARLY_OPTIONS = new Array(366).fill(null).map((_, i) => {
  const date = add(new Date(1970, 0, 1), { days: i })
  return {
    value: i,
    label: format(date, 'M月d日')
  }
})

export default function LessonFrameDayCountField ({ repeat,  ...props }) {
  const options = useMemo(() => {
    switch(repeat) {
      case REPEAT_TYPE.DAILY: return [{ label: '-', value: 0 }]
      case REPEAT_TYPE.WEEKLY: return WEEKLY_OPTIONS
      case REPEAT_TYPE.MONTHLY: return MONTHLY_OPTIONS
      case REPEAT_TYPE.YEARLY: return YEARLY_OPTIONS
      default:
        return []
    }
  }, [repeat])

  return (
    <Field type="select" {...props}>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>{label}</option>
      ))}
    </Field>
  )
}
