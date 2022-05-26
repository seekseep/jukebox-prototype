import { Field } from '@/components/parts/forms'
import { FIELD_OPERATOR } from '@/constants'

export function NumricFieldOperatorSelectField () {
  return (
    <Field>
      <option value={FIELD_OPERATOR.EQUAL_TO}>次と等しい</option>
      <option value={FIELD_OPERATOR.NOT_EQUAL_TO}>次と等しくない</option>
      <option value={FIELD_OPERATOR.LESS_THAN}>未満である</option>
      <option value={FIELD_OPERATOR.LESS_THAN_OR_EQUAL_TO}>以下である</option>
      <option value={FIELD_OPERATOR.MORE_THAN_OR_EQUAL_TO}>以上である</option>
      <option value={FIELD_OPERATOR.MORE_THAN}>より大きい</option>
    </Field>
  )
}

export function NumericFieldValueField () {
  return <Field type="number" />
}

export function DateFieldOperatorSelectField () {
  <Field>
    <option value={FIELD_OPERATOR.EQUAL_TO}>次と等しい</option>
    <option value={FIELD_OPERATOR.LESS_THAN}>未満である</option>
    <option value={FIELD_OPERATOR.LESS_THAN_OR_EQUAL_TO}>以下である</option>
    <option value={FIELD_OPERATOR.MORE_THAN_OR_EQUAL_TO}>以上である</option>
    <option value={FIELD_OPERATOR.MORE_THAN}>より大きい</option>
  </Field>
}

export function StringFieldOperatorSelectField () {
  <Field>
    <option value={FIELD_OPERATOR.EQUAL_TO}>と等しい</option>
    <option value={FIELD_OPERATOR.NOT_EQUAL_TO}>と等しくない</option>
    <option value={FIELD_OPERATOR.NOT_EQUAL_TO}>と等しくない</option>
  </Field>
}
