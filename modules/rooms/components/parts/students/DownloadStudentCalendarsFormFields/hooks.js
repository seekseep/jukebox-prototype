import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'

import { dateSchema } from '@/schemas/forms'
import { CALENDAR_TERM } from '@rooms/constants'
import { FORM_ERROR_REQUIRED } from '@/messages'

export function useValidationSchema() {
  return useMemo(() => {
    const validationSchema = Yup.object().shape({
      students: Yup.array().of(
        Yup.object().shape({
          id: Yup.string()
        })
      ),
      term     : Yup.string().default(CALENDAR_TERM.WEEKLY).required(FORM_ERROR_REQUIRED),
      startedAt: dateSchema.default(null).required().required(FORM_ERROR_REQUIRED).default(new Date()),
      asOneFile: Yup.boolean().default(false)
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
    term,
    startedAt,
    asOneFile
  }) => {
    return {
      studentIds: students.map(({ id: studentId }) => studentId),
      options   : {
        term,
        startedAt,
        asOneFile
      }
    }
  }, [])
}
