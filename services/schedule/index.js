import { REPEAT_TYPE } from '@/constants'
import { format } from 'date-fns'
import locale from 'date-fns/locale/ja'

export function getRepeatLabel (schedule) {
  const { startedAt, repeat } = schedule

  switch (repeat) {
    case REPEAT_TYPE.NONE:
      return null
    case REPEAT_TYPE.DAILY:
      return '毎日'
    case REPEAT_TYPE.WEEKLY:
      return format(startedAt, '毎週 EEEE', { locale })
    case REPEAT_TYPE.MONTHLY:
      return format(startedAt, '毎月 d日', { locale })
    case REPEAT_TYPE.YEARLY:
      return format(startedAt, '毎年 M月 d日', { locale })
    default:
      return '不明'
  }
}
