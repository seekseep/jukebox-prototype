import { Field } from '@/components/parts/forms'
import { GENDER_TYPE } from '@/constants'

export default function GenderSelectField (props) {
  return (
    <Field type="select" {...props}>
      <option value="">未指定</option>
      <option value={GENDER_TYPE.MALE}>男</option>
      <option value={GENDER_TYPE.FEMALE}>女</option>
      <option value={GENDER_TYPE.OTHER}>その他</option>
    </Field>
  )
}
