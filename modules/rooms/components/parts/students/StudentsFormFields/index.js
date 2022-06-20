import { DateField, Field, CheckBoxField, FieldGroup } from '@/components/parts/forms'
import GenderSelectField from '@rooms/components/parts/accounts/GenderSelectField'
import { CreatableSelectField } from '@/components/parts/forms'
import { useFormikContext } from 'formik'
import { useEffect } from 'react'

export default function StudentsFormFields ({ schoolNameOptions, schoolGradeOptions }) {
  const { values: {
    toEmptyName,
    toEmptyNameKana,
    toEmptyGender,
    toEmptyBornedAt,
    toEmptySchoolName,
    toEmptySchoolGrade,
  }, setValues } = useFormikContext()


  useEffect(() => {
    setValues(values => ({ ...values, name: '' }))
  }, [setValues, toEmptyName])

  useEffect(() => {
    setValues(values => ({ ...values, nameKana: '' }))
  }, [setValues, toEmptyNameKana])

  useEffect(() => {
    setValues(values => ({ ...values, gender: '' }))
  }, [setValues, toEmptyGender])

  useEffect(() => {
    setValues(values => ({ ...values, boarnedAt: null }))
  }, [setValues, toEmptyBornedAt])

  useEffect(() => {
    setValues(values => ({ ...values, schoolName: null }))
  }, [setValues, toEmptySchoolName])

  useEffect(() => {
    setValues(values => ({ ...values, schoolGrade: null }))
  }, [setValues, toEmptySchoolGrade])

  return (
    <>
      <FieldGroup>
        <Field name="name" label="名前" disabled={toEmptyName}/>
        <CheckBoxField name="toEmptyName" label="空にする" />
      </FieldGroup>
      <FieldGroup>
        <Field name="nameKana" label="名前のフリガナ" disabled={toEmptyNameKana}/>
        <CheckBoxField name="toEmptyNameKana" label="空にする" />
      </FieldGroup>
      <FieldGroup>
        <GenderSelectField name="gender" label="性別" disabled={toEmptyGender}/>
        <CheckBoxField name="toEmptyGender" label="空にする" />
      </FieldGroup>
      <FieldGroup>
        <DateField type="date" name="bornedAt" label="生年月日" disabled={toEmptyBornedAt}/>
        <CheckBoxField name="toEmptyBornedAt" label="空にする" />
      </FieldGroup>
      <FieldGroup>
        <CreatableSelectField
          label="学校名" name="schoolName" options={schoolNameOptions} isDisabled={toEmptySchoolName}/>
        <CheckBoxField name="toEmptySchoolName" label="空にする" />
      </FieldGroup>
      <FieldGroup>
        <CreatableSelectField
          label="学年" name="schoolGrade" options={schoolGradeOptions} isDisabled={toEmptySchoolGrade}/>
        <CheckBoxField name="toEmptySchoolGrade" label="空にする" />
      </FieldGroup>
    </>
  )
}
