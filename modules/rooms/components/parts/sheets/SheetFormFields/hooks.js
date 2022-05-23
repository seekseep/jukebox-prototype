import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'

import { FORM_ERROR_REQUIRED } from '@/messages'
import { dateSchema } from '@/schemas/forms'

export function useValidationSchema() {
  return useMemo(() => {
    const validationSchema = Yup.object().shape({
      name: Yup.string().default('').required(FORM_ERROR_REQUIRED)
    })
    return validationSchema
  }, [])
}

export function useInitialValues (sheet) {
  const validationSchema = useValidationSchema()

  return useMemo(() => {
    const initialValues = validationSchema.cast({
      ...sheet
    }, {
      stripUnknown: true
    })
    return initialValues
  }, [sheet, validationSchema])
}

export function useValuesToReult() {
  return useCallback(({ ...values }) => {
    return {
        ...values
      }
  }, [])
}
