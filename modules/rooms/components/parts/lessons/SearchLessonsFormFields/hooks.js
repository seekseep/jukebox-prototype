import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'
import { format, isValid as isValidDate } from 'date-fns'

import { optionSchema, nullableDateSchema } from '@/schemas/forms'
import { DATE_FORMAT } from '@/constants'

export function useValidationSchema () {
  return useMemo(() => {
    return Yup.object().shape({
      subjects  : Yup.array(optionSchema).default([]),
      students  : Yup.array(optionSchema).default([]),
      teachers  : Yup.array(optionSchema).default([]),
      sheets    : Yup.array(optionSchema).default([]),
      startedAt : nullableDateSchema.default(null),
      finishedAt: nullableDateSchema.default(null),
    }).noUnknown()
  }, [])
}

export function useInitialValues (query, { subjects, teachers, students, sheets }) {
  const validationSchema = useValidationSchema()

  return useMemo(() => {
    const values = {}

    if (query?.subjects && subjects) {
      const subjectMap = subjects.reduce((m,d) => ({ ...m, [d.id]: d }), {})
      values.subjects = query.subjects.split(',').reduce((subjects, subejctId) => {
        const subject = subjectMap[subejctId]
        if (!subject) return subjects
        const { id: value, name: label } = subject
        return [...subjects, { value, label }]
      }, [])
    }

    if (query?.teachers && teachers) {
      const teacherMap = teachers.reduce((m,d) => ({ ...m, [d.id]: d }), {})
      values.teachers = query.teachers.split(',').reduce((teachers, subejctId) => {
        const teacher = teacherMap[subejctId]
        if (!teacher) return teachers
        const { id: value, name: label } = teacher
        return [...teachers, { value, label }]
      }, [])
    }

    if (query?.students && students) {
      const studentMap = students.reduce((m,d) => ({ ...m, [d.id]: d }), {})
      values.students = query.students.split(',').reduce((students, subejctId) => {
        const student = studentMap[subejctId]
        if (!student) return students
        const { id: value, name: label } = student
        return [...students, { value, label }]
      }, [])
    }

    if (query?.sheets && sheets) {
      const sheetMap = sheets.reduce((m,d) => ({ ...m, [d.id]: d }), {})
      values.sheets = query.sheets.split(',').reduce((sheets, subejctId) => {
        const sheet = sheetMap[subejctId]
        if (!sheet) return sheets
        const { id: value, name: label } = sheet
        return [...sheets, { value, label }]
      }, [])
    }

    if (query?.startedAt) {
      const startedAt = new Date(query?.startedAt)
      values.startedAt = isValidDate(startedAt) ? startedAt : null
    }

    if (query?.finishedAt) {
      const finishedAt = new Date(query?.finishedAt)
      values.finishedAt = isValidDate(finishedAt) ? finishedAt : null
    }

    return validationSchema.cast(values)
  }, [query?.finishedAt, query?.sheets, query?.startedAt, query?.students, query?.subjects, query?.teachers, sheets, students, subjects, teachers, validationSchema])
}

export function useValuesToResult () {
  return useCallback(({ subjects, students, teachers, sheets, startedAt, finishedAt }) => {
    const serachParams = new window.URLSearchParams()

    if (subjects.length > 0) serachParams.set('subjects', subjects.map(({ value: subjectId }) => subjectId).join(','))
    if (teachers.length > 0) serachParams.set('teachers', teachers.map(({ value: teacherId }) => teacherId).join(','))
    if (students.length > 0) serachParams.set('students', students.map(({ value: studentId }) => studentId).join(','))
    if (sheets.length > 0) serachParams.set('sheets', sheets.map(({ value: sheetId }) => sheetId).join(','))
    if (startedAt) serachParams.set('startedAt', format(startedAt, DATE_FORMAT.ISO_8601))
    if (finishedAt) serachParams.set('finishedAt', format(finishedAt, DATE_FORMAT.ISO_8601))

    return serachParams.toString()
  }, [])
}
