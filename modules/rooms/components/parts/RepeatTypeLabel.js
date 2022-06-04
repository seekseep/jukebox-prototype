import { REPEAT_TYPE } from '@rooms/constants'

export default function RepeatTypeLabel ({ repeat }) {
  switch (repeat) {
    case REPEAT_TYPE.DAILY:
      return '毎日'
    case REPEAT_TYPE.WEEKLY:
      return '毎週'
    case REPEAT_TYPE.MONTHLY:
      return '毎月'
    case REPEAT_TYPE.YEARLY:
      return '毎年'
    case REPEAT_TYPE.NONE:
    default:
      return 'なし'
  }
}
