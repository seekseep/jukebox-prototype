import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'

import { FORM_ERROR_REQUIRED } from '@/messages'
import { parseTeachersCsv } from '@rooms/services/teachers/csv'

export function useValidationSchema() {
  return useMemo(() => {
    const validationSchema = Yup.object().shape({
      csv: Yup.string()
            .required(FORM_ERROR_REQUIRED)
            .test(
              'valid-teachers-count',
              () => '生徒を一人以上登録してください',
              value => {
                const teachers = parseTeachersCsv(value)
                return teachers && teachers.length > 0
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
    return parseTeachersCsv(csv)
  }, [])
}
