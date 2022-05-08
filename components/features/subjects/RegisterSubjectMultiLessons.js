import { useMemo, useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { add, getDay, startOfHour, nextDay } from 'date-fns'

import {
  FORM_ERROR_REQUIRED,
} from '../../../messages'

import { getTimeValue, getDateValue } from '@/services/input'

import { useGetSubjectPath } from '@/hooks/router'
import { useCreateLessons } from '@/hooks/lessons'
import { useTeachers } from '@/hooks/teachers'
import { useStudents } from '@/hooks/students'
import { useSheets } from '@/hooks/sheets'

import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form, Field, SelectField } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { REPEAT_TERM_TYPE } from '@/constatnts'
import WeekDaySelectField from '@/components/parts/forms/WeekDaySelectField'

export default function RegisterSubjectMultiLessons () {
  const router = useRouter()
  const { query: { roomId, subjectId } } = router

  const getSubjectPath = useGetSubjectPath(roomId, subjectId)

  const { data: students } = useStudents(roomId)
  const { data: teachers } = useTeachers(roomId)
  const { data: sheets } = useSheets(roomId)

  const [create, {
    isSuccess,
    data: createdLesson,
    error,
  }] = useCreateLessons(roomId)

  const studentOptions = useMemo(() => students?.map(({ id: value, name:label }) => ({ label, value })), [students])
  const teacherOptions = useMemo(() => teachers?.map(({ id: value, name:label }) => ({ label, value })), [teachers])
  const sheetOptions = useMemo(() => sheets?.map(({ id: value, name:label }) => ({ label, value })), [sheets])

  const validationSchema = useMemo(() => Yup.object().shape({
    subject : Yup.string().required(FORM_ERROR_REQUIRED).default(''),
    teachers: Yup.array(Yup.object().shape({ value: Yup.string(), label: Yup.string() })).default([]),
    students: Yup.array(Yup.object().shape({ value: Yup.string(), label: Yup.string() })).default([]),
    sheets  : Yup.array(Yup.object().shape({ value: Yup.string(), label: Yup.string() })).default([]),

    startTime : Yup.string().required(FORM_ERROR_REQUIRED).default(getTimeValue(startOfHour(new Date()))),
    finishTime: Yup.string().required(FORM_ERROR_REQUIRED).default(getTimeValue(add(startOfHour(new Date()), { hours: 1 }))),

    repeatStartDate: Yup.string().required(FORM_ERROR_REQUIRED).default(getDateValue(new Date())),
    repeatTerm     : Yup.object().required(FORM_ERROR_REQUIRED),
    repeatCount    : Yup.number().min(1).max(99).default(4),

    repeatOptions: Yup.object().shape({
      weekDay: Yup.object(),
    }).default({})
  }), [])
  const initialValues = useMemo(() => validationSchema.cast({
    subject: subjectId,
  }, { stripUnknown: true }), [subjectId, validationSchema])

  const handleSubmit = useCallback(({ subject, students, teachers, sheets, repeatCount, startTime, finishTime, repeatStartDate, repeatTerm, repeatOptions }) => {
    const lessons = []

    const baseLesson = {
      subject,
      students: students.map(student => student.value),
      teachers: teachers.map(teacher => teacher.value),
      sheets  : sheets.map(sheet => sheet.value),
    }

    repeatStartDate = new Date(repeatStartDate)
    const [startHours, startMinutes] = startTime.split('')
    const [finishHours, finishMinutes] = finishTime.split('')

    switch (repeatTerm.value) {
      case REPEAT_TERM_TYPE.WEEKLY: {
        const day = repeatOptions.weekDay.value
        const baseDate = getDay(repeatStartDate) === day ? repeatStartDate : nextDay(repeatStartDate, day)
        const baseStartedAt = add(baseDate ,{ hours: startHours, minutes: startMinutes })
        const baseFinishedAt = add(baseDate ,{ hours: finishHours, minutes: finishMinutes })

        for (let i = 0; i < repeatCount; i++) {
          const lesson = { ...baseLesson }
          lesson.startedAt = add(baseStartedAt, { days: 7 * i })
          lesson.finishedAt = add(baseFinishedAt, { days: 7 * i })
          lessons.push(lesson)
        }

        break
      }
      default:
        throw Error('予期せぬ繰り返し種別')
    }

    create(lessons)
  }, [create])

  useEffect(() => {
    if (!isSuccess) return
    toast.success('授業を登録しました')
    router.push(getSubjectPath('/lessons'))
  }, [createdLesson?.id, getSubjectPath, isSuccess, router])

  const isReady = !!subjectId &&teacherOptions && sheetOptions

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>授業の一括登録</FeatureTitle>
      </FeatureHead>
      <Card>
        <CardBody>
          {isReady && (
            <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
              {({ values }) => (
                <Form>
                  <SelectField name="students" label="生徒" options={studentOptions} isMulti />
                  <SelectField name="teachers" label="講師" options={teacherOptions} isMulti />
                  <SelectField name="sheets" label="席" options={sheetOptions} isMulti />

                  <div className="grid grid-cols-2 gap-3">
                    <Field name="startTime" label="開始時刻" type="time" />
                    <Field name="finishTime" label="終了時刻" type="time" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field name="repeatStartDate" label="繰り返し開始日" type="date" />
                    <Field name="repeatCount" label="繰り返し回数" type="number" min={1} max={99} step={1} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <SelectField name="repeatTerm" label="繰り返し単位" options={[{
                      value: REPEAT_TERM_TYPE.WEEKLY,
                      label: '週毎'
                    }]} />
                    {values.repeatTerm?.value === REPEAT_TERM_TYPE.WEEKLY && (
                      <>
                        <WeekDaySelectField name="repeatOptions.weekDay" label="曜日" />
                      </>
                    )}
                  </div>
                  {error && <ErrorAlert error={error} />}
                  <Button type="submit">授業を登録する</Button>
                </Form>
              )}
            </Formik>
          )}
        </CardBody>
      </Card>
      <div className="h-72" />
    </Feature>
  )
}
