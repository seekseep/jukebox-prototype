import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'

import { dateSchema } from '@/schemas/forms'
import { CALENDAR_TERM } from '@rooms/constants'
import { FORM_ERROR_REQUIRED } from '@/messages'

export function useValidationSchema() {
  return useMemo(() => {
    const validationSchema = Yup.object().shape({
      studentId: Yup.string(),
      term     : Yup.string().default(CALENDAR_TERM.WEEKLY).required(FORM_ERROR_REQUIRED),
      startedAt: dateSchema.default(null).required().required(FORM_ERROR_REQUIRED).default(new Date())
    })
    return validationSchema
  }, [])
}

export function useInitialValues (studentId) {
  const validationSchema = useValidationSchema()

  return useMemo(() => {
    const initialValues = validationSchema.cast({
      studentId
    }, {
      stripUnknown: true
    })
    return initialValues
  }, [studentId, validationSchema])
}

export function useValuesToResult() {
  return useCallback(({
    studentId,
    term,
    startedAt
  }) => {
    return {
      studentId,
      options: {
        term,
        startedAt,
      }
    }
  }, [])
}
