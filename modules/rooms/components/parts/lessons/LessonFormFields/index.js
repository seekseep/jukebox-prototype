import { useStudentOptions } from '@rooms/hooks/students'
import { useTeacherOptions } from '@rooms/hooks/teachers'
import { useSheetOptions } from '@rooms/hooks/sheets'

import { SelectField } from '@/components/parts/forms'
import EventDatesFields from '@/components/parts/forms/EventDatesField'

export default function LessonFormFields ({ students, teachers, sheets }) {
  const studentOptions = useStudentOptions(students)
  const teacherOptions = useTeacherOptions(teachers)
  const sheetOptions = useSheetOptions(sheets)

  return (
    <>
      <EventDatesFields
        label="日時" />
      <SelectField name="students" label="生徒" options={studentOptions} isMulti />
      <SelectField name="teachers" label="講師" options={teacherOptions} isMulti />
      <SelectField name="sheets" label="席" options={sheetOptions} isMulti />
    </>
  )
}
