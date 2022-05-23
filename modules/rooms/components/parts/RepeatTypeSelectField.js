import { REPEAT_TYPE } from '@/constatnts'
import { SelectField } from '../../../../components/parts/forms'

export const REPEAT_TYPE_OPTIONS = Object.freeze({
  NONE: {
    value: REPEAT_TYPE.NONE,
    label: 'なし'
  },
  DAILY: {
    value: REPEAT_TYPE.DAILY,
    label: '毎日'
  },
  WEEKLY: {
    value: REPEAT_TYPE.WEEKLY,
    label: '毎週'
  },
  MONTHLY: {
    value: REPEAT_TYPE.MONTHLY,
    label: '毎月'
  },
  YEARLY: {
    value: REPEAT_TYPE.YEARLY,
    label: '毎年'
  }
})

const SELECT_OPTIONS = Object.values(REPEAT_TYPE_OPTIONS)

export default function RepeatTypeSelectField (props) {
  return <SelectField options={SELECT_OPTIONS} {...props} />
}
