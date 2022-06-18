import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'

import { dateSchema } from '@/schemas/forms'

export function useValidationSchema() {
  return useMemo(() => {
    const validationSchema = Yup.object().shape({
      teachers: Yup.array().of(Yup.object().shape({
        id: Yup.string().default('')
      })),
      name           : Yup.string().default(''),
      toEmptyName    : Yup.boolean().default(false),
      nameKana       : Yup.string().default(''),
      toEmptyNameKana: Yup.boolean().default(false),
      gender         : Yup.string().default(''),
      toEmptyGender  : Yup.boolean().default(false),
      bornedAt       : dateSchema.transform(v => v ?? null),
      toEmptyBornedAt: Yup.boolean().default(false),
    })
    return validationSchema
  }, [])
}

export function useInitialValues (teachers) {
  const validationSchema = useValidationSchema()

  return useMemo(() => {
    const initialValues = validationSchema.cast({
      teachers: teachers ? teachers : [],
    }, {
      stripUnknown: true
    })
    return initialValues
  }, [teachers, validationSchema])
}

export function useValuesToResult() {
  return useCallback(({
    teachers,
    name,
    toEmptyName,
    nameKana,
    toEmptyNameKana,
    gender,
    toEmptyGender,
    bornedAt,
    toEmptyBornedAt
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

    return {
      teachers: teachers.map((teacher) => ({
          id: teacher.id,
          ...body
      }))
    }
  }, [])
}
