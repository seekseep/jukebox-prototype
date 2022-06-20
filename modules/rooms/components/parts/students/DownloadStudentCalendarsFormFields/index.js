import { CheckBoxField, DateField, Field } from '@/components/parts/forms'
import { CALENDAR_TERM } from '@rooms/constants'
import { useFormikContext } from 'formik'

export default function DownloadStudentCalendarsFormFields () {
  const { values: { term } } = useFormikContext()

  return (
    <>
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
