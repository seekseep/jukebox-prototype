import { useFormikContext } from 'formik'

import { useStudentOptions } from '@rooms/hooks/students'
import { useTeacherOptions } from '@rooms/hooks/teachers'
import { useSheetOptions } from '@rooms/hooks/sheets'

import { SelectField, Field } from '@/components/parts/forms'
import EventDatesFields from '@/components/parts/forms/EventDatesField'
import RepeatTypeSelectField from '@/modules/rooms/components/parts/RepeatTypeSelectField'
import { REPEAT_TYPE } from '@/constants'

export default function RegisterSubjectLessonFormFields ({ students, teachers, sheets }) {
  const { values } = useFormikContext()

  const studentOptions = useStudentOptions(students)
  const teacherOptions = useTeacherOptions(teachers)
  const sheetOptions = useSheetOptions(sheets)

  return (
    <>
      <SelectField name="students" label="生徒" options={studentOptions} isMulti />
      <SelectField name="teachers" label="講師" options={teacherOptions} isMulti />
      <SelectField name="sheets" label="席" options={sheetOptions} isMulti />
      <EventDatesFields
        label="日時"
        startedAtName="startedAt"
        finishedAtName="finishedAt" />
      <div className="grid grid-cols-2 gap-3">
        <RepeatTypeSelectField name="repeat" label="繰り返し" />
        {values.repeat.value !== REPEAT_TYPE.NONE ? (
          <Field name="repeatCount" label="繰り返し回数" type="number" min={1} max={99} step={1} />
        ) : (<div className="w-full" />)}
      </div>
    </>
  )
}
