import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'

import { TEACHER_SCHEDULE_TYPE_LABEL } from '@/constatnts'
import { useToggleState } from '@/hooks/ui'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { Form, FormActions } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'
import Card, { CardActions, CardBody } from '@/components/parts/Card'
import ErrorAlert from '@/components/parts/ErrorAlert'
import Suspension from '@/components/parts/Suspension'

import { useScheduleQuery, useUpdateSchedule } from '@rooms/hooks/schedules'
import { useInitialValue, useValidationSchema, useValuesToResult } from '@rooms/components/parts/schedules/ScheduleFormFields/hooks'
import SchedulePropertySet from '@rooms/components/parts/schedules/SchedulePropertySet'
import ScheduleFormFields from '@rooms/components/parts/schedules/ScheduleFormFields'

export default function ManageTeacherSchedule () {
  const { query:{ roomId, scheduleId } } = useRouter()
  const [isEditing, toggleEditing, setIsEditing] = useToggleState()

  const {
    data: schedule,
    mutate,
    ...result
  } = useScheduleQuery(roomId, scheduleId)
  const [update, {
    data: updatedSchedule,
    isLoading: isUpdating,
    isSuccess: isUpdated,
    error: updatingError
  }] = useUpdateSchedule(roomId, scheduleId)

  const validationSchema = useValidationSchema()
  const initialValues = useInitialValue(schedule)
  const valuesToResult = useValuesToResult()
  const handleSubmit = useCallback((values) => update(valuesToResult(values)), [update, valuesToResult])

  useEffect(() => {
    if (!isUpdated) return
    toast.success('講師の予定を保存しました')
    mutate(updatedSchedule)
    setIsEditing(false)
  }, [isUpdated, mutate, setIsEditing, updatedSchedule])

  return(
    <Feature>
      <FeatureHead>
        <FeatureTitle>予定の内容</FeatureTitle>
      </FeatureHead>
      <Suspension {...result}>
        {() => (
          <Card>
            {isEditing ? (
              <CardBody>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  {({ isValid }) => (
                    <Form>
                      <ScheduleFormFields
                        ableableLabel={TEACHER_SCHEDULE_TYPE_LABEL.AVAILABLE}
                        disableableLabel={TEACHER_SCHEDULE_TYPE_LABEL.DISAVAILABLE} />
                      <ErrorAlert error={updatingError} />
                      <FormActions>
                        <Button primary type="submit" disabled={!isValid || isUpdating}>保存する</Button>
                        <Button secondary type="button" onClick={toggleEditing}>変更を破棄する</Button>
                      </FormActions>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            ) : (
              <>
                <CardActions>
                  <Button secondary sm onClick={toggleEditing}>編集する</Button>
                </CardActions>
                <SchedulePropertySet schedule={schedule} />
              </>
            )}
          </Card>
        )}
      </Suspension>
    </Feature>
  )
}
