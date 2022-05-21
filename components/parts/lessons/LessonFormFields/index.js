import { useStudentOptions } from '@/hooks/students'
import { useTeacherOptions } from '@/hooks/teachers'
import { useSheetOptions } from '@/hooks/sheets'

import { SelectField, DateField } from '@/components/parts/forms'

export default function LessonFormFields ({ students, teachers, sheets }) {
  const studentOptions = useStudentOptions(students)
  const teacherOptions = useTeacherOptions(teachers)
  const sheetOptions = useSheetOptions(sheets)

  return (
    <>
      <DateField name="startedAt" label="開始日時" type="datetime-local" />
      <DateField name="finishedAt" label="終了日時" type="datetime-local" />
      <SelectField name="students" label="生徒" options={studentOptions} isMulti />
      <SelectField name="teachers" label="講師" options={teacherOptions} isMulti />
      <SelectField name="sheets" label="席" options={sheetOptions} isMulti />
    </>
  )
}
