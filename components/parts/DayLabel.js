import { WEEK_DAY } from '@/constants'

export default function DayLabel ({ day }) {
  switch(day) {
    case WEEK_DAY.SUNDAY:
      return '日'
    case WEEK_DAY.MONDAY:
      return '月'
    case WEEK_DAY.TUESDAY:
      return '火'
    case WEEK_DAY.WEDNESDAY:
      return '水'
    case WEEK_DAY.THURSDAY:
      return '木'
    case WEEK_DAY.FRIDAY:
      return '金'
    case WEEK_DAY.SATURDAY:
      return '土'
    default:
      throw Error()
  }
}
