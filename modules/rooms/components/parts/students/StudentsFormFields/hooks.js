import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'

import { dateSchema, optionSchema } from '@/schemas/forms'

export function useValidationSchema() {
  return useMemo(() => {
    const validationSchema = Yup.object().shape({
      students: Yup.array().of(Yup.object().shape({
        id: Yup.string().default('')
      })),
      name              : Yup.string().default(''),
      toEmptyName       : Yup.boolean().default(false),
      nameKana          : Yup.string().default(''),
      toEmptyNameKana   : Yup.boolean().default(false),
      gender            : Yup.string().default(''),
      toEmptyGender     : Yup.boolean().default(false),
      bornedAt          : dateSchema.transform(v => v ?? null),
      toEmptyBornedAt   : Yup.boolean().default(false),
      schoolName        : optionSchema.nullable(),
      toEmptySchoolName : Yup.boolean().default(false),
      schoolGrade       : optionSchema.nullable(),
      toEmptySchoolGrade: Yup.boolean().default(false),
    })
    return validationSchema
  }, [])
}

export function useInitialValues (students) {
  const validationSchema = useValidationSchema()

  return useMemo(() => {
    const initialValues = validationSchema.cast({
      students: students ? students : [],
    }, {
      stripUnknown: true
    })
    return initialValues
  }, [students, validationSchema])
}

export function useValuesToResult() {
  return useCallback(({
    students,
    name,
    toEmptyName,
    nameKana,
    toEmptyNameKana,
    gender,
    toEmptyGender,
    bornedAt,
    toEmptyBornedAt,
    schoolName,
    toEmptySchoolName,
    schoolGrade,
    toEmptySchoolGrade,
  }) => {
    const body = {}

    if (name || toEmptyName) {
        body.name = toEmptyName ? '' : name
    }
    if (nameKana || toEmptyNameKana) {
        body.nameKana = toEmptyNameKana ? '' : nameKana
    }
    if (gender || toEmptyGender) {
        body.gender = toEmptyGender ? '' : gender
    }
    if (bornedAt || toEmptyBornedAt) {
        body.bornedAt = toEmptyBornedAt ? '' : bornedAt
    }
    if (schoolName?.value || toEmptySchoolName) {
        body.schoolName = toEmptySchoolName ? '' : schoolName?.value
    }
    if (schoolGrade?.value || toEmptySchoolGrade) {
        body.schoolGrade = toEmptySchoolGrade ? '' : schoolGrade?.value
    }

    return {
      students: students.map((student) => ({
          id: student.id,
          ...body
      }))
    }
  }, [])
}
