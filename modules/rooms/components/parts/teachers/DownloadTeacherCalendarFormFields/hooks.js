import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'

import { dateSchema } from '@/schemas/forms'
import { CALENDAR_TERM } from '@rooms/constants'
import { FORM_ERROR_REQUIRED } from '@/messages'

export function useValidationSchema() {
  return useMemo(() => {
    const validationSchema = Yup.object().shape({
      teacherId: Yup.string(),
      term     : Yup.string().default(CALENDAR_TERM.WEEKLY).required(FORM_ERROR_REQUIRED),
      startedAt: dateSchema.default(null).required().required(FORM_ERROR_REQUIRED).default(new Date())
    })
    return validationSchema
  }, [])
}

export function useInitialValues (teacherId) {
  const validationSchema = useValidationSchema()

  return useMemo(() => {
    const initialValues = validationSchema.cast({
      teacherId
    }, {
      stripUnknown: true
    })
    return initialValues
  }, [teacherId, validationSchema])
}

export function useValuesToResult() {
  return useCallback(({
    teacherId,
    term,
    startedAt
  }) => {
    return {
      teacherId,
      options: {
        term,
        startedAt,
      }
    }
  }, [])
}
