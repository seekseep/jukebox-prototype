import { REPEAT_TYPE } from '@/constatnts'

import { SelectField } from '@/components/parts/forms'

export const LESSON_FRAME_REPEAT_OPTIONS = Object.freeze({
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

export default function LessonFrameRepeatSelectField (props) {
  return <SelectField options={Object.values(LESSON_FRAME_REPEAT_OPTIONS)} {...props} />
}
