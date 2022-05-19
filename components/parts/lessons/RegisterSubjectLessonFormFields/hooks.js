import { useMemo } from 'react'
import * as Yup from 'yup'
import { add, startOfHour } from 'date-fns'

import { REPEAT_TYPE } from '@/constatnts'

import { FORM_ERROR_REQUIRED } from '@/messages'

import { optionSchema } from '@/schemas/forms'

import { REPEAT_TYPE_OPTIONS } from '../../forms/RepeatTypeSelectField'
import { createDailyLessons, createWeeklyLessons, createYearlyLessons, creatMonthlyLessons } from '@/services/lessons/create'
import { getSubjectRef } from '@/services/api/subjects'
import { getStudentRef } from '@/services/api/students'
import { getTeacherRef } from '@/services/api/teachers'
import { getSheetRef } from '@/services/api/sheets'
import { createLesson } from '@/services/api/lessons'


export function useValidationSchema () {
  return useMemo(() => {
    return Yup.object().shape({
      subjectId  : Yup.string(),
      teachers   : Yup.array(optionSchema).default([]),
      students   : Yup.array(optionSchema).default([]),
      sheets     : Yup.array(optionSchema).default([]),
      startedAt  : Yup.date().nullable().required(FORM_ERROR_REQUIRED).default(startOfHour(new Date())),
      finishedAt : Yup.date().nullable().required(FORM_ERROR_REQUIRED).default(add(startOfHour(new Date()), { hours: 1 })),
      repeat     : optionSchema.required(FORM_ERROR_REQUIRED).default(REPEAT_TYPE_OPTIONS.NONE),
      repeatCount: Yup.number().default(1)
    })
  }, [])
}

export function useInitialValues ({ subjectId }) {
  const validationSchema = useValidationSchema()

  return useMemo(() => {
    return validationSchema.cast({
      subjectId
    })
  }, [subjectId, validationSchema])
}

export function valuesToLessons (roomId, { startedAt, finishedAt, repeatCount, ...values }) {
  const subject = getSubjectRef(roomId, values.subjectId)
  const students = values.students.map(({ value: studentId }) => getStudentRef(roomId, studentId))
  const teachers = values.teachers.map(({ value: teacherId }) => getTeacherRef(roomId, teacherId))
  const sheets = values.sheets.map(({ value: sheetId }) => getSheetRef(roomId, sheetId))

  switch(values.repeat.value) {
    case REPEAT_TYPE.DAILY:
      return createDailyLessons({ subject, teachers, students, sheets, startedAt, finishedAt, repeatCount })
    case REPEAT_TYPE.WEEKLY:
      return createWeeklyLessons({ subject, teachers, students, sheets, startedAt, finishedAt, repeatCount })
    case REPEAT_TYPE.MONTHLY:
      return creatMonthlyLessons({ subject, teachers, students, sheets, startedAt, finishedAt, repeatCount })
    case REPEAT_TYPE.WEEKLY:
      return createYearlyLessons({ subject, teachers, students, sheets, startedAt, finishedAt, repeatCount })
    case REPEAT_TYPE.NONE:
      return [createLesson({ subject, teachers, students, sheets, startedAt, finishedAt })]
    default:
      throw Error('予期されない繰り返し種別')
  }
}
