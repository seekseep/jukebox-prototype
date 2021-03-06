import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'
import { add, startOfHour } from 'date-fns'

import { FORM_ERROR_REQUIRED } from '@/messages'
import { optionSchema } from '@/schemas/forms'

import { createLessons } from '@rooms/services/lessons/create'
import { REPEAT_TYPE } from '@rooms/constants'

export function useValidationSchema () {
  return useMemo(() => {
    return Yup.object().shape({
      teachers   : Yup.array(optionSchema).default([]),
      students   : Yup.array(optionSchema).default([]),
      sheets     : Yup.array(optionSchema).default([]),
      startedAt  : Yup.date().nullable().required(FORM_ERROR_REQUIRED).default(startOfHour(new Date())),
      finishedAt : Yup.date().nullable().required(FORM_ERROR_REQUIRED).default(add(startOfHour(new Date()), { hours: 1 })),
      repeat     : Yup.string().oneOf(Object.values(REPEAT_TYPE)).default(REPEAT_TYPE.NONE),
      repeatCount: Yup.number().default(1)
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
    teachers,
    students,
    sheets,
    startedAt,
    finishedAt,
    repeat,
    repeatCount,
  }) => {
    return createLessons({
      repeat  : repeat,
      students: students.map(({ value: studentId }) => studentId),
      teachers: teachers.map(({ value: teacherId }) => teacherId),
      sheets  : sheets.map(({ value: sheetId }) => sheetId),
      startedAt,
      finishedAt,
      repeatCount
    })
  }, [])
}
