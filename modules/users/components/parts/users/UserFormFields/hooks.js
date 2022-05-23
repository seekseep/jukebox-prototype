import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'

import { FORM_ERROR_REQUIRED } from '@/messages'

export function useValidationSchema() {
  return useMemo(() => {
    const validationSchema = Yup.object().shape({
      name: Yup.string().required(FORM_ERROR_REQUIRED)
    })
    return validationSchema
  }, [])
}

export function useInitialValues (user) {
  const validationSchema = useValidationSchema()

  return useMemo(() => {
    const initialValues = validationSchema.cast({
      ...user
    }, {
      stripUnknown: true
    })
    return initialValues
  }, [user, validationSchema])
}

export function useValuesToResult() {
  return useCallback(({ ...values }) => {
    return {
      ...values
    }
  }, [])
}
