import { ACCOUNT_TYPE } from '@/constatnts'
import { SelectField } from '../forms'

const SELECT_OPTIONS = [{
  value: ACCOUNT_TYPE.STUDENT,
  label: '生徒'
},{
  value: ACCOUNT_TYPE.TEACHER,
  label: '講師'
}, {
  value: ACCOUNT_TYPE.PARENT,
  label: '保護者'
}]

export default function AccountTypeSelectField (props) {
  return <SelectField options={SELECT_OPTIONS} {...props} />
}
