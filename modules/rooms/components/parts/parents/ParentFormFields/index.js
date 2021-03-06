import { Field, SelectField } from '@/components/parts/forms'
import { useStudentOptions } from '@rooms/hooks/students'

export default function ParentFormFields ({ students }) {
  const studentOptions = useStudentOptions(students)

  return (
    <>
      <Field name="name" label="εε" />
      <SelectField name="students" label="ηεΎ" options={studentOptions} isMulti />
    </>
  )
}
