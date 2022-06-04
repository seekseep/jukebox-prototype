import { REPEAT_TYPE } from '@rooms/constants'
import { Field } from '@/components/parts/forms'

export default function RepeatTypeSelectField ({
  noNone = false,
  noDaily = false,
  noWeekly = false,
  noMonthly = false,
  noYearly = false ,
  ...props
}) {
  return (
    <Field {...props} type="select">
      {!noNone && <option value={REPEAT_TYPE.NONE}>なし</option>}
      {!noDaily && <option value={REPEAT_TYPE.DAILY}>毎日</option>}
      {!noWeekly && <option value={REPEAT_TYPE.WEEKLY}>毎週</option>}
      {!noMonthly && <option value={REPEAT_TYPE.MONTHLY}>毎月</option>}
      {!noYearly && <option value={REPEAT_TYPE.YEARLY}>毎年</option>}
    </Field>
  )
}
