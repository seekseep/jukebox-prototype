import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'

import { FORM_ERROR_REQUIRED } from '@/messages'
import { optionSchema } from '@/schemas/forms'

export function useValidationSchema() {
  return useMemo(() => {
    const validationSchema = Yup.object().shape({
      name    : Yup.string().default('').required(FORM_ERROR_REQUIRED),
      students: Yup.array().of(optionSchema).default([]),
    })
    return validationSchema
  }, [])
}

export function useInitialValues (parent = {}, { students }) {
  const validationSchema = useValidationSchema()

  return useMemo(() => {
    const initialValues = validationSchema.cast({
      ...parent,
      students: parent?.students?.map(studentRef => {
        const student = students?.find(student => student.id === studentRef.id)
        return student ? {
          label: student.name,
          value: student.id
        } : { label: '', value: '' }
      }),
    }, {
      stripUnknown: true
    })
    return initialValues
  }, [parent, students, validationSchema])
}

export function useValuesToResult() {
  return useCallback(({ name, students }) => {
    return {
        name,
        students: students.map(({ value: studentId }) => studentId)
      }
  }, [])
}
