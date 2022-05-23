import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'

import { FORM_ERROR_REQUIRED } from '@/messages'
import { dateSchema } from '@/schemas/forms'

export function useValidationSchema() {
  return useMemo(() => {
    const validationSchema = Yup.object().shape({
      name       : Yup.string().default('').required(FORM_ERROR_REQUIRED),
      gender     : Yup.string().default(''),
      bornedAt   : dateSchema.transform(v => v ?? null),
      schoolName : Yup.string().default(''),
      schoolGrade: Yup.string().default(''),
    })
    return validationSchema
  }, [])
}

export function useInitialValues (student) {
  const validationSchema = useValidationSchema()

  return useMemo(() => {
    const initialValues = validationSchema.cast({
      ...student
    }, {
      stripUnknown: true
    })
    return initialValues
  }, [student, validationSchema])
}

export function useValuesToResult() {
  return useCallback(({ ...values }) => {
    return {
        ...values
      }
  }, [])
}
