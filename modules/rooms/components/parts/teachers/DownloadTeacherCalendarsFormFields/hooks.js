import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'

import { dateSchema } from '@/schemas/forms'
import { CALENDAR_TERM } from '@rooms/constants'
import { FORM_ERROR_REQUIRED } from '@/messages'

export function useValidationSchema() {
  return useMemo(() => {
    const validationSchema = Yup.object().shape({
      teachers: Yup.array().of(
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
    term,
    startedAt,
    asOneFile
  }) => {
    return {
      teacherIds: teachers.map(({ id: teacherId }) => teacherId),
      options   : {
        term,
        startedAt,
        asOneFile
      }
    }
  }, [])
}
