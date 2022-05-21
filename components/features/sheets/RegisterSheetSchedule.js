import { useMemo, useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { FORM_ERROR_REQUIRED } from '@/messages'

import { getSheetRef } from '@/services/api/sheets'

import { useGetSheetPath } from '@/hooks/router'
import { useCreateSchedule } from '@/hooks/schedules'
import { useScheduleValidationSchema, valuesToSchedule } from '@/components/parts/schedules/ScheduleFormFields/hooks'

import Loading from '@/components/parts/Loading'
import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import ScheduleFormFields from '@/components/parts/schedules/ScheduleFormFields'

export default function RegisterSheetSchedule () {
  const router = useRouter()
  const { query: { roomId, sheetId } } = router

  const getSheetPath = useGetSheetPath(roomId, sheetId)

  const [create, {
    isLoading: isCreating,
    isSuccess,
    error,
  }] = useCreateSchedule(roomId)

  const scheduleValidationSchema = useScheduleValidationSchema()
  const validationSchema = useMemo(() => Yup.object().shape({
    sheetId: Yup.string().required(FORM_ERROR_REQUIRED),
    ...scheduleValidationSchema.fields
  }), [scheduleValidationSchema.fields])
  const initialValues = useMemo(() => validationSchema.cast({
    sheetId
  }, { stripUnknown: true }), [sheetId, validationSchema])
  const handleSubmit = useCallback(({ sheetId, ...values }) => create({
    resource: getSheetRef(roomId, sheetId),
    ...valuesToSchedule(values)
  }), [create, roomId])

  useEffect(() => {
    if (!isSuccess) return
    toast.success('席の予定を登録しました')
    router.push(getSheetPath('/schedules'))
  }, [getSheetPath, isSuccess, router])

  const isLoading = !(sheetId)

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>席の予定の登録</FeatureTitle>
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
                    <Button disabled={!isValid || isCreating} type="submit">席の予定を登録する</Button>
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
