import { useSubjectOptions } from '@rooms/hooks/subjects'
import { useStudentOptions } from '@rooms/hooks/students'
import { useTeacherOptions } from '@rooms/hooks/teachers'
import { useSheetOptions } from '@rooms/hooks/sheets'

import { SelectField, CheckBoxField } from '@/components/parts/forms'

export default function SearchLessonFormFields ({ subjects, students, teachers, sheets }) {
  const subjectOptions = useSubjectOptions(subjects)
  const studentOptions = useStudentOptions(students)
  const teacherOptions = useTeacherOptions(teachers)
  const sheetOptions = useSheetOptions(sheets)

  return (
    <>
      <div className="grid grid-cols-2 gap-3 items-end">
        <SelectField name="subject" label="科目" options={subjectOptions} isClearable/>
        <CheckBoxField name="isClearSubject" label="科目を空にする" />
      </div>
      <div className="grid grid-cols-2 gap-3 items-end">
        <SelectField name="students" label="生徒" options={studentOptions} isMulti isClearable />
        <CheckBoxField name="isClearStudents" label="生徒を空にする" />
      </div>
      <div className="grid grid-cols-2 gap-3 items-end">
        <SelectField name="teachers" label="講師" options={teacherOptions} isMulti isClearable />
        <CheckBoxField name="isClearTeachers" label="講師を空にする" />
      </div>
      <div className="grid grid-cols-2 gap-3 items-end">
        <SelectField name="sheets" label="席" options={sheetOptions} isMulti isClearable />
        <CheckBoxField name="isClearSheets" label="席を空にする" />
      </div>
    </>
  )
}
