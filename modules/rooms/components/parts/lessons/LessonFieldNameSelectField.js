import { Field } from '@/components/parts/forms'
import { LESSON_FIELD_NAME } from '@rooms/constants'

export default function LessonFieldNameSelectField (props) {
  return (
    <Field type="select" {...props}>
      <option value={LESSON_FIELD_NAME.SUDENTS}>生徒</option>
      <option value={LESSON_FIELD_NAME.TEACHERS}>講師</option>
      <option value={LESSON_FIELD_NAME.SHEETS}>席</option>
      <option value={LESSON_FIELD_NAME.SUBJECT}>科目</option>
      <option value={LESSON_FIELD_NAME.STARTED_AT}>開始日時</option>
      <option value={LESSON_FIELD_NAME.FINISHED_AT}>終了日時</option>
    </Field>
  )
}
