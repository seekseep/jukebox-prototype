import { SCHEDULE_TYPE } from '@/constants'
import { SelectField } from '../forms'

const SELECT_OPTIONS = [{
  value: SCHEDULE_TYPE.AVAILABLE,
  label: '利用可能'
},{
  value: SCHEDULE_TYPE.DISAVAILABLE,
  label: '利用不可'
}]

export default function SheduleTypeSelectField (props) {
  return <SelectField options={SELECT_OPTIONS} {...props} />
}
