import { useMemo, useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { add, startOfHour } from 'date-fns'

import {
  FORM_ERROR_REQUIRED,
} from '../../../messages'

import { getDatetimeLocalValue } from '@/services/input'

import { useGetRoomPath } from '@/hooks/router'
import { useCreateLesson } from '@/hooks/lessons'
import { useTeachers } from '@/hooks/teachers'
import { useStudents } from '@/hooks/students'
import { useSubjects } from '@/hooks/subjects'
import { useSheets } from '@/hooks/sheets'

import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form, Field, SelectField } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

export default function RegisterSubjectSingleLesson () {
  const router = useRouter()
  const { query: { roomId } } = router
  const getRoomPath = useGetRoomPath(roomId)

  const { data: subjects } = useSubjects(roomId)
  const { data: students } = useStudents(roomId)
  const { data: teachers } = useTeachers(roomId)
  const { data: sheets } = useSheets(roomId)

  const [create, {
    isSuccess,
    data: createdLesson,
    error,
  }] = useCreateLesson(roomId)

  const subjectOptions = useMemo(() => subjects?.map(({ id: value, name:label }) => ({ label, value })), [subjects])
  const studentOptions = useMemo(() => students?.map(({ id: value, name:label }) => ({ label, value })), [students])
  const teacherOptions = useMemo(() => teachers?.map(({ id: value, name:label }) => ({ label, value })), [teachers])
  const sheetOptions = useMemo(() => sheets?.map(({ id: value, name:label }) => ({ label, value })), [sheets])

  const validationSchema = useMemo(() => Yup.object().shape({
    subject   : Yup.object().shape({ value: Yup.string(), label: Yup.string() }).required(FORM_ERROR_REQUIRED),
    teachers  : Yup.array(Yup.object().shape({ value: Yup.string(), label: Yup.string() })).default([]),
    students  : Yup.array(Yup.object().shape({ value: Yup.string(), label: Yup.string() })).default([]),
    sheets    : Yup.array(Yup.object().shape({ value: Yup.string(), label: Yup.string() })).default([]),
    startedAt : Yup.string().required(FORM_ERROR_REQUIRED).default(''),
    finishedAt: Yup.string().required(FORM_ERROR_REQUIRED).default('')
  }), [])
  const initialValues = useMemo(() => validationSchema.cast({
    startedAt : getDatetimeLocalValue(startOfHour(new Date())),
    finishedAt: getDatetimeLocalValue(add(startOfHour(new Date()), { hours: 1 })),
  }, { stripUnknown: true }), [validationSchema])
  const handleSubmit = useCallback(({ subject, startedAt, finishedAt, students, teachers, sheets, ...lesson }) => create({
    subject   : subject.value,
    students  : students.map(({ value }) => value) ,
    teachers  : teachers.map(({ value }) => value) ,
    sheets    : sheets.map(({ value }) => value),
    startedAt : new Date(startedAt),
    finishedAt: new Date(finishedAt),
    ...lesson
  }), [create])

  useEffect(() => {
    if (!isSuccess) return
    toast.success('授業を登録しました')
    router.push(getRoomPath(`/lessons/${createdLesson?.id}`))
  }, [createdLesson?.id, getRoomPath, isSuccess, router])

  const isReady = subjectOptions && teacherOptions && sheetOptions

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>授業の登録</FeatureTitle>
      </FeatureHead>
      <Card>
        <CardBody>
          {isReady && (
            <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
              <Form>
                <SelectField name="subject" label="科目" options={subjectOptions} />
                <SelectField name="students" label="生徒" options={studentOptions} isMulti />
                <SelectField name="teachers" label="講師" options={teacherOptions} isMulti />
                <SelectField name="sheets" label="席" options={sheetOptions} isMulti />
                <Field name="startedAt" label="開始日時" type="datetime-local" />
                <Field name="finishedAt" label="終了日時" type="datetime-local" />
                {error && <ErrorAlert error={error} />}
                <Button type="submit">授業を登録する</Button>
              </Form>
            </Formik>
          )}
        </CardBody>
      </Card>
    </Feature>
  )
}
