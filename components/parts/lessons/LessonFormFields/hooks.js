import { useMemo } from 'react'
import * as Yup from 'yup'
import { add, startOfHour } from 'date-fns'

import { FORM_ERROR_REQUIRED } from '@/messages'

import { getStudentRef } from '@/services/api/students'
import { getTeacherRef } from '@/services/api/teachers'
import { getSheetRef } from '@/services/api/sheets'

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

export function useInitialValues (lesson, { sheets, teachers, students }) {
  const validationSchema = useValidationSchema()

  return useMemo(() => {
    return validationSchema.cast({
      startedAt : lesson?.startedAt,
      finishedAt: lesson?.finishedAt,
      students  : lesson?.students?.map(studentRef => {
        const student = students?.find(student => student.id === studentRef.id)
        return student ? {
          label: student.name,
          value: student.id
        } : { label: '', value: '' }
      }),
      teachers: lesson?.teachers?.map(teacherRef => {
        const teacher = teachers?.find(teacher => teacher.id === teacherRef.id)
        return teacher ? {
          label: teacher.name,
          value: teacher.id
        } : { label: '', value: '' }
      }),
      sheets: lesson?.sheets?.map(sheetRef => {
        const sheet = sheets?.find(sheet => sheet.id === sheetRef.id)
        return sheet ? {
          label: sheet.name,
          value: sheet.id
        } : { label: '', value: '' }
      }),
    })
  }, [lesson, sheets, students, teachers, validationSchema])
}

export function valuesToLesson (roomId, { startedAt, finishedAt, students, teachers, sheets }) {
  return {
    startedAt,
    finishedAt,
    students: students.map(({ value: studentId }) => getStudentRef(roomId, studentId)) ,
    teachers: teachers.map(({ value: teacherId }) => getTeacherRef(roomId, teacherId)) ,
    sheets  : sheets.map(({ value: sheetId }) => getSheetRef(roomId, sheetId)) ,
  }
}
