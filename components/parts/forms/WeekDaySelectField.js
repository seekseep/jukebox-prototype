import { WEEK_DAY } from '@/constatnts'
import { SelectField } from '.'

const SELECT_OPTIONS = [{
  value: WEEK_DAY.SUNDAY,
  label: '日曜日'
},{
  value: WEEK_DAY.MONDAY,
  label: '月曜日'
},{
  value: WEEK_DAY.TUESDAY,
  label: '火曜日'
},{
  value: WEEK_DAY.WEDNESDAY,
  label: '水曜日'
},{
  value: WEEK_DAY.THURSDAY,
  label: '木曜日'
},{
  value: WEEK_DAY.FRIDAY,
  label: '金曜日'
},{
  value: WEEK_DAY.SATURDAY,
  label: '土曜日'
}]

export default function WeekDaySelectField (props) {
  return <SelectField options={SELECT_OPTIONS} {...props} />
}
