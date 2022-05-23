import { DateField, Field } from '@/components/parts/forms'
import GenderSelectField from '@rooms/components/parts/accounts/GenderSelectField'

export default function TeacherFormFields () {
  return (
    <>
      <Field name="name" label="名前" />
      <GenderSelectField name="gender" label="性別" />
      <DateField type="date" name="bornedAt" label="生年月日" />
    </>
  )
}
