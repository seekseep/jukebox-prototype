import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'
import { add, startOfHour } from 'date-fns'

import { FORM_ERROR_REQUIRED } from '@/messages'
import { optionSchema } from '@/schemas/forms'
import { createLessons } from '@/services/lessons/create'

import { REPEAT_TYPE_OPTIONS } from '@rooms/components/parts/RepeatTypeSelectField'

export function useValidationSchema () {
  return useMemo(() => {
    return Yup.object().shape({
      subject    : optionSchema.required(FORM_ERROR_REQUIRED),
      teachers   : Yup.array(optionSchema).default([]),
      students   : Yup.array(optionSchema).default([]),
      sheets     : Yup.array(optionSchema).default([]),
      startedAt  : Yup.date().nullable().required(FORM_ERROR_REQUIRED).default(startOfHour(new Date())),
      finishedAt : Yup.date().nullable().required(FORM_ERROR_REQUIRED).default(add(startOfHour(new Date()), { hours: 1 })),
      repeat     : optionSchema.required(FORM_ERROR_REQUIRED).default(REPEAT_TYPE_OPTIONS.NONE),
      repeatCount: Yup.number().default(0)
    })
  }, [])
}

export function useInitialValues () {
  const validationSchema = useValidationSchema()

  return useMemo(() => {
    return validationSchema.cast({})
  }, [validationSchema])
}

export function useValuesToResult() {
  return useCallback(({
    subject,
    teachers,
    students,
    sheets,
    startedAt,
    finishedAt,
    repeat,
    repeatCount,
  }) => {
    return createLessons({
      subject : subject.value,
      repeat  : repeat.value,
      students: students.map(({ value: studentId }) => studentId),
      teachers: teachers.map(({ value: teacherId }) => teacherId),
      sheets  : sheets.map(({ value: sheetId }) => sheetId),
      startedAt,
      finishedAt,
      repeatCount
    })
  }, [])
}
