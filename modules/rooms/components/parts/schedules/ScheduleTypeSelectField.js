import { SCHEDULE_TYPE } from '@rooms/constants'
import { SelectField } from '@/components/parts/forms'

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
