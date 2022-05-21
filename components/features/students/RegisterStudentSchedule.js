import { useMemo, useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { FORM_ERROR_REQUIRED } from '@/messages'

import { getStudentRef } from '@/services/api/students'

import { useGetStudentPath } from '@/hooks/router'
import { useCreateSchedule } from '@/hooks/schedules'
import { useScheduleValidationSchema, valuesToSchedule } from '@/components/parts/schedules/ScheduleFormFields/hooks'

import Loading from '@/components/parts/Loading'
import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import ScheduleFormFields from '@/components/parts/schedules/ScheduleFormFields'

export default function RegisterStudentSchedule () {
  const router = useRouter()
  const { query: { roomId, studentId } } = router

  const getStudentPath = useGetStudentPath(roomId, studentId)

  const [create, {
    isLoading: isCreating,
    isSuccess,
    error,
  }] = useCreateSchedule(roomId)

  const scheduleValidationSchema = useScheduleValidationSchema()
  const validationSchema = useMemo(() => Yup.object().shape({
    studentId: Yup.string().required(FORM_ERROR_REQUIRED),
    ...scheduleValidationSchema.fields
  }), [scheduleValidationSchema.fields])
  const initialValues = useMemo(() => validationSchema.cast({
    studentId
  }, { stripUnknown: true }), [studentId, validationSchema])
  const handleSubmit = useCallback(({ studentId, ...values }) => create({
    resource: getStudentRef(roomId, studentId),
    ...valuesToSchedule(values)
  }), [create, roomId])

  useEffect(() => {
    if (!isSuccess) return
    toast.success('生徒の予定を登録しました')
    router.push(getStudentPath('/schedules'))
  }, [getStudentPath, isSuccess, router])

  const isLoading = !(studentId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>生徒の予定の登録</FeatureTitle>
      </FeatureHead>
      {isLoading ? <Loading /> : (
        <Card>
          <CardBody>
            <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
              {({ isValid }) => (
                <Form>
                  <ScheduleFormFields
                    ableableLabel="登校可能"
                    disableableLabel="休み" />
                  {error && <ErrorAlert error={error} />}
                  <div className="flex justify-end">
                    <Button disabled={!isValid || isCreating} type="submit">生徒の予定を登録する</Button>
                  </div>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      )}
    </Feature>
  )
}
