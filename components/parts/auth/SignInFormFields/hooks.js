import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'

import {
  FORM_ERROR_REQUIRED,
  FORM_ERROR_EMAIL,
  FORM_ERROR_TOO_LONG,
  FORM_ERROR_TOO_SHORT
} from '@/messages'

export function useValidationSchema() {
  return useMemo(() => {
    const validationSchema = Yup.object().shape({
      email: Yup.string()
      .email(FORM_ERROR_EMAIL)
      .required(FORM_ERROR_REQUIRED)
      .default('admin@jukebox.jp'),
    password: Yup.string()
      .required(FORM_ERROR_REQUIRED)
      .max(8, FORM_ERROR_TOO_SHORT)
      .max(64, FORM_ERROR_TOO_LONG)
      .default('password')
    })
    return validationSchema
  }, [])
}

export function useInitialValues () {
  const validationSchema = useValidationSchema()

  return useMemo(() => {
    const initialValues = validationSchema.cast({
    }, {
      stripUnknown: true
    })
    return initialValues
  }, [validationSchema])
}

export function useValuesToReult() {
  return useCallback(({ ...values }) => {
    return {
        ...values
      }
  }, [])
}
