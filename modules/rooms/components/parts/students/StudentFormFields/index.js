import { DateField, Field } from '@/components/parts/forms'
import GenderSelectField from '@rooms/components/parts/accounts/GenderSelectField'

export default function StudentFormFields () {
  return (
    <>
      <Field name="name" label="名前" />
      <Field name="nameKana" label="名前のフリガナ" />
      <GenderSelectField name="gender" label="性別" />
      <DateField type="date" name="bornedAt" label="生年月日" />
      <Field name="schoolName" label="学校名" />
      <Field name="schoolGrade" label="学年" />
    </>
  )
}
