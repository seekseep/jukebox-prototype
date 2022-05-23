import { useMemo } from 'react'
import * as Yup from 'yup'
import { add, startOfHour } from 'date-fns'

import { FORM_ERROR_REQUIRED } from '@/messages'

import { optionSchema, nullableDateSchema } from '@/schemas/forms'

export function useValidationSchema () {
  return useMemo(() => {
    return Yup.object().shape({
      startedAt : nullableDateSchema.required(FORM_ERROR_REQUIRED).default(startOfHour(new Date())),
      finishedAt: nullableDateSchema.required(FORM_ERROR_REQUIRED).default(add(startOfHour(new Date()), { hours: 1 })),
      students  : Yup.array().of(optionSchema).default([]),
      teachers  : Yup.array().of(optionSchema).default([]),
      sheets    : Yup.array().of(optionSchema).default([])
    })
  }, [])
}

export function useInitialValues () {
  const validationSchema = useValidationSchema()

  return useMemo(() => {
    return validationSchema.cast({

    })
  }, [validationSchema])
}

export function useValuesToLesson ({ startedAt, finishedAt, subject: { value: subjectRef }, students, teachers, sheets }) {
  return {
    startedAt : new Date(startedAt),
    finishedAt: new Date(finishedAt),
    subject   : subjectRef,
    students  : students.map(({ value: studentRef }) => studentRef) ,
    teachers  : teachers.map(({ value: teacherRef }) => teacherRef) ,
    sheets    : sheets.map(({ value: sheetRef }) => sheetRef) ,
  }
}
