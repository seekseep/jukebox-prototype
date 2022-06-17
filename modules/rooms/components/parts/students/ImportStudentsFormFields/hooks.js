import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'

import { FORM_ERROR_REQUIRED } from '@/messages'
import { parseStudentsCsv } from '@rooms/services/students/csv'

export function useValidationSchema() {
  return useMemo(() => {
    const validationSchema = Yup.object().shape({
      csv: Yup.string()
            .required(FORM_ERROR_REQUIRED)
            .test(
              'valid-students-count',
              () => '生徒を一人以上登録してください',
              value => {
                const students = parseStudentsCsv(value)
                return students && students.length > 0
              }
            )
            .default('')
    })
    return validationSchema
  }, [])
}

export function useInitialValues () {
  const validationSchema = useValidationSchema()

  return useMemo(() => {
    const initialValues = validationSchema.cast({}, {
      stripUnknown: true
    })
    return initialValues
  }, [validationSchema])
}

export function useValuesToResult() {
  return useCallback(({ csv }) => {
    return parseStudentsCsv(csv)
  }, [])
}
