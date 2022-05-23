import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'

import { FORM_ERROR_REQUIRED } from '@/messages'
import { dateSchema } from '@/schemas/forms'

export function useValidationSchema() {
  return useMemo(() => {
    const validationSchema = Yup.object().shape({
      name    : Yup.string().default('').required(FORM_ERROR_REQUIRED),
      gender  : Yup.string().default(''),
      bornedAt: dateSchema.transform(v => v ?? null),
    })
    return validationSchema
  }, [])
}

export function useInitialValues (teacher) {
  const validationSchema = useValidationSchema()

  return useMemo(() => {
    const initialValues = validationSchema.cast({
      ...teacher
    }, {
      stripUnknown: true
    })
    return initialValues
  }, [teacher, validationSchema])
}

export function useValuesToResult() {
  return useCallback(({ ...values }) => {
    return {
        ...values
      }
  }, [])
}
