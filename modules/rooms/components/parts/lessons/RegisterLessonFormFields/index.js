import { useFormikContext } from 'formik'

import { useSubjectOptions } from '@rooms/hooks/subjects'
import { useStudentOptions } from '@rooms/hooks/students'
import { useTeacherOptions } from '@rooms/hooks/teachers'
import { useSheetOptions } from '@rooms/hooks/sheets'

import { SelectField, Field, DateField } from '@/components/parts/forms'
import RepeatTypeSelectField from '@/modules/rooms/components/parts/RepeatTypeSelectField'
import { REPEAT_TYPE } from '@/constatnts'

export default function RegisterLessonFormFields ({ subjects, students, teachers, sheets }) {
  const { values } = useFormikContext()

  const subjectOptions = useSubjectOptions(subjects)
  const studentOptions = useStudentOptions(students)
  const teacherOptions = useTeacherOptions(teachers)
  const sheetOptions = useSheetOptions(sheets)

  return (
    <>
      <SelectField name="subject" label="科目" options={subjectOptions} />
      <SelectField name="students" label="生徒" options={studentOptions} isMulti />
      <SelectField name="teachers" label="講師" options={teacherOptions} isMulti />
      <SelectField name="sheets" label="席" options={sheetOptions} isMulti />
      <div className="grid grid-cols-2 gap-3">
        <DateField type="datetime-local" name="startedAt" label="開始日時" placeholder="開始日時" />
        <DateField type="datetime-local" name="finishedAt" label="終了日時" placeholder="終了日時" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <RepeatTypeSelectField name="repeat" label="繰り返し" />
        {values.repeat.value !== REPEAT_TYPE.NONE ? (
          <Field name="repeatCount" label="繰り返し回数" type="number" min={1} max={99} step={1} />
        ) : (<div className="w-full" />)}
      </div>
    </>
  )
}
