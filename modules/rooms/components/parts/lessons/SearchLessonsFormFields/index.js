import { useSubjectOptions } from '@rooms/hooks/subjects'
import { useStudentOptions } from '@rooms/hooks/students'
import { useTeacherOptions } from '@rooms/hooks/teachers'
import { useSheetOptions } from '@rooms/hooks/sheets'

import { SelectField, DateField } from '@/components/parts/forms'

export default function SearchLessonFormFields ({ subjects, students, teachers, sheets }) {
  const subjectOptions = useSubjectOptions(subjects)
  const studentOptions = useStudentOptions(students)
  const teacherOptions = useTeacherOptions(teachers)
  const sheetOptions = useSheetOptions(sheets)

  return (
    <>
      <SelectField name="subjects" label="科目" options={subjectOptions} isMulti isClearable/>
      <SelectField name="students" label="生徒" options={studentOptions} isMulti isClearable />
      <SelectField name="teachers" label="講師" options={teacherOptions} isMulti isClearable />
      <SelectField name="sheets" label="席" options={sheetOptions} isMulti isClearable />
      <div className="grid grid-cols-2 gap-3">
        <DateField type="datetime-local" name="startedAt" label="開始日時" placeholder="開始日時" />
        <DateField type="datetime-local" name="finishedAt" label="終了日時" placeholder="終了日時" />
      </div>
    </>
  )
}
