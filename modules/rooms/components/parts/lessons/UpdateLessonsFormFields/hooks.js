import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'

import { optionSchema } from '@/schemas/forms'

export function useValidationSchema () {
  return useMemo(() => {
    return Yup.object().shape({
      subject        : optionSchema.nullable(),
      isClearSubject : Yup.boolean().default(false),
      students       : Yup.array(optionSchema).default([]),
      isClearStudents: Yup.boolean().default(false),
      teachers       : Yup.array(optionSchema).default([]),
      isClearTeachers: Yup.boolean().default(false),
      sheets         : Yup.array(optionSchema).default([]),
      isClearSheets  : Yup.boolean().default(false),
    }).noUnknown()
  }, [])
}

export function useInitialValues () {
  const validationSchema = useValidationSchema()

  return useMemo(() => {
    return validationSchema.cast({})
  }, [validationSchema])
}

export function useValuesToResult () {
  return useCallback(({
    subject,
    isClearSubject,
    students,
    isClearStudents,
    teachers,
    isClearTeachers,
    sheets,
    isClearSheets,
   }) => {
    const result = {}

    if (isClearSubject) {
      result.subject = null
    } else if (subject?.value) {
      result.subject = subject.value
    }

    if (isClearStudents) {
      result.students = []
    } else if (students.length > 0) {
      result.students = students.map(({ value: studentId }) => studentId)
    }

    if (isClearTeachers) {
      result.teachers = []
    } else if (teachers.length > 0) {
      result.teachers = teachers.map(({ value: teacherId }) => teacherId)
    }

    if (isClearSheets) {
      result.sheets = []
    } else if (sheets.length > 0) {
      result.sheets = sheets.map(({ value: sheetId }) => sheetId)
    }

    return result
  }, [])
}
