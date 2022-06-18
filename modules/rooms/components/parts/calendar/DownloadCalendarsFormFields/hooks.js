import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'

import { dateSchema } from '@/schemas/forms'
import { CALENDAR_FORMAT, CALENDAR_TERM } from '@rooms/constants'
import { FORM_ERROR_REQUIRED } from '@/messages'

export function useValidationSchema() {
  return useMemo(() => {
    const validationSchema = Yup.object().shape({
      format   : Yup.string().default(CALENDAR_FORMAT.DATE_STUDENT).required(FORM_ERROR_REQUIRED),
      term     : Yup.string().default(CALENDAR_TERM.WEEKLY).required(FORM_ERROR_REQUIRED),
      startedAt: dateSchema.default(null).required().required(FORM_ERROR_REQUIRED).default(new Date()),
      asOneFile: Yup.boolean().default(false)
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

export function useValuesToResult() {
  return useCallback(({
    format,
    term,
    startedAt,
    asOneFile
  }) => {
    return {
      options: {
        format,
        term,
        startedAt,
        asOneFile
      }
    }
  }, [])
}
