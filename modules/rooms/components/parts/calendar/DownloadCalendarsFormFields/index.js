import { CheckBoxField, DateField, Field } from '@/components/parts/forms'
import { CALENDAR_TERM, CALENDAR_FORMAT } from '@rooms/constants'
import { useFormikContext } from 'formik'

export default function DownloadCalendarsFormFields () {
  const { values: { term } } = useFormikContext()

  return (
    <>
      <Field type="select" label="形式" name="format">
        <option value={CALENDAR_FORMAT.TEACHER_DATE}>講師 {'>'} 日付</option>
        <option value={CALENDAR_FORMAT.STUDENT_DATE}>生徒 {'>'} 日付</option>
        <option value={CALENDAR_FORMAT.DATE_TEACHER}>日付 {'>'} 講師</option>
        <option value={CALENDAR_FORMAT.DATE_STUDENT}>日付 {'>'} 生徒</option>
      </Field>
      <Field type="select" label="種別" name="term">
        <option value={CALENDAR_TERM.DAILY}>日</option>
        <option value={CALENDAR_TERM.WEEKLY}>週</option>
        <option value={CALENDAR_TERM.MONTHLY}>月</option>
      </Field>
      {term === CALENDAR_TERM.DAILY && (
        <DateField type="date" label="期間" name="startedAt" />
      )}
      {term === CALENDAR_TERM.WEEKLY && (
        <DateField type="week" label="期間" name="startedAt" />
      )}
      {term === CALENDAR_TERM.MONTHLY && (
        <DateField type="month" label="期間" name="startedAt" />
      )}
      <CheckBoxField
        label="1つのPDFにまとめる"
        name="asOneFile" />
    </>
  )
}
