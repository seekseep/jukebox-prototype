import { useStudentOptions } from '@rooms/hooks/students'
import { useTeacherOptions } from '@rooms/hooks/teachers'
import { useSheetOptions } from '@rooms/hooks/sheets'

import { SelectField, Field } from '@/components/parts/forms'

export default function SingleSubjectLessonFormFields ({ students, teachers, sheets }) {
  const studentOptions = useStudentOptions(students)
  const teacherOptions = useTeacherOptions(teachers)
  const sheetOptions = useSheetOptions(sheets)

  return (
    <>
      <SelectField name="students" label="生徒" options={studentOptions} isMulti />
      <SelectField name="teachers" label="講師" options={teacherOptions} isMulti />
      <SelectField name="sheets" label="席" options={sheetOptions} isMulti />
      <Field name="startedAt" label="開始日時" type="datetime-local" />
      <Field name="finishedAt" label="終了日時" type="datetime-local" />
    </>
  )
}
