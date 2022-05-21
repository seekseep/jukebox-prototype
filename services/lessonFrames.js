import { format } from 'date-fns'
import locale from 'date-fns/locale/ja'

import { REPEAT_TYPE } from '@/constatnts'

export function getDayCountLabel(dayCount, repeat) {
  switch (repeat) {
    case REPEAT_TYPE.DAILY:
      return '毎日'
    case REPEAT_TYPE.WEEKLY:
      return `毎週 ${format(new Date(1970, 0, 4 + dayCount), 'EE曜日', { locale })}`
    case REPEAT_TYPE.MONTHLY:
      return `毎月 ${format(new Date(1970, 0, dayCount), 'd日')}`
    case REPEAT_TYPE.MONTHLY:
      return `毎年 ${format(add(new Date(1970, 0, 1), { days: dayCoun }), 'M月 d日')}`
  }
}
