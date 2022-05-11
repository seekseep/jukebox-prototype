import { useMemo, useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import {
  FORM_ERROR_REQUIRED,
} from '../../../messages'

import { useGetStudentPath } from '@/hooks/router'
import { useCreateStudentSchedule } from '@/hooks/students'

import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form, Field, SelectField } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { getDatetimeLocalValue } from '@/services/input'

export default function RegisterStudentSchedule () {
  const router = useRouter()
  const { query: { roomId, studentId } } = router

  const getStudentPath = useGetStudentPath(roomId, studentId)

  const [create, {
    isSuccess,
    error,
  }] = useCreateStudentSchedule(roomId, studentId)

  const validationSchema = useMemo(() => Yup.object().shape({
    startedAt : Yup.string().required(FORM_ERROR_REQUIRED).default(getDatetimeLocalValue(new Date())),
    finishedAt: Yup.string().required(FORM_ERROR_REQUIRED).default(getDatetimeLocalValue(new Date())),
    type      : Yup.object().shape({ label: Yup.string(), value: Yup.string() }).required(FORM_ERROR_REQUIRED).default({
      label: '休み',
      value: 'DISABLED'
    })
  }), [])
  const initialValues = useMemo(() => validationSchema.cast({

  }, { stripUnknown: true }), [validationSchema])
  const handleSubmit = useCallback(({ startedAt, finishedAt, type }) => create({
    startedAt : new Date(startedAt),
    finishedAt: new Date(finishedAt),
    type      : type.value
  }), [create])

  useEffect(() => {
    if (!isSuccess) return
    toast.success('生徒の予定を登録しました')
    router.push(getStudentPath('/schedules'))
  }, [getStudentPath, isSuccess, router])

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>生徒の予定の登録</FeatureTitle>
      </FeatureHead>
      <Card>
        <CardBody>
          <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <Field name="startedAt" label="開始日時" type="datetime-local" />
              <Field name="finishedAt" label="終了日時" type="datetime-local" />
              <SelectField name="type" label="種別" options={[
                {
                  label: '登校可能',
                  value: 'ENABLED'
                },{
                  label: '休み',
                  value: 'DISABLED'
                },
              ]} />
              {error && <ErrorAlert error={error} />}
              <Button type="submit">生徒の予定を登録する</Button>
            </Form>
          </Formik>
        </CardBody>
      </Card>
    </Feature>
  )
}
