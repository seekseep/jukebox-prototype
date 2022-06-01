import { Field, SelectField } from '@/components/parts/forms'
import { useStudentOptions } from '@rooms/hooks/students'

export default function ParentFormFields ({ students }) {
  const studentOptions = useStudentOptions(students)

  return (
    <>
      <Field name="name" label="名前" />
      <SelectField name="students" label="生徒" options={studentOptions} isMulti />
    </>
  )
}
