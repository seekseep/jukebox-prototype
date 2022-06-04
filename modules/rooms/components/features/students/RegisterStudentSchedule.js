import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { STUDENT_SCHEDULE_TYPE_LABEL } from '@rooms/constants'

import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form, FormActions } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

import { useGetStudentPath } from '@rooms/hooks/router'
import { useCreateStudentScheduleMutation } from '@rooms/hooks/schedules'
import { useInitialValue, useValidationSchema, useValuesToResult } from '@rooms/components/parts/schedules/ScheduleFormFields/hooks'
import ScheduleFormFields from '@rooms/components/parts/schedules/ScheduleFormFields'

export default function RegisterStudentSchedule () {
  const router = useRouter()
  const { query: { roomId, studentId } } = router

  const getStudentPath = useGetStudentPath(roomId, studentId)

  const [create, {
    isLoading: isCreating,
    isSuccess: isCreated,
    error: creatingError,
  }] = useCreateStudentScheduleMutation(roomId, studentId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValue()
  const valuesToResult = useValuesToResult()
  const handleSubmit = useCallback((values) => create(valuesToResult(values)), [create, valuesToResult])

  useEffect(() => {
    if (!isCreated) return
    toast.success('予定を登録しました')
    router.push(getStudentPath('/schedules'))
  }, [getStudentPath, isCreated, router])

  const isReady = roomId && studentId

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
                      ableableLabel={STUDENT_SCHEDULE_TYPE_LABEL.AVAILABLE}
                      disableableLabel={STUDENT_SCHEDULE_TYPE_LABEL.DISAVAILABLE} />
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
