import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { SHEET_SCHEDULE_TYPE_LABEL } from '@/constants'

import Card, { CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import { Form, FormActions } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'

import { useGetSheetPath } from '@rooms/hooks/router'
import { useCreateSheetScheduleMutation } from '@rooms/hooks/schedules'
import { useInitialValue, useValidationSchema, useValuesToResult } from '@rooms/components/parts/schedules/ScheduleFormFields/hooks'
import ScheduleFormFields from '@rooms/components/parts/schedules/ScheduleFormFields'

export default function RegisterSheetSchedule () {
  const router = useRouter()
  const { query: { roomId, sheetId } } = router

  const getSheetPath = useGetSheetPath(roomId, sheetId)

  const [create, {
    isLoading: isCreating,
    isSuccess: isCreated,
    error: creatingError,
  }] = useCreateSheetScheduleMutation(roomId, sheetId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValue()
  const valuesToResult = useValuesToResult()
  const handleSubmit = useCallback((values) => create(valuesToResult(values)), [create, valuesToResult])

  useEffect(() => {
    if (!isCreated) return
    toast.success('席の予定を登録しました')
    router.push(getSheetPath('/schedules'))
  }, [getSheetPath, isCreated, router])

  const isReady = roomId && sheetId

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>席の予定の登録</FeatureTitle>
      </FeatureHead>
      {isReady && (
        <Card>
          <CardBody>
            <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
              {({ isValid }) => (
                <Form>
                    <ScheduleFormFields
                      ableableLabel={SHEET_SCHEDULE_TYPE_LABEL.AVAILABLE}
                      disableableLabel={SHEET_SCHEDULE_TYPE_LABEL.DISAVAILABLE} />
                  <ErrorAlert error={creatingError} />
                  <FormActions>
                    <Button disabled={!isValid || isCreating} type="submit">席の予定を登録する</Button>
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
