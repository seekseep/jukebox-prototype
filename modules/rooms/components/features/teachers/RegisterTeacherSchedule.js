import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { TEACHER_SCHEDULE_TYPE_LABEL } from '@rooms/constants'

import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form, FormActions } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

import { useGetTeacherPath } from '@rooms/hooks/router'
import { useCreateTeacherScheduleMutation } from '@rooms/hooks/schedules'
import { useInitialValue, useValidationSchema, useValuesToResult } from '@rooms/components/parts/schedules/ScheduleFormFields/hooks'
import ScheduleFormFields from '@rooms/components/parts/schedules/ScheduleFormFields'

export default function RegisterTeacherSchedule () {
  const router = useRouter()
  const { query: { roomId, teacherId } } = router

  const getTeacherPath = useGetTeacherPath(roomId, teacherId)

  const [create, {
    isLoading: isCreating,
    isSuccess: isCreated,
    error: creatingError,
  }] = useCreateTeacherScheduleMutation(roomId, teacherId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValue()
  const valuesToResult = useValuesToResult()
  const handleSubmit = useCallback((values) => create(valuesToResult(values)), [create, valuesToResult])

  useEffect(() => {
    if (!isCreated) return
    toast.success('予定を登録しました')
    router.push(getTeacherPath('/schedules'))
  }, [getTeacherPath, isCreated, router])

  const isReady = roomId && teacherId

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>予定の登録</FeatureTitle>
      </FeatureHead>
      {isReady && (
        <Card>
          <CardBody>
            <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
              {({ isValid }) => (
                <Form>
                    <ScheduleFormFields
                      ableableLabel={TEACHER_SCHEDULE_TYPE_LABEL.AVAILABLE}
                      disableableLabel={TEACHER_SCHEDULE_TYPE_LABEL.DISAVAILABLE} />
                  <ErrorAlert error={creatingError} />
                  <FormActions>
                    <Button disabled={!isValid || isCreating} type="submit">予定を登録する</Button>
                  </FormActions>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      )}
    </Feature>
  )
}
